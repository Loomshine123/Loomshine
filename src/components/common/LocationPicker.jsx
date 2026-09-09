import { useState, useEffect, useRef, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./LocationPicker.css";

// Helper to format structured address from Nominatim reverse-geocode
function parseNominatimAddress(data) {
  if (!data) return { formatted: "", street: "", locality: "", city: "", pincode: "", state: "" };

  const addr = data.address || {};
  const displayName = data.display_name || "";

  // 1. Street / Building / Landmark
  const streetParts = [
    addr.house_number || addr.building,
    addr.amenity || addr.junction,
    addr.road || addr.street || addr.residential || addr.pedestrian,
  ].filter(Boolean);

  // 2. Locality / Neighbourhood / Suburb / Sector
  const localityParts = [
    addr.neighbourhood || addr.subdivision,
    addr.suburb || addr.subdistrict,
  ].filter(Boolean);

  // 3. City, State, Postcode
  const city = addr.city || addr.town || addr.village || addr.municipality || addr.state_district || addr.county || "";
  const state = addr.state || "";
  const pincode = addr.postcode || "";

  // Clean concise formatted summary
  const cleanParts = [];
  if (streetParts.length > 0) cleanParts.push(streetParts.join(", "));
  if (localityParts.length > 0) cleanParts.push(localityParts.join(", "));
  if (city) cleanParts.push(city);
  if (state && state !== city) cleanParts.push(state);
  if (pincode) cleanParts.push(pincode);

  const formatted = cleanParts.length > 0 ? cleanParts.join(", ") : displayName;

  return {
    formatted,
    street: streetParts.join(", "),
    locality: localityParts.join(", "),
    city,
    state,
    pincode,
    raw: data,
  };
}

// Custom Luxury SVG Pin Icon for Leaflet
function createLuxuryPinIcon() {
  return L.divIcon({
    className: "loomshine-map-pin",
    html: `
      <div class="pin-marker-wrapper">
        <div class="pin-pulse-ring"></div>
        <div class="pin-marker-head">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="pin-svg-icon">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3" fill="#ffffff" stroke="none"></circle>
          </svg>
        </div>
        <div class="pin-needle"></div>
      </div>
    `,
    iconSize: [38, 48],
    iconAnchor: [19, 48],
    popupAnchor: [0, -48],
  });
}

// Multi-provider IP Geolocation fetcher for 100% reliable fallback
async function fetchIpLocation() {
  try {
    const res = await fetch("https://api.bigdatacloud.net/data/reverse-geocode-client");
    if (res.ok) {
      const data = await res.json();
      if (data.latitude && data.longitude) {
        return {
          lat: data.latitude,
          lon: data.longitude,
          city: data.city || data.locality || "",
          state: data.principalSubdivision || "",
          source: "network",
        };
      }
    }
  } catch (err) {
    console.warn("BigDataCloud IP lookup failed, trying backup", err);
  }

  try {
    const res = await fetch("https://ipwho.is/");
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.latitude && data.longitude) {
        return {
          lat: data.latitude,
          lon: data.longitude,
          city: data.city || "",
          state: data.region || "",
          source: "network",
        };
      }
    }
  } catch (err) {
    console.warn("ipwho.is lookup failed", err);
  }

  // Fallback: National Capital Region (NCR / Delhi / Haryana corridor)
  return { lat: 28.6139, lon: 77.209, city: "Delhi NCR", state: "", source: "default" };
}

export default function LocationPicker({
  initialLocation,
  onLocationSelect,
  onClear,
}) {
  const [pinnedLocation, setPinnedLocation] = useState(initialLocation || null);
  const [loadingGps, setLoadingGps] = useState(false);
  const [reverseLoading, setReverseLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null); // { type: 'error' | 'warning' | 'info' | 'success', text: '' }
  const [detectedRegion, setDetectedRegion] = useState(null);

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const searchContainerRef = useRef(null);
  const reverseGeocodeRef = useRef(null);

  // Reverse Geocoding with precise zoom=18 and structured address
  const reverseGeocode = useCallback(
    async (lat, lon, accuracy = null, source = "manual") => {
      setReverseLoading(true);

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&zoom=18&addressdetails=1`,
          {
            headers: {
              "Accept-Language": "en",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Geocoding service unavailable");
        }

        const data = await response.json();
        const parsed = parseNominatimAddress(data);

        const newPin = {
          lat,
          lon,
          accuracy: accuracy !== null ? accuracy : null,
          address: parsed.formatted,
          street: parsed.street,
          locality: parsed.locality,
          city: parsed.city,
          state: parsed.state,
          pincode: parsed.pincode,
          source,
        };

        setPinnedLocation(newPin);
        if (onLocationSelect) {
          onLocationSelect(newPin);
        }

        if (source === "gps") {
          setStatusMessage({
            type: "success",
            text: `✓ Precise GPS Location Pinned (${parsed.locality || parsed.city || "Exact Spot"}). Drag pin if needed to adjust.`,
          });
        } else if (source === "network") {
          setStatusMessage({
            type: "info",
            text: `📍 Located your area: ${parsed.city || parsed.locality || "Detected City"}. Please drag the pin on the map directly onto your building gate for exact delivery.`,
          });
        } else if (source === "drag") {
          setStatusMessage({
            type: "success",
            text: `✓ Pin adjusted to: ${parsed.street || parsed.locality || parsed.city || "Selected spot"}. Address updated below!`,
          });
        }
      } catch (err) {
        console.warn("Reverse geocode failed, using coordinates fallback", err);
        const fallbackPin = {
          lat,
          lon,
          accuracy: accuracy || null,
          address: `GPS Pin: ${lat.toFixed(5)}, ${lon.toFixed(5)}`,
          street: "",
          locality: "",
          city: "",
          state: "",
          pincode: "",
          source,
        };
        setPinnedLocation(fallbackPin);
        if (onLocationSelect) {
          onLocationSelect(fallbackPin);
        }
      } finally {
        setReverseLoading(false);
      }
    },
    [onLocationSelect]
  );

  useEffect(() => {
    reverseGeocodeRef.current = reverseGeocode;
  }, [reverseGeocode]);

  // Update map view & marker smoothly
  const updateMapPosition = (lat, lon, zoom = 17) => {
    if (mapInstanceRef.current && markerRef.current) {
      mapInstanceRef.current.setView([lat, lon], zoom, { animate: true });
      markerRef.current.setLatLng([lat, lon]);
      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 150);
    }
  };

  // 1. Mount Effect: Initialize Map and Auto-detect client's location (No more defaulting to Bangalore!)
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    let isSubscribed = true;

    async function initMap() {
      // Step 1: Detect user's actual live IP position
      const detected = await fetchIpLocation();
      if (!isSubscribed) return;

      setDetectedRegion(detected);

      const targetLat = initialLocation?.lat || detected.lat;
      const targetLon = initialLocation?.lon || detected.lon;
      const targetZoom = initialLocation ? 16 : 14;

      if (!mapContainerRef.current) return;

      const map = L.map(mapContainerRef.current, {
        center: [targetLat, targetLon],
        zoom: targetZoom,
        zoomControl: false,
        attributionControl: false,
      });

      // Standard OSM tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        subdomains: ["a", "b", "c"],
      }).addTo(map);

      L.control.zoom({ position: "bottomright" }).addTo(map);

      // Create marker with luxury icon
      const pinIcon = createLuxuryPinIcon();
      const marker = L.marker([targetLat, targetLon], {
        icon: pinIcon,
        draggable: true,
        autoPan: true,
      }).addTo(map);

      // When user drags pin
      marker.on("dragend", async (e) => {
        const position = e.target.getLatLng();
        if (reverseGeocodeRef.current) {
          await reverseGeocodeRef.current(position.lat, position.lng, null, "drag");
        }
      });

      // When user clicks anywhere on map
      map.on("click", async (e) => {
        const { lat, lng } = e.latlng;
        marker.setLatLng([lat, lng]);
        if (reverseGeocodeRef.current) {
          await reverseGeocodeRef.current(lat, lng, null, "drag");
        }
      });

      mapInstanceRef.current = map;
      markerRef.current = marker;

      // Auto-reverse geocode the detected real location if no initial location was given
      if (!initialLocation && reverseGeocodeRef.current) {
        reverseGeocodeRef.current(targetLat, targetLon, null, "network");
      }

      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 300);
    }

    initMap();

    return () => {
      isSubscribed = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
  }, []); // Run once on mount

  // Click outside search results to close dropdown
  useEffect(() => {
    const handleSearchClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleSearchClickOutside);
    return () => document.removeEventListener("mousedown", handleSearchClickOutside);
  }, []);

  // 2. Dual-Engine Live Location Detection (GPS Hardware + Fast Network Fallback)
  const handleAutoDetectGPS = () => {
    setLoadingGps(true);
    setStatusMessage(null);

    // If browser doesn't support geolocation, fallback to network immediately
    if (!navigator.geolocation) {
      fallbackToNetworkLocation("Browser does not support GPS hardware.");
      return;
    }

    let resolved = false;

    // Timeout safety: if browser hangs or waits for permission, resolve with network after 6s
    const timeoutTimer = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        fallbackToNetworkLocation("GPS response took too long.");
      }
    }, 6000);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        if (resolved) return;
        resolved = true;
        clearTimeout(timeoutTimer);
        setLoadingGps(false);

        const { latitude, longitude, accuracy } = position.coords;

        // Move map and marker
        updateMapPosition(latitude, longitude, 17);

        // Reverse geocode
        await reverseGeocode(latitude, longitude, Math.round(accuracy), "gps");
      },
      async (error) => {
        if (resolved) return;
        resolved = true;
        clearTimeout(timeoutTimer);

        let reason = "GPS permission not granted.";
        if (error.code === error.POSITION_UNAVAILABLE) reason = "GPS satellite unavailable.";
        fallbackToNetworkLocation(reason);
      },
      {
        enableHighAccuracy: true,
        timeout: 5500,
        maximumAge: 0,
      }
    );
  };

  // Network IP Location Fallback handler
  const fallbackToNetworkLocation = async (reason) => {
    setLoadingGps(true);
    try {
      const netLoc = await fetchIpLocation();
      updateMapPosition(netLoc.lat, netLoc.lon, 16);
      await reverseGeocode(netLoc.lat, netLoc.lon, null, "network");

      setStatusMessage({
        type: "warning",
        text: `${reason} Pinned your area: ${netLoc.city || "your city"} via network. Drag the pin on the map or search below to pinpoint your exact gate.`,
      });
    } catch (e) {
      console.warn("Fallback failed", e);
      setStatusMessage({
        type: "error",
        text: "Could not auto-detect location. Please type your society or area in the search bar below.",
      });
    } finally {
      setLoadingGps(false);
    }
  };

  // 3. Search Area / Society / Landmark Handler (with local city biasing)
  const handleSearchSubmit = async (e) => {
    if (e) e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    setSearchLoading(true);
    setStatusMessage(null);

    try {
      // Prioritize India & current region
      let url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query
      )}&countrycodes=in&addressdetails=1&limit=6`;

      // If we know current lat/lon, add proximity viewbox biasing
      const currentLat = pinnedLocation?.lat || detectedRegion?.lat;
      const currentLon = pinnedLocation?.lon || detectedRegion?.lon;
      if (currentLat && currentLon) {
        url += `&viewbox=${currentLon - 0.4},${currentLat + 0.4},${currentLon + 0.4},${currentLat - 0.4}&bounded=0`;
      }

      const response = await fetch(url, {
        headers: {
          "Accept-Language": "en",
        },
      });

      if (!response.ok) throw new Error("Search service unavailable");

      const results = await response.json();
      setSearchResults(results);
      setShowDropdown(true);

      if (results.length === 0) {
        setStatusMessage({
          type: "warning",
          text: `No exact location found for "${query}". Try searching with your city name (e.g., "${query} Panipat" or "${query} Delhi").`,
        });
      }
    } catch (err) {
      console.warn("Search failed", err);
      setStatusMessage({
        type: "error",
        text: "Failed to search locations. Please try dragging the pin directly on the map.",
      });
    } finally {
      setSearchLoading(false);
    }
  };

  // 4. Select a Location from Search Dropdown
  const handleSelectSearchResult = async (result) => {
    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);

    setShowDropdown(false);
    setSearchQuery(result.display_name.split(",").slice(0, 3).join(","));

    // Move map & marker
    updateMapPosition(lat, lon, 17);

    // Parse structured address
    const parsed = parseNominatimAddress(result);

    const newPin = {
      lat,
      lon,
      accuracy: null,
      address: parsed.formatted,
      street: parsed.street,
      locality: parsed.locality,
      city: parsed.city,
      state: parsed.state,
      pincode: parsed.pincode,
      source: "search",
    };

    setPinnedLocation(newPin);
    if (onLocationSelect) {
      onLocationSelect(newPin);
    }

    setStatusMessage({
      type: "success",
      text: "✓ Location pinned from search! You can drag the pin on the map to place it directly at your doorstep.",
    });
  };

  // 5. Clear Pinned Location
  const handleClear = () => {
    setPinnedLocation(null);
    setSearchQuery("");
    setSearchResults([]);
    setStatusMessage(null);
    if (onClear) {
      onClear();
    }
  };

  return (
    <div className="location-picker-container">
      {/* ACTION TOOLBAR: DUAL GPS BUTTON & LOCALITY SEARCH */}
      <div className="location-picker-toolbar">
        {/* AUTO DETECT GPS */}
        <button
          type="button"
          className={`gps-detect-btn ${loadingGps ? "gps-detect-btn--loading" : ""}`}
          onClick={handleAutoDetectGPS}
          disabled={loadingGps}
          title="Auto-detect current live location via GPS/Network"
        >
          <span className="gps-btn-icon">{loadingGps ? "⌛" : "📍"}</span>
          <span>{loadingGps ? "Detecting Live Location..." : "Auto-Detect My Live Location"}</span>
        </button>

        <span className="toolbar-divider-label">OR SEARCH</span>

        {/* SEARCH AREA / SOCIETY / LANDMARK */}
        <div className="location-search-box" ref={searchContainerRef}>
          <form onSubmit={handleSearchSubmit} className="search-form-wrapper">
            <input
              type="text"
              className="location-search-input"
              placeholder={
                detectedRegion?.city
                  ? `Search street, society, or sector in ${detectedRegion.city}...`
                  : "Search apartment, society, street, or area..."
              }
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.trim().length > 2) {
                  handleSearchSubmit();
                }
              }}
              onFocus={() => {
                if (searchResults.length > 0) setShowDropdown(true);
              }}
            />

            <button
              type="submit"
              className="location-search-btn"
              disabled={searchLoading || !searchQuery.trim()}
              title="Search location"
            >
              {searchLoading ? "..." : "🔍 Search"}
            </button>
          </form>

          {/* SEARCH SUGGESTIONS DROPDOWN */}
          {showDropdown && searchResults.length > 0 && (
            <ul className="search-results-dropdown">
              {searchResults.map((item, idx) => {
                const parts = item.display_name.split(",");
                const mainTitle = parts[0];
                const subtitle = parts.slice(1, 4).join(",");

                return (
                  <li
                    key={item.place_id || idx}
                    className="search-result-item"
                    onClick={() => handleSelectSearchResult(item)}
                  >
                    <span className="result-pin-icon">📍</span>
                    <div className="result-info">
                      <strong className="result-title">{mainTitle}</strong>
                      <span className="result-subtitle">{subtitle}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* QUICK SUGGESTIONS / DETECTED REGION BADGE */}
      {detectedRegion?.city && (
        <div className="detected-region-strip">
          <span className="detected-label">DETECTED AREA:</span>
          <span className="detected-city-badge">📍 {detectedRegion.city}, {detectedRegion.state}</span>
          <span className="detected-hint">— If you are nearby, drag the pin below directly to your gate</span>
        </div>
      )}

      {/* STATUS / WARNING BANNERS */}
      {statusMessage && (
        <div className={`location-status-banner location-status-banner--${statusMessage.type}`}>
          <span className="status-banner-icon">
            {statusMessage.type === "error"
              ? "⚠"
              : statusMessage.type === "warning"
              ? "⚡"
              : statusMessage.type === "success"
              ? "✓"
              : "ℹ"}
          </span>
          <span className="status-banner-text">{statusMessage.text}</span>
        </div>
      )}

      {/* INTERACTIVE LEAFLET MAP */}
      <div className="interactive-map-wrapper">
        <div className="map-guidance-overlay">
          <span>💡 <strong>Drag the gold pin</strong> or <strong>click anywhere on map</strong> to pinpoint your exact gate/doorstep</span>
          {reverseLoading && <span className="reverse-geocoding-spinner">Updating address...</span>}
        </div>

        <div ref={mapContainerRef} className="leaflet-map-canvas" />
      </div>

      {/* PINNED LOCATION SUMMARY CARD */}
      {pinnedLocation && (
        <div className="pinned-summary-card">
          <div className="pinned-summary-top">
            <div className="pinned-summary-status">
              <span className="live-pulse-dot" />
              <strong>LOCATION PINNED LIVE</strong>
              {pinnedLocation.source && (
                <span className="accuracy-pill">
                  {pinnedLocation.source === "gps"
                    ? "✓ Satellite GPS"
                    : pinnedLocation.source === "drag"
                    ? "✓ Exact Pin Drop"
                    : pinnedLocation.source === "search"
                    ? "✓ Verified Search"
                    : "📍 Network / IP"}
                </span>
              )}
            </div>

            <button type="button" className="clear-location-btn" onClick={handleClear}>
              Clear Pin ✕
            </button>
          </div>

          <p className="pinned-summary-address">{pinnedLocation.address}</p>

          <div className="pinned-summary-meta">
            <span className="meta-coords">
              GPS Coordinates: {pinnedLocation.lat.toFixed(5)}, {pinnedLocation.lon.toFixed(5)}
            </span>
            <span className="meta-tip">
              ✓ Address details below have been pre-filled from this pin. You can edit or add flat/floor details manually.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

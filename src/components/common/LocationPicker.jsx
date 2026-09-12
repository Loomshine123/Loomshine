import { useState, useEffect, useRef, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./LocationPicker.css";

// Helper to format structured address from Nominatim reverse-geocode for Indian urban locations
function parseNominatimAddress(data) {
  if (!data) return { formatted: "", street: "", locality: "", city: "", pincode: "", state: "" };

  const addr = data.address || {};
  const displayName = data.display_name || "";

  // 1. Street / Building / Society / Landmark
  const streetParts = [
    addr.house_number || addr.building || addr.house_name,
    addr.amenity || addr.shop || addr.commercial || addr.office || addr.landmark,
    addr.road || addr.street || addr.residential || addr.pedestrian || addr.footway,
  ].filter(Boolean);

  // 2. Locality / Sector / Colony / DLF Phase / Area
  const localityParts = [
    addr.quarter || addr.subdivision || addr.neighbourhood,
    addr.suburb || addr.city_district || addr.subdistrict,
  ].filter(Boolean);

  // 3. City, State, Postcode
  const city = addr.city || addr.town || addr.village || addr.municipality || "Gurugram";
  const state = addr.state || "Haryana";
  const pincode = addr.postcode || "";

  // Clean concise formatted summary without duplicates
  const cleanParts = [];
  if (streetParts.length > 0) cleanParts.push(streetParts.join(", "));
  if (localityParts.length > 0) cleanParts.push(localityParts.join(", "));
  if (city && !cleanParts.some((p) => p.toLowerCase().includes(city.toLowerCase()))) {
    cleanParts.push(city);
  }
  if (state && state !== city && !cleanParts.some((p) => p.toLowerCase().includes(state.toLowerCase()))) {
    cleanParts.push(state);
  }
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

// Multi-provider IP Geolocation fetcher for fallback centering
async function fetchIpLocation() {
  try {
    const res = await fetch("https://api.bigdatacloud.net/data/reverse-geocode-client");
    if (res.ok) {
      const data = await res.json();
      if (data.latitude && data.longitude) {
        return {
          lat: data.latitude,
          lon: data.longitude,
          city: data.city || data.locality || "Gurugram",
          state: data.principalSubdivision || "Haryana",
          source: "network",
        };
      }
    }
  } catch (err) {
    console.warn("BigDataCloud IP lookup failed, trying backup", err);
  }

  // Default: Loomshine Core Hub in Gurugram (MG Road Central Arcade Market)
  return { lat: 28.4795, lon: 77.0801, city: "Gurugram", state: "Haryana", source: "default" };
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

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const accuracyCircleRef = useRef(null);
  const searchContainerRef = useRef(null);
  const reverseGeocodeRef = useRef(null);

  // Dual-Engine Reverse Geocoding with precise street/locality parsing
  const reverseGeocode = useCallback(
    async (lat, lon, accuracy = null, source = "manual") => {
      setReverseLoading(true);

      let parsed = null;

      // 1. Try Nominatim (OpenStreetMap) with zoom=18 building level
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&zoom=18&addressdetails=1`,
          {
            headers: {
              "Accept-Language": "en",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          parsed = parseNominatimAddress(data);
        }
      } catch (err) {
        console.warn("Nominatim reverse geocode failed, attempting backup provider", err);
      }

      // 2. Backup Provider: BigDataCloud Reverse Geocoder
      if (!parsed || !parsed.formatted) {
        try {
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
          );
          if (res.ok) {
            const data = await res.json();
            const locality = data.locality || data.city || "";
            const city = data.city || "Gurugram";
            const state = data.principalSubdivision || "Haryana";
            const postcode = data.postcode || "";
            const formatted = [locality, city, state, postcode].filter(Boolean).join(", ");
            parsed = {
              formatted: formatted || `Live Location (${lat.toFixed(5)}, ${lon.toFixed(5)})`,
              street: "",
              locality,
              city,
              state,
              pincode: postcode,
              raw: data,
            };
          }
        } catch (backupErr) {
          console.warn("Backup reverse geocode failed", backupErr);
        }
      }

      // 3. Fallback coordinates if both network reverse-geocoders timed out
      if (!parsed || !parsed.formatted) {
        parsed = {
          formatted: `Doorstep Pin: ${lat.toFixed(5)}, ${lon.toFixed(5)}`,
          street: "",
          locality: "Gurugram",
          city: "Gurugram",
          state: "Haryana",
          pincode: "",
        };
      }

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
        const accuracyText = accuracy ? ` (±${accuracy}m GPS accuracy)` : "";
        setStatusMessage({
          type: "success",
          text: `✓ Accurate Live Location Pinned${accuracyText}. Drag the pin directly to your building gate if needed.`,
        });
      } else if (source === "drag") {
        setStatusMessage({
          type: "success",
          text: `✓ Pin placed at: ${parsed.street || parsed.locality || parsed.city || "Selected spot"}. Address updated!`,
        });
      } else if (source === "search") {
        setStatusMessage({
          type: "success",
          text: `✓ Located: ${parsed.formatted}. Drag the pin if needed to refine to your building gate.`,
        });
      }

      setReverseLoading(false);
    },
    [onLocationSelect]
  );

  useEffect(() => {
    reverseGeocodeRef.current = reverseGeocode;
  }, [reverseGeocode]);

  // Update map view & marker position smoothly
  const updateMapPosition = (lat, lon, zoom = 18) => {
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

  // 1. Mount Effect: Initialize Map Centered on Hub (without auto-overriding form with rough IP)
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    let isSubscribed = true;

    async function initMap() {
      // Default: Gurugram Hub (MG Road Central Arcade Market)
      const defaultHub = { lat: 28.4795, lon: 77.0801, city: "Gurugram", state: "Haryana" };
      const targetLat = initialLocation?.lat || defaultHub.lat;
      const targetLon = initialLocation?.lon || defaultHub.lon;
      const targetZoom = initialLocation ? 17 : 14;

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
        if (accuracyCircleRef.current) {
          accuracyCircleRef.current.remove();
        }
        if (reverseGeocodeRef.current) {
          await reverseGeocodeRef.current(position.lat, position.lng, null, "drag");
        }
      });

      // When user clicks anywhere on map
      map.on("click", async (e) => {
        const { lat, lng } = e.latlng;
        marker.setLatLng([lat, lng]);
        if (accuracyCircleRef.current) {
          accuracyCircleRef.current.remove();
        }
        if (reverseGeocodeRef.current) {
          await reverseGeocodeRef.current(lat, lng, null, "drag");
        }
      });

      mapInstanceRef.current = map;
      markerRef.current = marker;

      // Only reverse-geocode on mount if initialLocation was explicitly supplied
      if (initialLocation && reverseGeocodeRef.current) {
        reverseGeocodeRef.current(initialLocation.lat, initialLocation.lon, null, "initial");
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
        accuracyCircleRef.current = null;
      }
    };
  }, []);

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

  // 2. High-Accuracy Live Location Detection (GPS Hardware with generous satellite acquisition window)
  const handleAutoDetectGPS = () => {
    if (!navigator.geolocation) {
      setStatusMessage({
        type: "error",
        text: "Geolocation is not supported by your browser. Please search your colony/society or drag the pin on the map.",
      });
      return;
    }

    setLoadingGps(true);
    setStatusMessage({
      type: "info",
      text: "Connecting to device GPS... Please tap 'Allow' when your browser asks for location permission.",
    });

    let resolved = false;

    // Apply accurate GPS coords to map and reverse geocode
    const applyGpsCoords = async (latitude, longitude, accuracy, source) => {
      updateMapPosition(latitude, longitude, 18);

      if (mapInstanceRef.current) {
        if (accuracyCircleRef.current) {
          accuracyCircleRef.current.remove();
        }
        if (accuracy && accuracy < 600) {
          accuracyCircleRef.current = L.circle([latitude, longitude], {
            radius: Math.max(accuracy, 15),
            color: "#C5A059",
            fillColor: "#C5A059",
            fillOpacity: 0.14,
            weight: 1.5,
            dashArray: "4, 6",
          }).addTo(mapInstanceRef.current);
        }
      }

      if (reverseGeocodeRef.current) {
        await reverseGeocodeRef.current(latitude, longitude, Math.round(accuracy || 0), source);
      }
    };

    // Secondary attempt with standard accuracy if hardware satellite lock is slow
    const tryStandardAccuracyGps = () => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setLoadingGps(false);
          const { latitude, longitude, accuracy } = position.coords;
          await applyGpsCoords(latitude, longitude, accuracy, "gps");
        },
        async (err) => {
          setLoadingGps(false);
          if (err.code === 1) {
            setStatusMessage({
              type: "warning",
              text: "Location permission denied. Please enable location permissions in browser or search your colony/sector below.",
            });
          } else {
            fallbackToNetworkLocation("Could not get a high-precision GPS satellite fix.");
          }
        },
        {
          enableHighAccuracy: false,
          timeout: 8000,
          maximumAge: 30000,
        }
      );
    };

    // Safety timeout: 14 seconds to give user ample time to tap "Allow" and device to acquire satellites
    const timeoutTimer = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        tryStandardAccuracyGps();
      }
    }, 14000);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        if (resolved) return;
        resolved = true;
        clearTimeout(timeoutTimer);
        setLoadingGps(false);

        const { latitude, longitude, accuracy } = position.coords;
        await applyGpsCoords(latitude, longitude, accuracy, "gps");
      },
      async (error) => {
        if (resolved) return;
        resolved = true;
        clearTimeout(timeoutTimer);

        if (error.code === error.PERMISSION_DENIED) {
          setLoadingGps(false);
          setStatusMessage({
            type: "warning",
            text: "Location permission was denied. Please allow location permissions in your browser or search your society/sector below.",
          });
          return;
        }

        // Try standard accuracy if high accuracy failed
        tryStandardAccuracyGps();
      },
      {
        enableHighAccuracy: true,
        timeout: 13000,
        maximumAge: 10000,
      }
    );
  };

  // Network IP Location Fallback handler (only when GPS hardware is completely unavailable)
  const fallbackToNetworkLocation = async (reason) => {
    setLoadingGps(true);
    try {
      const netLoc = await fetchIpLocation();
      updateMapPosition(netLoc.lat, netLoc.lon, 16);
      if (reverseGeocodeRef.current) {
        await reverseGeocodeRef.current(netLoc.lat, netLoc.lon, null, "network");
      }

      setStatusMessage({
        type: "warning",
        text: `${reason} Centered on detected region (${netLoc.city}). Drag the pin directly onto your gate/building on the map.`,
      });
    } catch (e) {
      console.warn("Fallback failed", e);
      setStatusMessage({
        type: "error",
        text: "Could not detect live location. Please search your sector/society in the search box below.",
      });
    } finally {
      setLoadingGps(false);
    }
  };

  // 3. Search Area / Society / Landmark Handler (with local Gurugram / NCR proximity viewbox biasing)
  const handleSearchSubmit = async (e) => {
    if (e) e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    setSearchLoading(true);
    setStatusMessage(null);

    try {
      // Prioritize India & Gurugram NCR corridor
      let url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query
      )}&countrycodes=in&addressdetails=1&limit=6`;

      // Proximity bounding box around NCR / Haryana
      const centerLat = pinnedLocation?.lat || 28.4795;
      const centerLon = pinnedLocation?.lon || 77.0801;
      url += `&viewbox=${centerLon - 0.4},${centerLat + 0.4},${centerLon + 0.4},${centerLat - 0.4}&bounded=0`;

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
          text: `No exact location found for "${query}". Try adding "Gurgaon" or "Sector" (e.g., "${query} Gurugram").`,
        });
      }
    } catch (err) {
      console.warn("Search failed", err);
      setStatusMessage({
        type: "error",
        text: "Failed to search locations. You can drag the gold pin directly to your gate on the map.",
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

    if (accuracyCircleRef.current) {
      accuracyCircleRef.current.remove();
    }

    // Move map & marker directly to selected building at zoom 18
    updateMapPosition(lat, lon, 18);

    if (reverseGeocodeRef.current) {
      await reverseGeocodeRef.current(lat, lon, null, "search");
    }
  };

  const handleClear = () => {
    if (accuracyCircleRef.current) {
      accuracyCircleRef.current.remove();
    }
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
        {/* AUTO DETECT LIVE GPS */}
        <button
          type="button"
          className={`gps-detect-btn ${loadingGps ? "gps-detect-btn--loading" : ""}`}
          onClick={handleAutoDetectGPS}
          disabled={loadingGps}
          title="Auto-detect exact live doorstep coordinates using device GPS"
        >
          <span className="gps-btn-icon">{loadingGps ? "⌛" : "🎯"}</span>
          <span>{loadingGps ? "Acquiring Live GPS..." : "Auto-Detect My Exact Live Location"}</span>
        </button>

        <span className="toolbar-divider-label">OR SEARCH</span>

        {/* SEARCH AREA / SOCIETY / LANDMARK */}
        <div className="location-search-box" ref={searchContainerRef}>
          <div className="search-form-wrapper">
            <input
              type="text"
              className="location-search-input"
              placeholder="Search society, sector, landmark (e.g. DLF Phase 2, MG Road)..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.trim().length > 2) {
                  handleSearchSubmit();
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearchSubmit(e);
                }
              }}
              onFocus={() => {
                if (searchResults.length > 0) setShowDropdown(true);
              }}
            />

            <button
              type="button"
              onClick={handleSearchSubmit}
              className="location-search-btn"
              disabled={searchLoading || !searchQuery.trim()}
              title="Search location"
            >
              {searchLoading ? "..." : "🔍 Search"}
            </button>
          </div>

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
          <span>💡 <strong>Drag the gold pin</strong> or <strong>tap anywhere on the map</strong> to pinpoint your exact gate/doorstep</span>
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
              <strong>DOORSTEP LOCATION PINNED</strong>
              {pinnedLocation.source && (
                <span className="accuracy-pill">
                  {pinnedLocation.source === "gps"
                    ? `✓ Accurate GPS (${pinnedLocation.accuracy ? `±${pinnedLocation.accuracy}m` : "Live"})`
                    : pinnedLocation.source === "drag"
                    ? "✓ Exact Pin Drop"
                    : pinnedLocation.source === "search"
                    ? "✓ Verified Search"
                    : "📍 Network Detected"}
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
              ✓ Address fields below are automatically filled. Add your specific flat or floor number below.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

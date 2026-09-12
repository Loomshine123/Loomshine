import './LocationMapSection.css';

export const LocationMapSection = () => {
  const addressString = "Shop No. 262, First Floor, Central Arcade Market, MG Road, Gurugram, Haryana";
  const mapEmbedUrl = "https://maps.google.com/maps?q=Central%20Arcade%20Market%2C%20MG%20Road%2C%20Gurugram%2C%20Haryana&t=&z=16&ie=UTF8&iwloc=&output=embed";
  const mapDirectionsUrl = "https://www.google.com/maps/dir/?api=1&destination=Central+Arcade+Market+MG+Road+Gurugram";

  return (
    <section className="loom-map-section" id="location">
      <div className="loom-map-wrapper">
        {/* Interactive Google Map Iframe */}
        <iframe
          title="Loomshine HQ Location"
          src={mapEmbedUrl}
          width="100%"
          height="280"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="loom-map-iframe"
        />

        {/* Compact Location Card Overlay */}
        <div className="loom-map-card">
          <div className="loom-map-card__header">
            <h4 className="loom-map-card__title">Central Arcade Market, MG Road</h4>
            <a
              href={mapDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="loom-map-card__dir-btn"
              title="Get Directions"
              aria-label="Get Directions on Google Maps"
            >
              Directions →
            </a>
          </div>
          <p className="loom-map-card__address">{addressString}</p>
        </div>
      </div>
    </section>
  );
};

export default LocationMapSection;

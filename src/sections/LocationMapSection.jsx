import './LocationMapSection.css';

export const LocationMapSection = () => {
  const addressString = "4th Floor, BPTP Centra One, Sector 61, Golf Course Ext. Road, Gurugram, Haryana 122102";
  const mapEmbedUrl = "https://maps.google.com/maps?q=BPTP%20Centra%20One%2C%20Sector%2061%2C%20Golf%20Course%20Ext.%20Road%2C%20Gurugram%2C%20Haryana%20122102&t=&z=15&ie=UTF8&iwloc=&output=embed";
  const mapDirectionsUrl = "https://www.google.com/maps/dir/?api=1&destination=BPTP+Centra+One+Sector+61+Gurugram";

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
            <h4 className="loom-map-card__title">BPTP Centra One, Gurugram</h4>
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

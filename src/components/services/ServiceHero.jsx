import './ServiceHero.css';

const ServiceHero = ({ service }) => {
  return (
    <section className="service-hero">
      <div className="service-hero__inner">
        <div className="service-hero__left">
          <span className="eyebrow">LOOMSHINE PROFESSIONAL CARE</span>
          <h1 className="service-title">{service.name}</h1>
          <p className="service-short">{service.shortDescription}</p>

          <div className="service-starting">
            <span className="starting-from">STARTING FROM</span>
            <strong className="price">{service.price ? service.price : 'AS PER ITEM'}</strong>
            <span className="unit">{service.unit}</span>
          </div>

          <a href={service.slug ? `#/contact?service=${service.slug}` : "#/contact"} className="service-cta">BOOK A PICKUP</a>
        </div>

        <div className="service-hero__right">
          {service.image ? (
            <img src={service.image} alt={service.name} />
          ) : (
            <div className="service-hero__image-fallback" />
          )}
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;

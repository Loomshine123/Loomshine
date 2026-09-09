import Image from '../common/Image';
import './ServiceCard.css';

export const ServiceCard = ({ number, title, description, image, onClick }) => {
  return (
    <article
      className="loom-service-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      aria-label={`View details and picture for ${title}`}
    >
      <div className="loom-service-card__header">
        <span className="loom-service-card__badge">{number}</span>
        <Image
          src={image}
          alt={title}
          aspectRatio="4-5"
          hoverZoom
        />
      </div>
      <div className="loom-service-card__body">
        <h3 className="loom-service-card__title">{title}</h3>
        <p className="loom-service-card__desc">{description}</p>
        <button
          type="button"
          className="loom-service-card__arrow"
          aria-label={`Open details and picture for ${title}`}
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
        >
          +
        </button>
      </div>
    </article>
  );
};

export default ServiceCard;

import './ProductCard.css';

const ProductCard = ({ item }) => {
  return (
    <div className="product-card">
      <div className="product-card__media">
        {/* Placeholder image area - services may not have images for each product */}
        <div className="product-card__image-fallback" />
      </div>

      <div className="product-card__body">
        <h4 className="product-name">{item.name}</h4>
        {item.description && <p className="product-desc">{item.description}</p>}

        <div className="product-meta">
          <div className="product-price">
            {item.price ? <strong>{item.price}</strong> : <span className="price-placeholder">Price on request</span>}
            <span className="product-unit">{item.unit || ''}</span>
          </div>

          <a href="#signup" className="product-cta">BOOK NOW →</a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

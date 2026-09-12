import { useCart } from '../../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ item }) => {
  const { addToCart } = useCart();

  const handleAdd = (e) => {
    e.preventDefault();
    if (item.price) {
      addToCart({
        id: item.id || `prod-${item.name.toLowerCase().replace(/\s+/g, '-')}`,
        name: item.name,
        price: item.price,
        unit: item.unit || 'per garment',
        service: item.service || 'Garment Care'
      });
    } else {
      window.location.hash = `#/contact?item=${encodeURIComponent(item.name)}`;
    }
  };

  return (
    <div className="product-card">
      <div className="product-card__media">
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

          <button
            type="button"
            onClick={handleAdd}
            className="product-cta"
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            {item.price ? 'ADD TO BAG +' : 'BOOK NOW →'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

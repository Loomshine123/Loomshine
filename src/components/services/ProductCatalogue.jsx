import { useState } from "react";
import dryCleaningProducts from "../../data/dryCleaningProducts";
import "../../styles/ProductCatalogue.css";

export default function ProductCatalogue() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = [
    ...new Set(
      dryCleaningProducts.map((product) => product.category)
    ),
  ];

  return (
    <section className="product-catalogue">

      <div className="catalogue-header">
        <span className="catalogue-eyebrow">
          LOOMSHINE PROFESSIONAL CARE
        </span>

        <h2>DRY CLEANING COLLECTION</h2>

        <p>
          Select your garments and add them to your pickup order.
        </p>
      </div>

      {categories.map((category) => {

        const categoryProducts =
          dryCleaningProducts.filter(
            (product) => product.category === category
          );

        return (
          <div
            className="product-category"
            key={category}
          >

            <h3>{category}</h3>

            <div className="product-grid">

              {categoryProducts.map((product) => (

                <div
                  className="product-card"
                  key={product.id}
                >

                  <div className="product-image-wrapper">

                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-image"
                    />

                  </div>

                  <div className="product-content">

                    <h4>{product.name}</h4>

                    <p className="product-description">
                      {product.shortDescription}
                    </p>

                    <div className="product-footer">

                      <div className="product-price">

                        <span>₹{product.price}</span>

                        <small>
                          {product.unit}
                        </small>

                      </div>

                      <button
                        className="add-product-btn"
                        onClick={() =>
                          setSelectedProduct(product)
                        }
                      >
                        ADD TO CART
                      </button>

                    </div>

                    <button
                      className="product-details-btn"
                    >
                      VIEW DETAILS →
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </div>
        );

      })}

    </section>
  );
}
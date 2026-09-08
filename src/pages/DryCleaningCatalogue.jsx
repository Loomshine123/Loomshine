import { useState } from "react";
import dryCleaningProducts from "../data/dryCleaningProducts";
import "../styles/DryCleaningCatalogue.css";

export default function DryCleaningCatalogue() {
  const [selectedCategory, setSelectedCategory] = useState("Men");

  const filteredProducts = dryCleaningProducts.filter(
    (product) => product.category === selectedCategory
  );

  const handleAddProduct = (product) => {
    // Save selected product temporarily
    sessionStorage.setItem(
      "pendingCartProduct",
      JSON.stringify(product)
    );

    // Redirect user to signup
    window.location.hash = "#signup";
  };

  return (
    <main className="dry-cleaning-catalogue">

      {/* HERO */}
      <section className="catalogue-hero">
        <div className="catalogue-container">

          <p className="catalogue-eyebrow">
            LOOMSHINE PROFESSIONAL CARE
          </p>

          <h1>DRY CLEANING</h1>

          <p className="catalogue-hero-description">
            Premium care for delicate fabrics, formal wear, couture and
            garments that require specialised cleaning.
          </p>

        </div>
      </section>


      {/* CATALOGUE */}
      <section className="catalogue-section">
        <div className="catalogue-container">

          {/* HEADER */}
          <div className="catalogue-header">

            <div className="catalogue-heading">

              <span className="catalogue-section-label">
                OUR PRICE LIST
              </span>

              <h2>CHOOSE YOUR GARMENT</h2>

              <p>
                Select a category to explore our professional dry cleaning
                services and transparent pricing.
              </p>

            </div>

          </div>


          {/* POWERFUL CATEGORY SELECTOR */}
          <div className="category-selector">

            <button
              className={`category-tab ${
                selectedCategory === "Men" ? "active" : ""
              }`}
              onClick={() => setSelectedCategory("Men")}
              type="button"
            >
              <span className="category-number">01</span>

              <span className="category-tab-content">
                <small>GARMENT CARE</small>
                <strong>MEN</strong>
              </span>

              <span className="category-arrow">→</span>
            </button>


            <button
              className={`category-tab ${
                selectedCategory === "Women" ? "active" : ""
              }`}
              onClick={() => setSelectedCategory("Women")}
              type="button"
            >
              <span className="category-number">02</span>

              <span className="category-tab-content">
                <small>GARMENT CARE</small>
                <strong>WOMEN</strong>
              </span>

              <span className="category-arrow">→</span>
            </button>


            <button
              className={`category-tab ${
                selectedCategory === "Household" ? "active" : ""
              }`}
              onClick={() => setSelectedCategory("Household")}
              type="button"
            >
              <span className="category-number">03</span>

              <span className="category-tab-content">
                <small>FABRIC & HOME CARE</small>
                <strong>HOUSEHOLD</strong>
              </span>

              <span className="category-arrow">→</span>
            </button>

          </div>


          {/* CATEGORY TITLE */}
          <div className="selected-category-heading">

            <span>EXPLORE OUR SERVICES FOR</span>

            <h3>
              {selectedCategory.toUpperCase()}
            </h3>

          </div>


          {/* PRODUCTS */}
          <div className="products-grid">

            {filteredProducts.map((product) => (
              <article
                className="product-card"
                key={product.id}
              >

                {/* IMAGE */}
                <div className="product-image-wrapper">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />

                </div>


                {/* CONTENT */}
                <div className="product-content">

                  <div className="product-title-row">
                    <h3>{product.name}</h3>
                  </div>


                  <p className="product-description">
                    {product.shortDescription}
                  </p>


                  <div className="product-divider" />


                  <div className="product-footer">

                    <div className="product-price">

                      <span className="price-label">
                        STARTING FROM
                      </span>

                      <strong>
                        ₹{product.price}
                      </strong>

                      <span className="product-unit">
                        {product.unit}
                      </span>

                    </div>


                    <button
                      className="add-to-cart-btn"
                      type="button"
                      onClick={() => handleAddProduct(product)}
                    >
                      <span>ADD</span>
                      <span className="add-arrow">+</span>
                    </button>

                  </div>

                </div>

              </article>
            ))}

          </div>


          {/* EMPTY STATE */}
          {filteredProducts.length === 0 && (
            <div className="no-products">

              <h3>
                Products coming soon
              </h3>

              <p>
                We are currently updating our{" "}
                {selectedCategory.toLowerCase()} dry cleaning catalogue.
              </p>

            </div>
          )}

        </div>
      </section>

    </main>
  );
}
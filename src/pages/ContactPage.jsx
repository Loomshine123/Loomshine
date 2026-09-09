import { useState, useEffect } from "react";
import "../styles/ContactPage.css";

export default function ContactPage() {
  useEffect(() => {
    document.title = "Book a Pickup | LOOMSHINE Luxury Garment Care";
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    service: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Pickup Request:", formData);

    alert("Your pickup request has been submitted successfully!");

    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
      service: "",
      message: "",
    });
  };

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="contact-container">

          <p className="contact-eyebrow">
            LOOMSHINE PROFESSIONAL CARE
          </p>

          <h1>
            BOOK A
            <span> PICKUP.</span>
          </h1>

          <p className="contact-description">
            Schedule a convenient pickup and let Loomshine take care of your
            laundry and dry cleaning needs.
          </p>

        </div>
      </section>


      <section className="contact-form-section">
        <div className="contact-container contact-layout">

          <div className="contact-info">

            <span className="contact-section-label">
              GET STARTED
            </span>

            <h2>
              YOUR CLOTHES.
              <br />
              OUR CARE.
            </h2>

            <p>
              Fill in your details and our team will get in touch to confirm
              your pickup.
            </p>


            <div className="contact-benefits">

              <div className="contact-benefit">
                <span>01</span>

                <div>
                  <h3>DOORSTEP PICKUP</h3>
                  <p>
                    We collect your garments directly from your location.
                  </p>
                </div>
              </div>


              <div className="contact-benefit">
                <span>02</span>

                <div>
                  <h3>PROFESSIONAL CARE</h3>
                  <p>
                    Every garment receives specialised cleaning and handling.
                  </p>
                </div>
              </div>


              <div className="contact-benefit">
                <span>03</span>

                <div>
                  <h3>DOORSTEP DELIVERY</h3>
                  <p>
                    Your freshly cleaned garments are delivered back to you.
                  </p>
                </div>
              </div>

            </div>

          </div>


          <form
            className="pickup-form"
            onSubmit={handleSubmit}
          >

            <div className="form-header">
              <span>BOOK YOUR PICKUP</span>

              <h2>LET'S GET STARTED</h2>
            </div>


            <div className="form-grid">

              <div className="form-group">
                <label>FULL NAME</label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>


              <div className="form-group">
                <label>PHONE NUMBER</label>

                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>


              <div className="form-group">
                <label>EMAIL ADDRESS</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>


              <div className="form-group">
                <label>SERVICE REQUIRED</label>

                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select a service
                  </option>

                  <option value="Wash & Fold">
                    Wash & Fold
                  </option>

                  <option value="Wash & Iron">
                    Wash & Iron
                  </option>

                  <option value="Steam Press">
                    Steam Press
                  </option>

                  <option value="Dry Cleaning">
                    Dry Cleaning
                  </option>

                  <option value="Shoe Cleaning">
                    Shoe Cleaning
                  </option>

                </select>
              </div>

            </div>


            <div className="form-group form-group-full">
              <label>PICKUP ADDRESS</label>

              <textarea
                name="address"
                placeholder="Enter your complete pickup address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>


            <div className="form-group form-group-full">
              <label>ADDITIONAL DETAILS</label>

              <textarea
                name="message"
                placeholder="Tell us anything else about your pickup..."
                value={formData.message}
                onChange={handleChange}
              />
            </div>


            <button
              type="submit"
              className="submit-pickup-btn"
            >
              REQUEST PICKUP
              <span>→</span>
            </button>

          </form>

        </div>
      </section>
    </main>
  );
}
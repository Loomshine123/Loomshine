import React, { useEffect } from 'react';
import Header from '../components/navigation/Header';
import Footer from '../components/navigation/Footer';
import PickupBookingForm from '../components/booking/PickupBookingForm';
import Container from '../components/common/Container';

export const BookPickupPage = ({ onOpenAuth }) => {
  useEffect(() => {
    document.title = 'Schedule a Pickup | LOOMSHINE Luxury Garment Care';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="loom-page-wrapper">
      <Header onOpenAuth={onOpenAuth} currentPage="book-pickup" />
      <main style={{ paddingTop: '100px', paddingBottom: '80px', backgroundColor: '#F8F7F3' }}>
        <Container>
          <PickupBookingForm />
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default BookPickupPage;

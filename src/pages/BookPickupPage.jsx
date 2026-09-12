import React, { useEffect } from 'react';
import PickupBookingForm from '../components/booking/PickupBookingForm';
import Container from '../components/common/Container';

export const BookPickupPage = () => {
  useEffect(() => {
    document.title = 'Schedule a Pickup | LOOMSHINE Luxury Garment Care';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={{ paddingTop: '120px', paddingBottom: '80px', backgroundColor: '#F8F7F3' }}>
      <Container>
        <PickupBookingForm />
      </Container>
    </main>
  );
};

export default BookPickupPage;

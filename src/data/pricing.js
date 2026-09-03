export const pricingData = {
  note: 'Pricing presented below represents standard estimate guidelines. Final pricing depends on fabric complexity and custom care instructions.',
  currencySymbol: '₹',
  placeholderRate: '₹XX',
  categories: [
    {
      id: 'laundry-kg',
      name: 'Laundry per kg',
      startingPrice: '₹XX',
      unit: 'per kg',
      turnaround: '24-48 Hours',
      popular: true,
      items: [
        { name: 'Wash & Fold', price: '₹XX / kg' },
        { name: 'Wash & Iron', price: '₹XX / kg' },
        { name: 'Premium Linen Wash', price: '₹XX / kg' }
      ]
    },
    {
      id: 'dry-cleaning-item',
      name: 'Dry Cleaning per garment',
      startingPrice: '₹XX',
      unit: 'per item',
      turnaround: '48-72 Hours',
      popular: false,
      items: [
        { name: '2-Piece Suit', price: '₹XX' },
        { name: 'Evening / Formal Dress', price: '₹XX' },
        { name: 'Silk Shirt / Blouse', price: '₹XX' },
        { name: 'Woolen Coat / Blazer', price: '₹XX' }
      ]
    },
    {
      id: 'pressing-item',
      name: 'Pressing per garment',
      startingPrice: '₹XX',
      unit: 'per item',
      turnaround: '24 Hours',
      popular: false,
      items: [
        { name: 'Executive Shirt Steam Press', price: '₹XX' },
        { name: 'Trouser / Denim Press', price: '₹XX' },
        { name: 'Traditional Wear Press', price: '₹XX' }
      ]
    },
    {
      id: 'shoe-bag-item',
      name: 'Shoe & Bag Care per item',
      startingPrice: '₹XX',
      unit: 'per item',
      turnaround: '3-5 Days',
      popular: false,
      items: [
        { name: 'Luxury Sneaker Deep Clean', price: '₹XX' },
        { name: 'Leather Shoe Polish & Spa', price: '₹XX' },
        { name: 'Designer Handbag Spa', price: '₹XX' }
      ]
    }
  ]
};

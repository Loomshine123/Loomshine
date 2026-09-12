export const pricingData = {
  note: 'Final pricing depends on fabric complexity and custom care instructions.',
  currencySymbol: '₹',
  placeholderRate: '₹XX',
  categories: [
    {
      id: 'laundry-kg',
      name: 'Laundry',
      startingPrice: '₹79',
      unit: 'per kg',
      turnaround: '24-48 Hours',
      popular: true,
      serviceSlug: 'wash-fold',
      items: []
    },
    {
      id: 'dry-cleaning-item',
      name: 'Dry Cleaning',
      startingPrice: '₹100',
      unit: 'per garment',
      turnaround: '48-72 Hours',
      popular: false,
      serviceSlug: 'dry-cleaning',
      items: []
    },
    {
      id: 'pressing-item',
      name: 'Pressing',
      startingPrice: '₹49',
      unit: 'per garment',
      turnaround: '24 Hours',
      popular: false,
      serviceSlug: 'steam-press',
      items: []
    },
    {
      id: 'shoe-bag-item',
      name: 'Shoe & Bag Care',
      startingPrice: '₹399',
      unit: 'per item',
      turnaround: '3-5 Days',
      popular: false,
      serviceSlug: 'shoe-cleaning',
      items: []
    }
  ]
};


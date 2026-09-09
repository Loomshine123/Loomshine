export const pricingData = {
  note: 'Final pricing depends on fabric complexity and custom care instructions.',
  currencySymbol: 'Rs',
  placeholderRate: 'Rs XX',
  categories: [
    {
      id: 'laundry-kg',
      name: 'Laundry',
      startingPrice: 'Rs XX',
      unit: 'per kg',
      turnaround: '24-48 Hours',
      popular: true,
      serviceSlug: 'wash-fold',
      items: []
    },
    {
      id: 'dry-cleaning-item',
      name: 'Dry Cleaning',
      startingPrice: 'Rs XX',
      unit: 'per garment',
      turnaround: '48-72 Hours',
      popular: false,
      serviceSlug: 'dry-cleaning',
      items: []
    },
    {
      id: 'pressing-item',
      name: 'Pressing',
      startingPrice: 'Rs XX',
      unit: 'per garment',
      turnaround: '24 Hours',
      popular: false,
      serviceSlug: 'steam-press',
      items: []
    },
    {
      id: 'shoe-bag-item',
      name: 'Shoe & Bag Care',
      startingPrice: 'Rs XX',
      unit: 'per item',
      turnaround: '3-5 Days',
      popular: false,
      serviceSlug: 'shoe-cleaning',
      items: []
    }
  ]
};

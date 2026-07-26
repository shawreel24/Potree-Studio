const img = (name) => `assets/images/${name}`;

export const products = [
  { 
    id: '1', 
    title: 'Pink Blossom Mug', 
    price: '₹1,299', 
    image: img('mug_pink_flower.webp'),
    description: 'A beautiful pink blossom mug to start your day with joy.',
    tags: ['floral', 'pink', 'mug', 'gift'],
    materials: ['High-fired ceramic', 'Stoneware', 'Hand Painted'],
    quantity: 10,
  },
  { 
    id: '2', 
    title: 'Fairy Door Cup', 
    price: '₹1,499', 
    image: img('cup_fairy_door.webp'),
    description: 'A magical cup featuring a tiny fairy door design.',
    tags: ['magical', 'fairy', 'cup'],
    materials: ['High-fired ceramic', 'Stoneware', 'Wheel Thrown'],
    quantity: 10,
  },
  { 
    id: '3', 
    title: 'Sunny Cherry Cup', 
    price: '₹999', 
    image: img('cup_yellow_cherry.webp'),
    description: 'Brighten your morning with this sunny cherry cup.',
    tags: ['sunny', 'cherry', 'cup', 'yellow'],
    materials: ['Ceramic', 'Hand Painted'],
    quantity: 10,
  },
  { 
    id: '4', 
    title: 'Garden Sunflower Mug', 
    price: '₹1,399', 
    image: img('mug_sunflower.webp'),
    description: 'A warm and inviting mug adorned with hand-painted sunflowers.',
    tags: ['sunflower', 'garden', 'mug', 'floral'],
    materials: ['Stoneware', 'Wheel Thrown', 'Glazed finish'],
    quantity: 10,
  },
];


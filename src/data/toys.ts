// Sample toy data - will be replaced with API calls later
import superheroImage from '@/assets/superhero-figure.jpg';
import princessImage from '@/assets/princess-doll.jpg';
import raceCarImage from '@/assets/race-car.jpg';
import dollhouseImage from '@/assets/dollhouse.jpg';
import robotImage from '@/assets/robot-transformer.jpg';
import castleImage from '@/assets/fairy-castle.jpg';

export interface Toy {
  id: string;
  name: string;
  category: 'Boys' | 'Girls';
  description: string;
  price: number;
  stock: number;
  images: string[];
  featured?: boolean;
}

export const sampleToys: Toy[] = [
  {
    id: 'T001',
    name: 'Super Hero Action Figure',
    category: 'Boys',
    description: 'Amazing superhero figure with moveable joints and cape. Perfect for imaginative play and adventures!',
    price: 24.99,
    stock: 50,
    images: [superheroImage],
    featured: true
  },
  {
    id: 'T002',
    name: 'Princess Doll with Tiara',
    category: 'Girls',
    description: 'Beautiful princess doll with sparkly dress and golden tiara. Comes with brushable hair and accessories.',
    price: 29.99,
    stock: 35,
    images: [princessImage],
    featured: true
  },
  {
    id: 'T003',
    name: 'Speed Racer Car',
    category: 'Boys',
    description: 'Fast racing car with realistic details and working wheels. Ready for high-speed adventures!',
    price: 19.99,
    stock: 42,
    images: [raceCarImage]
  },
  {
    id: 'T004',
    name: 'Dream Dollhouse',
    category: 'Girls',
    description: 'Multi-room dollhouse with furniture and accessories. Perfect for storytelling and creative play.',
    price: 89.99,
    stock: 15,
    images: [dollhouseImage],
    featured: true
  },
  {
    id: 'T005',
    name: 'Robot Transformer',
    category: 'Boys',
    description: 'Transforming robot that changes from vehicle to robot mode. Features lights and sounds!',
    price: 45.99,
    stock: 28,
    images: [robotImage]
  },
  {
    id: 'T006',
    name: 'Fairy Castle Playset',
    category: 'Girls',
    description: 'Magical fairy castle with towers, bridge, and fairy figures. Includes sparkly details and accessories.',
    price: 65.99,
    stock: 20,
    images: [castleImage]
  }
];

// Helper functions for filtering
export const getToysByCategory = (category: 'Boys' | 'Girls' | 'All') => {
  if (category === 'All') return sampleToys;
  return sampleToys.filter(toy => toy.category === category);
};

export const getFeaturedToys = () => {
  return sampleToys.filter(toy => toy.featured);
};

export const searchToys = (query: string) => {
  const searchTerm = query.toLowerCase();
  return sampleToys.filter(toy => 
    toy.name.toLowerCase().includes(searchTerm) ||
    toy.description.toLowerCase().includes(searchTerm)
  );
};
import { ToyCard } from "@/components/ToyCard";
import { Button } from "@/components/ui/button";
import { Toy } from "@/data/toys";
import { ArrowRight } from "lucide-react";

interface CategorySectionProps {
  title: string;
  toys: Toy[];
  category: 'Boys' | 'Girls';
  onViewDetails: (toyId: string) => void;
  onAddToCart?: (toyId: string) => void;
  onViewAll?: () => void;
}

export const CategorySection = ({ 
  title, 
  toys, 
  category, 
  onViewDetails, 
  onAddToCart, 
  onViewAll 
}: CategorySectionProps) => {
  const gradientClass = category === 'Boys' ? 'bg-gradient-boys' : 'bg-gradient-girls';
  const buttonVariant = category === 'Boys' ? 'boys' : 'girls';
  
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={`rounded-2xl p-8 mb-8 ${gradientClass} text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading text-4xl font-bold mb-2">
                {title}
              </h2>
              <p className="font-body text-lg opacity-90">
                Discover amazing toys perfect for {category.toLowerCase()}!
              </p>
            </div>
            {onViewAll && (
              <Button variant="secondary" onClick={onViewAll} className="hidden md:flex">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        
        {/* Toys Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {toys.map((toy) => (
            <ToyCard
              key={toy.id}
              toy={toy}
              onViewDetails={onViewDetails}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
        
        {toys.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🧸</div>
            <h3 className="font-heading text-2xl font-bold text-muted-foreground mb-2">
              No toys found
            </h3>
            <p className="font-body text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        )}
        
        {/* Mobile View All Button */}
        {onViewAll && (
          <div className="flex justify-center mt-8 md:hidden">
            <Button variant={buttonVariant} onClick={onViewAll}>
              View All {title} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
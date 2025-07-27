import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Eye } from "lucide-react";
import { Toy } from "@/data/toys";

interface ToyCardProps {
  toy: Toy;
  onViewDetails: (toyId: string) => void;
  onAddToCart?: (toyId: string) => void;
}

export const ToyCard = ({ toy, onViewDetails, onAddToCart }: ToyCardProps) => {
  const categoryVariant = toy.category === 'Boys' ? 'boys' : 'girls';
  
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer bg-card hover:bg-card-hover border-2 border-transparent hover:border-primary/20">
      <div className="relative overflow-hidden">
        <img
          src={toy.images[0]}
          alt={toy.name}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        {toy.featured && (
          <div className="absolute top-2 right-2 bg-accent-yellow text-accent-yellow-foreground px-2 py-1 rounded-full text-xs font-semibold">
            Featured
          </div>
        )}
        {toy.stock <= 10 && toy.stock > 0 && (
          <div className="absolute top-2 left-2 bg-destructive text-destructive-foreground px-2 py-1 rounded-full text-xs font-semibold">
            Low Stock
          </div>
        )}
        {toy.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
      </div>
      
      <CardContent className="p-4 space-y-3">
        <div className="space-y-2">
          <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors">
            {toy.name}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 font-body">
            {toy.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary font-body">
            ${toy.price.toFixed(2)}
          </span>
          <span className="text-sm text-muted-foreground font-body">
            In Stock: {toy.stock}
          </span>
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(toy.id)}
            className="flex-1 font-body"
          >
            <Eye className="h-4 w-4 mr-1" />
            View Details
          </Button>
          {onAddToCart && (
            <Button
              variant={categoryVariant}
              size="sm"
              onClick={() => onAddToCart(toy.id)}
              disabled={toy.stock === 0}
              className="flex-1 font-body"
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add to Cart
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
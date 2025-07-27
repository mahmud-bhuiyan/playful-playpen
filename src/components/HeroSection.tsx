import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Heart, Zap } from "lucide-react";
import heroBackground from '@/assets/hero-background.jpg';

interface HeroSectionProps {
  onShopNow: () => void;
  onExploreBoys: () => void;
  onExploreGirls: () => void;
}

export const HeroSection = ({ onShopNow, onExploreBoys, onExploreGirls }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-girls/20"></div>
      </div>
      
      {/* Floating Animation Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="animate-bounce absolute top-20 left-10 text-4xl">🧸</div>
        <div className="animate-bounce absolute top-32 right-20 text-3xl" style={{ animationDelay: '0.5s' }}>🚗</div>
        <div className="animate-bounce absolute bottom-40 left-20 text-3xl" style={{ animationDelay: '1s' }}>⭐</div>
        <div className="animate-bounce absolute bottom-32 right-10 text-4xl" style={{ animationDelay: '1.5s' }}>🎀</div>
        <div className="animate-bounce absolute top-1/2 left-1/4 text-2xl" style={{ animationDelay: '2s' }}>🎨</div>
        <div className="animate-bounce absolute top-1/3 right-1/3 text-2xl" style={{ animationDelay: '2.5s' }}>🚀</div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="inline-flex items-center px-4 py-2 bg-accent-yellow/20 backdrop-blur-sm rounded-full text-accent-yellow-foreground font-body font-semibold mb-4">
            <Star className="h-4 w-4 mr-2" />
            #1 Toy Store for Kids
          </div>
        </div>
        
        <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
          <span className="block">Magical Toys</span>
          <span className="block bg-gradient-hero bg-clip-text text-transparent">
            Endless Fun!
          </span>
        </h1>
        
        <p className="font-body text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md">
          Discover amazing toys that spark imagination and create unforgettable memories for boys and girls of all ages!
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            variant="hero" 
            size="lg" 
            onClick={onShopNow}
            className="text-lg px-8 py-4 shadow-glow"
          >
            <Zap className="h-5 w-5 mr-2" />
            Shop Now
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
          
          <div className="flex gap-3">
            <Button 
              variant="boys" 
              size="lg" 
              onClick={onExploreBoys}
              className="px-6 py-3"
            >
              Boys' Toys
            </Button>
            <Button 
              variant="girls" 
              size="lg" 
              onClick={onExploreGirls}
              className="px-6 py-3"
            >
              <Heart className="h-4 w-4 mr-2" />
              Girls' Toys
            </Button>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div className="text-center">
            <div className="font-heading text-3xl font-bold text-white drop-shadow-md">1000+</div>
            <div className="font-body text-white/80 text-sm">Happy Kids</div>
          </div>
          <div className="text-center">
            <div className="font-heading text-3xl font-bold text-white drop-shadow-md">500+</div>
            <div className="font-body text-white/80 text-sm">Amazing Toys</div>
          </div>
          <div className="text-center">
            <div className="font-heading text-3xl font-bold text-white drop-shadow-md">50+</div>
            <div className="font-body text-white/80 text-sm">Countries</div>
          </div>
        </div>
      </div>
    </section>
  );
};
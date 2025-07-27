import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Search, Menu, X, User, Heart } from "lucide-react";

interface HeaderProps {
  onSearch: (query: string) => void;
  onCartClick: () => void;
  onLoginClick: () => void;
  cartItemCount?: number;
  isLoggedIn?: boolean;
  userEmail?: string;
}

export const Header = ({ 
  onSearch, 
  onCartClick, 
  onLoginClick, 
  cartItemCount = 0, 
  isLoggedIn = false,
  userEmail 
}: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="text-3xl">🧸</div>
            <div>
              <h1 className="font-heading text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                ToyWorld
              </h1>
              <p className="font-body text-xs text-muted-foreground -mt-1">Magical Toys for Everyone</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#boys" className="font-body text-foreground hover:text-boys transition-colors font-medium">
              Boys' Toys
            </a>
            <a href="#girls" className="font-body text-foreground hover:text-girls transition-colors font-medium">
              Girls' Toys
            </a>
            <a href="#featured" className="font-body text-foreground hover:text-primary transition-colors font-medium">
              Featured
            </a>
            <a href="#new" className="font-body text-foreground hover:text-accent-green transition-colors font-medium">
              New Arrivals
            </a>
          </nav>

          {/* Search Bar (Desktop) */}
          <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search for toys..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 font-body"
              />
            </div>
          </form>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* User Account */}
            {isLoggedIn ? (
              <div className="hidden md:flex items-center space-x-2">
                <span className="font-body text-sm text-foreground">Hi, {userEmail?.split('@')[0]}</span>
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="sm" onClick={onLoginClick} className="hidden md:flex">
                <User className="h-4 w-4 mr-2" />
                <span className="font-body">Login</span>
              </Button>
            )}

            {/* Wishlist */}
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Heart className="h-4 w-4" />
            </Button>

            {/* Shopping Cart */}
            <Button variant="ghost" size="sm" onClick={onCartClick} className="relative">
              <ShoppingCart className="h-4 w-4" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </span>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search (below header) */}
        <div className="lg:hidden pb-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search for toys..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 font-body"
            />
          </form>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-3">
            <a href="#boys" className="block font-body text-foreground hover:text-boys transition-colors py-2">
              Boys' Toys
            </a>
            <a href="#girls" className="block font-body text-foreground hover:text-girls transition-colors py-2">
              Girls' Toys
            </a>
            <a href="#featured" className="block font-body text-foreground hover:text-primary transition-colors py-2">
              Featured
            </a>
            <a href="#new" className="block font-body text-foreground hover:text-accent-green transition-colors py-2">
              New Arrivals
            </a>
            {!isLoggedIn && (
              <Button variant="outline" onClick={onLoginClick} className="w-full mt-4">
                <User className="h-4 w-4 mr-2" />
                Login / Sign Up
              </Button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
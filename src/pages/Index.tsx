import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { CategorySection } from "@/components/CategorySection";
import { SearchAndFilters } from "@/components/SearchAndFilters";
import { sampleToys, getToysByCategory, searchToys } from "@/data/toys";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Boys' | 'Girls'>('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');

  // Filter toys based on current filters
  const filteredToys = useMemo(() => {
    let toys = selectedCategory === 'All' ? sampleToys : getToysByCategory(selectedCategory);
    
    // Apply search filter
    if (searchQuery.trim()) {
      toys = searchToys(searchQuery);
      if (selectedCategory !== 'All') {
        toys = toys.filter(toy => toy.category === selectedCategory);
      }
    }
    
    // Apply price filter
    if (selectedPriceRange !== 'all') {
      toys = toys.filter(toy => {
        switch (selectedPriceRange) {
          case '0-20':
            return toy.price <= 20;
          case '20-50':
            return toy.price > 20 && toy.price <= 50;
          case '50-100':
            return toy.price > 50 && toy.price <= 100;
          case '100+':
            return toy.price > 100;
          default:
            return true;
        }
      });
    }
    
    return toys;
  }, [searchQuery, selectedCategory, selectedPriceRange]);

  const boysToys = useMemo(() => getToysByCategory('Boys').slice(0, 4), []);
  const girlsToys = useMemo(() => getToysByCategory('Girls').slice(0, 4), []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      toast({
        title: "Search Applied",
        description: `Searching for "${query}"`,
      });
    }
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory('All');
    setSelectedPriceRange('all');
    toast({
      title: "Filters Cleared",
      description: "All filters have been reset",
    });
  };

  const handleViewDetails = (toyId: string) => {
    toast({
      title: "Product Details",
      description: `Viewing details for toy ${toyId}`,
    });
  };

  const handleAddToCart = (toyId: string) => {
    toast({
      title: "Added to Cart!",
      description: "Item has been added to your cart",
    });
  };

  const handleCartClick = () => {
    toast({
      title: "Cart",
      description: "Cart functionality coming soon!",
    });
  };

  const handleLoginClick = () => {
    toast({
      title: "Login",
      description: "Login functionality coming soon!",
    });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header
        onSearch={handleSearch}
        onCartClick={handleCartClick}
        onLoginClick={handleLoginClick}
        cartItemCount={0}
        isLoggedIn={false}
      />
      
      <HeroSection
        onShopNow={() => scrollToSection('featured')}
        onExploreBoys={() => scrollToSection('boys')}
        onExploreGirls={() => scrollToSection('girls')}
      />

      {/* Search and Filters Section */}
      <div className="container mx-auto px-4 py-8">
        <SearchAndFilters
          onSearch={handleSearch}
          onCategoryFilter={setSelectedCategory}
          onPriceFilter={setSelectedPriceRange}
          onClearFilters={handleClearFilters}
          currentCategory={selectedCategory}
          currentPriceRange={selectedPriceRange}
          searchQuery={searchQuery}
        />
      </div>

      {/* Filtered Results */}
      {(searchQuery || selectedCategory !== 'All' || selectedPriceRange !== 'all') && (
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-3xl font-bold mb-6 text-center">
              Search Results ({filteredToys.length} toys found)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredToys.map((toy) => (
                <div key={toy.id} className="transform hover:scale-105 transition-transform duration-300">
                  {/* We'll use the ToyCard component here */}
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img src={toy.images[0]} alt={toy.name} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2">{toy.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{toy.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-primary">${toy.price}</span>
                        <button 
                          onClick={() => handleAddToCart(toy.id)}
                          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Sections - only show when no filters are active */}
      {!searchQuery && selectedCategory === 'All' && selectedPriceRange === 'all' && (
        <>
          <div id="boys">
            <CategorySection
              title="Toys for Boys"
              toys={boysToys}
              category="Boys"
              onViewDetails={handleViewDetails}
              onAddToCart={handleAddToCart}
              onViewAll={() => setSelectedCategory('Boys')}
            />
          </div>

          <div id="girls">
            <CategorySection
              title="Toys for Girls"
              toys={girlsToys}
              category="Girls"
              onViewDetails={handleViewDetails}
              onAddToCart={handleAddToCart}
              onViewAll={() => setSelectedCategory('Girls')}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Index;

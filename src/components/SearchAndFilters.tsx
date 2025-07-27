import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, X } from "lucide-react";

interface SearchAndFiltersProps {
  onSearch: (query: string) => void;
  onCategoryFilter: (category: 'All' | 'Boys' | 'Girls') => void;
  onPriceFilter: (priceRange: string) => void;
  onClearFilters: () => void;
  currentCategory: 'All' | 'Boys' | 'Girls';
  currentPriceRange: string;
  searchQuery: string;
}

export const SearchAndFilters = ({
  onSearch,
  onCategoryFilter,
  onPriceFilter,
  onClearFilters,
  currentCategory,
  currentPriceRange,
  searchQuery
}: SearchAndFiltersProps) => {
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localSearch);
  };

  const hasActiveFilters = currentCategory !== 'All' || currentPriceRange !== 'all' || searchQuery !== '';

  return (
    <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end">
        {/* Search Bar */}
        <div className="flex-1 w-full">
          <label htmlFor="search" className="block text-sm font-medium text-foreground mb-2 font-body">
            Search Toys
          </label>
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              id="search"
              type="text"
              placeholder="Search for toys..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="pl-10 font-body"
            />
          </form>
        </div>

        {/* Category Filter */}
        <div className="w-full lg:w-48">
          <label className="block text-sm font-medium text-foreground mb-2 font-body">
            Category
          </label>
          <Select value={currentCategory} onValueChange={onCategoryFilter}>
            <SelectTrigger className="font-body">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Toys</SelectItem>
              <SelectItem value="Boys">Toys for Boys</SelectItem>
              <SelectItem value="Girls">Toys for Girls</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Filter */}
        <div className="w-full lg:w-48">
          <label className="block text-sm font-medium text-foreground mb-2 font-body">
            Price Range
          </label>
          <Select value={currentPriceRange} onValueChange={onPriceFilter}>
            <SelectTrigger className="font-body">
              <SelectValue placeholder="All Prices" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="0-20">$0 - $20</SelectItem>
              <SelectItem value="20-50">$20 - $50</SelectItem>
              <SelectItem value="50-100">$50 - $100</SelectItem>
              <SelectItem value="100+">$100+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 w-full lg:w-auto">
          <Button type="submit" onClick={handleSearchSubmit} className="flex-1 lg:flex-none font-body">
            <Filter className="h-4 w-4 mr-2" />
            Apply
          </Button>
          {hasActiveFilters && (
            <Button 
              variant="outline" 
              onClick={onClearFilters}
              className="flex-1 lg:flex-none font-body"
            >
              <X className="h-4 w-4 mr-2" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium text-muted-foreground font-body">Active filters:</span>
            {currentCategory !== 'All' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary font-body">
                {currentCategory}
              </span>
            )}
            {currentPriceRange !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary font-body">
                ${currentPriceRange}
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary font-body">
                "{searchQuery}"
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
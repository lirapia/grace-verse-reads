import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export const SearchBar = ({ onSearch, isLoading = false }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search verses (e.g., 'John 3:16' or 'love')"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-12 text-base bg-white/80 backdrop-blur-sm border-primary/20 focus:border-primary/40 font-body"
            disabled={isLoading}
          />
        </div>
        
        <Button 
          type="submit" 
          size="lg"
          disabled={!query.trim() || isLoading}
          className="h-12 px-6 font-ui font-medium"
        >
          {isLoading ? (
            <div className="animate-pulse-gentle">Searching...</div>
          ) : (
            'Search'
          )}
        </Button>
      </div>
      
      <div className="mt-3 text-center">
        <p className="text-sm text-muted-foreground font-ui">
          Try searching for book chapters like "Matthew 5" or keywords like "love", "faith", "hope"
        </p>
      </div>
    </form>
  );
};
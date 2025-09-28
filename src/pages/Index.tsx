import { useState } from 'react';
import { Book, Heart, Search, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FeaturedVerse } from '@/components/FeaturedVerse';
import { BibleReader } from '@/components/BibleReader';
import { FavoritesManager } from '@/components/FavoritesManager';
import { SearchBar } from '@/components/SearchBar';
import { useToast } from '@/hooks/use-toast';
import { searchVerses } from '@/lib/bible-api';
import { BibleApiResponse } from '@/types/bible';

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchResults, setSearchResults] = useState<BibleApiResponse | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState('read');
  const { toast } = useToast();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    try {
      const results = await searchVerses(query);
      setSearchResults(results);
      if (results) {
        setActiveTab('search');
        toast({
          title: "Search completed",
          description: `Found results for "${query}"`
        });
      } else {
        toast({
          title: "No results found",
          description: `Try searching for a book and chapter like "John 3" or "Psalms 23"`,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Search failed",
        description: "Please try again with a different search term",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-featured rounded-lg flex items-center justify-center">
                <Book className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="font-scripture text-2xl text-foreground">OpenBible</h1>
                <p className="font-ui text-sm text-muted-foreground">Read. Search. Save.</p>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="rounded-full h-10 w-10 p-0"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Featured Verse Banner */}
        <FeaturedVerse />

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} isLoading={isSearching} />

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="read" className="flex items-center gap-2 font-ui">
              <Book className="h-4 w-4" />
              <span className="hidden sm:inline">Read</span>
            </TabsTrigger>
            <TabsTrigger value="search" className="flex items-center gap-2 font-ui">
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Search</span>
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2 font-ui">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Favorites</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="read" className="animate-fade-in">
            <BibleReader />
          </TabsContent>

          <TabsContent value="search" className="animate-fade-in">
            {searchResults ? (
              <div className="w-full max-w-4xl mx-auto">
                <div className="bg-card rounded-xl p-8 shadow-card">
                  <h2 className="font-scripture text-2xl mb-6 text-center">
                    Search Results: {searchResults.reference}
                  </h2>
                  
                  <div className="scripture-text space-y-4">
                    {searchResults.verses.map((verse, index) => (
                      <div key={index} className="p-4 bg-secondary/30 rounded-lg">
                        <div className="flex items-start gap-4">
                          <span className="inline-flex items-center justify-center w-8 h-8 bg-primary/10 text-primary font-ui font-semibold text-sm rounded-full flex-shrink-0 mt-1">
                            {verse.verse}
                          </span>
                          <p className="text-foreground leading-relaxed text-lg flex-1">
                            {verse.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 text-center text-sm text-muted-foreground font-ui">
                    Translation: {searchResults.translation_name}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-20">
                <Search className="h-16 w-16 text-muted-foreground mx-auto mb-6 opacity-50" />
                <h2 className="font-scripture text-2xl text-foreground mb-4">Search Scripture</h2>
                <p className="font-body text-muted-foreground text-lg leading-relaxed max-w-md mx-auto">
                  Use the search bar above to find specific verses, chapters, or keywords in the Bible.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="favorites" className="animate-fade-in">
            <FavoritesManager />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-card/50 backdrop-blur-sm border-t border-border/50 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-featured rounded-lg flex items-center justify-center">
                <Book className="h-5 w-5 text-white" />
              </div>
              <span className="font-scripture text-xl text-foreground">OpenBible</span>
            </div>
            
            <p className="font-body text-muted-foreground text-sm max-w-2xl mx-auto leading-relaxed">
              "Your word is a lamp for my feet, a light on my path." — Psalm 119:105
            </p>
            
            <div className="mt-6 pt-6 border-t border-border/50">
              <p className="font-ui text-xs text-muted-foreground">
                Scripture content provided by Bible API. Built with love for God's Word.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
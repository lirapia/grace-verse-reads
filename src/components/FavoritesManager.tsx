import { useState, useEffect } from 'react';
import { Heart, Trash2, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { FavoriteVerse } from '@/types/bible';
import { getFavorites, removeFromFavorites } from '@/lib/favorites';

export const FavoritesManager = () => {
  const [favorites, setFavorites] = useState<FavoriteVerse[]>([]);
  const [copiedVerse, setCopiedVerse] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    const savedFavorites = getFavorites();
    setFavorites(savedFavorites);
  };

  const handleRemove = (reference: string) => {
    if (removeFromFavorites(reference)) {
      setFavorites(prev => prev.filter(fav => fav.reference !== reference));
      toast({
        title: "Removed from favorites",
        description: reference
      });
    }
  };

  const copyVerse = async (favorite: FavoriteVerse) => {
    const textToCopy = `"${favorite.text}" — ${favorite.reference}`;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedVerse(favorite.reference);
      setTimeout(() => setCopiedVerse(null), 2000);
      toast({
        title: "Verse copied!",
        description: "Copied to clipboard"
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Please try again",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (favorites.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto text-center py-20">
        <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-6 opacity-50" />
        <h2 className="font-scripture text-2xl text-foreground mb-4">No Favorites Yet</h2>
        <p className="font-body text-muted-foreground text-lg leading-relaxed max-w-md mx-auto">
          Start reading scripture and click the heart icon next to verses you'd like to save for later.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <header className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Heart className="h-8 w-8 text-red-500 fill-current" />
          <h1 className="font-scripture text-3xl md:text-4xl text-foreground">
            My Favorite Verses
          </h1>
        </div>
        <p className="font-ui text-muted-foreground">
          {favorites.length} saved verse{favorites.length !== 1 ? 's' : ''}
        </p>
      </header>

      <div className="space-y-6">
        {favorites.map((favorite) => {
          const isCopied = copiedVerse === favorite.reference;
          
          return (
            <Card key={favorite.reference} className="card-gradient p-6 group hover:shadow-card transition-all duration-300">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="font-scripture text-xl text-primary mb-2">
                    {favorite.reference}
                  </h3>
                  <p className="scripture-text text-foreground text-lg leading-relaxed">
                    "{favorite.text}"
                  </p>
                </div>
                
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyVerse(favorite)}
                    className="h-9 w-9 p-0"
                  >
                    {isCopied ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemove(favorite.reference)}
                    className="h-9 w-9 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <div className="text-sm text-muted-foreground font-ui">
                  Saved on {formatDate(favorite.savedAt)}
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Heart className="h-3 w-3 fill-current text-red-500" />
                  <span className="font-ui">Favorite</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
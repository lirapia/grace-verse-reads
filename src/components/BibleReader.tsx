import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Book, Heart, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { BibleChapter, BibleVerse } from '@/types/bible';
import { fetchChapter, BIBLE_BOOKS } from '@/lib/bible-api';
import { addToFavorites, removeFromFavorites, isFavorite } from '@/lib/favorites';

export const BibleReader = () => {
  const [currentBook, setCurrentBook] = useState('john');
  const [currentChapter, setCurrentChapter] = useState(1);
  const [chapter, setChapter] = useState<BibleChapter | null>(null);
  const [loading, setLoading] = useState(false);
  const [favoriteStates, setFavoriteStates] = useState<Record<string, boolean>>({});
  const [copiedVerse, setCopiedVerse] = useState<string | null>(null);
  const { toast } = useToast();

  const currentBookData = BIBLE_BOOKS.find(book => book.book_id === currentBook);

  useEffect(() => {
    loadChapter(currentBook, currentChapter);
  }, [currentBook, currentChapter]);

  useEffect(() => {
    // Update favorite states when chapter changes
    if (chapter) {
      const states: Record<string, boolean> = {};
      chapter.verses.forEach(verse => {
        const reference = `${verse.book_name} ${verse.chapter}:${verse.verse}`;
        states[reference] = isFavorite(reference);
      });
      setFavoriteStates(states);
    }
  }, [chapter]);

  const loadChapter = async (book: string, chapterNum: number) => {
    setLoading(true);
    try {
      const chapterData = await fetchChapter(book, chapterNum);
      setChapter(chapterData);
    } catch (error) {
      toast({
        title: "Error loading chapter",
        description: "Please try again or select a different chapter.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBookChange = (bookId: string) => {
    setCurrentBook(bookId);
    setCurrentChapter(1);
  };

  const handleChapterChange = (chapterNum: string) => {
    setCurrentChapter(parseInt(chapterNum));
  };

  const navigateChapter = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentChapter > 1) {
      setCurrentChapter(currentChapter - 1);
    } else if (direction === 'next' && currentBookData && currentChapter < currentBookData.chapters) {
      setCurrentChapter(currentChapter + 1);
    }
  };

  const toggleFavorite = (verse: BibleVerse) => {
    const reference = `${verse.book_name} ${verse.chapter}:${verse.verse}`;
    const isCurrentlyFavorite = favoriteStates[reference];

    if (isCurrentlyFavorite) {
      if (removeFromFavorites(reference)) {
        setFavoriteStates(prev => ({ ...prev, [reference]: false }));
        toast({
          title: "Removed from favorites",
          description: reference
        });
      }
    } else {
      if (addToFavorites({
        reference,
        text: verse.text,
        book_name: verse.book_name,
        chapter: verse.chapter,
        verse: verse.verse
      })) {
        setFavoriteStates(prev => ({ ...prev, [reference]: true }));
        toast({
          title: "Added to favorites",
          description: reference
        });
      }
    }
  };

  const copyVerse = async (verse: BibleVerse) => {
    const reference = `${verse.book_name} ${verse.chapter}:${verse.verse}`;
    const textToCopy = `"${verse.text}" — ${reference}`;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedVerse(reference);
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

  const generateChapterOptions = () => {
    if (!currentBookData) return [];
    return Array.from({ length: currentBookData.chapters }, (_, i) => i + 1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-pulse-gentle">
          <Book className="h-12 w-12 text-primary mb-4 mx-auto" />
          <p className="font-ui text-lg text-muted-foreground">Loading scripture...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Navigation Controls */}
      <Card className="card-gradient p-6 mb-8">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-2">
            <Book className="h-5 w-5 text-primary" />
            <span className="font-ui font-medium text-foreground">Reading:</span>
          </div>
          
          <div className="flex items-center gap-3 flex-1">
            <Select value={currentBook} onValueChange={handleBookChange}>
              <SelectTrigger className="w-40 font-body">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {BIBLE_BOOKS.map(book => (
                  <SelectItem key={book.book_id} value={book.book_id} className="font-body">
                    {book.book_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <span className="text-muted-foreground">Chapter</span>

            <Select value={currentChapter.toString()} onValueChange={handleChapterChange}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {generateChapterOptions().map(chapter => (
                  <SelectItem key={chapter} value={chapter.toString()}>
                    {chapter}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateChapter('prev')}
              disabled={currentChapter <= 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateChapter('next')}
              disabled={!currentBookData || currentChapter >= currentBookData.chapters}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Chapter Content */}
      {chapter && (
        <Card className="card-gradient p-8">
          <header className="text-center mb-8">
            <h1 className="font-scripture text-3xl md:text-4xl text-foreground mb-2">
              {chapter.book_name} {chapter.chapter}
            </h1>
            <div className="w-24 h-0.5 bg-primary mx-auto rounded-full"></div>
          </header>

          <div className="scripture-text space-y-4 custom-scrollbar max-h-96 overflow-y-auto">
            {chapter.verses.map((verse) => {
              const reference = `${verse.book_name} ${verse.chapter}:${verse.verse}`;
              const isVerseInFavorites = favoriteStates[reference];
              const isCopied = copiedVerse === reference;

              return (
                <div
                  key={`${verse.chapter}-${verse.verse}`}
                  className="group flex items-start gap-4 p-4 rounded-lg hover:bg-secondary/30 transition-all duration-300"
                >
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-primary/10 text-primary font-ui font-semibold text-sm rounded-full flex-shrink-0 mt-1">
                    {verse.verse}
                  </span>
                  
                  <div className="flex-1">
                    <p className="text-foreground leading-relaxed text-lg">
                      {verse.text}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyVerse(verse)}
                      className="h-8 w-8 p-0"
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
                      onClick={() => toggleFavorite(verse)}
                      className={`h-8 w-8 p-0 ${isVerseInFavorites ? 'text-red-500' : 'text-muted-foreground'}`}
                    >
                      <Heart 
                        className={`h-4 w-4 ${isVerseInFavorites ? 'fill-current' : ''}`} 
                      />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
};
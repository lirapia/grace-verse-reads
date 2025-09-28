export interface BibleVerse {
  book_id: string;
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
}

export interface BibleChapter {
  book_id: string;
  book_name: string;
  chapter: number;
  verses: BibleVerse[];
}

export interface BibleBook {
  book_id: string;
  book_name: string;
  chapters: number;
}

export interface FavoriteVerse {
  reference: string;
  text: string;
  book_name: string;
  chapter: number;
  verse: number;
  savedAt: string;
}

export interface FeaturedVerse {
  reference: string;
  text: string;
  theme: 'salvation' | 'love' | 'grace' | 'mercy' | 'redemption';
}

// API Response types for bible-api.com
export interface BibleApiResponse {
  reference: string;
  verses: Array<{
    book_id: string;
    book_name: string;
    chapter: number;
    verse: number;
    text: string;
  }>;
  text: string;
  translation_id: string;
  translation_name: string;
  translation_note: string;
}
import { BibleApiResponse, BibleBook, BibleChapter, FeaturedVerse } from '@/types/bible';

const API_BASE = 'https://bible-api.com';

// Curated verses about salvation, God's love, grace, mercy, and redemption
export const FEATURED_VERSES: FeaturedVerse[] = [
  {
    reference: "John 6:29",
    text: "Jesus answered, 'The work of God is this: to believe in the one he has sent.'",
    theme: "salvation"
  },
  {
    reference: "John 3:16",
    text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    theme: "love"
  },
  {
    reference: "Romans 5:8",
    text: "But God demonstrates his own love for us in this: While we were still sinners, Christ died for us.",
    theme: "love"
  },
  {
    reference: "Ephesians 2:8-9",
    text: "For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God—not by works, so that no one can boast.",
    theme: "grace"
  },
  {
    reference: "1 John 4:9",
    text: "This is how God showed his love among us: He sent his one and only Son into the world that we might live through him.",
    theme: "love"
  },
  {
    reference: "Romans 8:1",
    text: "Therefore, there is now no condemnation for those who are in Christ Jesus.",
    theme: "redemption"
  },
  {
    reference: "Lamentations 3:22-23",
    text: "Because of the Lord's great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness.",
    theme: "mercy"
  },
  {
    reference: "John 14:6",
    text: "Jesus answered, 'I am the way and the truth and the life. No one comes to the Father except through me.'",
    theme: "salvation"
  },
  {
    reference: "Romans 10:9",
    text: "If you declare with your mouth, 'Jesus is Lord,' and believe in your heart that God raised him from the dead, you will be saved.",
    theme: "salvation"
  },
  {
    reference: "1 Peter 5:7",
    text: "Cast all your anxiety on him because he cares for you.",
    theme: "love"
  }
];

// Bible books in order
export const BIBLE_BOOKS: BibleBook[] = [
  // Old Testament
  { book_id: "genesis", book_name: "Genesis", chapters: 50 },
  { book_id: "exodus", book_name: "Exodus", chapters: 40 },
  { book_id: "leviticus", book_name: "Leviticus", chapters: 27 },
  { book_id: "numbers", book_name: "Numbers", chapters: 36 },
  { book_id: "deuteronomy", book_name: "Deuteronomy", chapters: 34 },
  { book_id: "joshua", book_name: "Joshua", chapters: 24 },
  { book_id: "judges", book_name: "Judges", chapters: 21 },
  { book_id: "ruth", book_name: "Ruth", chapters: 4 },
  { book_id: "1samuel", book_name: "1 Samuel", chapters: 31 },
  { book_id: "2samuel", book_name: "2 Samuel", chapters: 24 },
  { book_id: "1kings", book_name: "1 Kings", chapters: 22 },
  { book_id: "2kings", book_name: "2 Kings", chapters: 25 },
  { book_id: "1chronicles", book_name: "1 Chronicles", chapters: 29 },
  { book_id: "2chronicles", book_name: "2 Chronicles", chapters: 36 },
  { book_id: "ezra", book_name: "Ezra", chapters: 10 },
  { book_id: "nehemiah", book_name: "Nehemiah", chapters: 13 },
  { book_id: "esther", book_name: "Esther", chapters: 10 },
  { book_id: "job", book_name: "Job", chapters: 42 },
  { book_id: "psalms", book_name: "Psalms", chapters: 150 },
  { book_id: "proverbs", book_name: "Proverbs", chapters: 31 },
  { book_id: "ecclesiastes", book_name: "Ecclesiastes", chapters: 12 },
  { book_id: "song", book_name: "Song of Songs", chapters: 8 },
  { book_id: "isaiah", book_name: "Isaiah", chapters: 66 },
  { book_id: "jeremiah", book_name: "Jeremiah", chapters: 52 },
  { book_id: "lamentations", book_name: "Lamentations", chapters: 5 },
  { book_id: "ezekiel", book_name: "Ezekiel", chapters: 48 },
  { book_id: "daniel", book_name: "Daniel", chapters: 12 },
  { book_id: "hosea", book_name: "Hosea", chapters: 14 },
  { book_id: "joel", book_name: "Joel", chapters: 3 },
  { book_id: "amos", book_name: "Amos", chapters: 9 },
  { book_id: "obadiah", book_name: "Obadiah", chapters: 1 },
  { book_id: "jonah", book_name: "Jonah", chapters: 4 },
  { book_id: "micah", book_name: "Micah", chapters: 7 },
  { book_id: "nahum", book_name: "Nahum", chapters: 3 },
  { book_id: "habakkuk", book_name: "Habakkuk", chapters: 3 },
  { book_id: "zephaniah", book_name: "Zephaniah", chapters: 3 },
  { book_id: "haggai", book_name: "Haggai", chapters: 2 },
  { book_id: "zechariah", book_name: "Zechariah", chapters: 14 },
  { book_id: "malachi", book_name: "Malachi", chapters: 4 },
  
  // New Testament
  { book_id: "matthew", book_name: "Matthew", chapters: 28 },
  { book_id: "mark", book_name: "Mark", chapters: 16 },
  { book_id: "luke", book_name: "Luke", chapters: 24 },
  { book_id: "john", book_name: "John", chapters: 21 },
  { book_id: "acts", book_name: "Acts", chapters: 28 },
  { book_id: "romans", book_name: "Romans", chapters: 16 },
  { book_id: "1corinthians", book_name: "1 Corinthians", chapters: 16 },
  { book_id: "2corinthians", book_name: "2 Corinthians", chapters: 13 },
  { book_id: "galatians", book_name: "Galatians", chapters: 6 },
  { book_id: "ephesians", book_name: "Ephesians", chapters: 6 },
  { book_id: "philippians", book_name: "Philippians", chapters: 4 },
  { book_id: "colossians", book_name: "Colossians", chapters: 4 },
  { book_id: "1thessalonians", book_name: "1 Thessalonians", chapters: 5 },
  { book_id: "2thessalonians", book_name: "2 Thessalonians", chapters: 3 },
  { book_id: "1timothy", book_name: "1 Timothy", chapters: 6 },
  { book_id: "2timothy", book_name: "2 Timothy", chapters: 4 },
  { book_id: "titus", book_name: "Titus", chapters: 3 },
  { book_id: "philemon", book_name: "Philemon", chapters: 1 },
  { book_id: "hebrews", book_name: "Hebrews", chapters: 13 },
  { book_id: "james", book_name: "James", chapters: 5 },
  { book_id: "1peter", book_name: "1 Peter", chapters: 5 },
  { book_id: "2peter", book_name: "2 Peter", chapters: 3 },
  { book_id: "1john", book_name: "1 John", chapters: 5 },
  { book_id: "2john", book_name: "2 John", chapters: 1 },
  { book_id: "3john", book_name: "3 John", chapters: 1 },
  { book_id: "jude", book_name: "Jude", chapters: 1 },
  { book_id: "revelation", book_name: "Revelation", chapters: 22 }
];

// Get current featured verse (rotates every 3 hours)
export const getCurrentFeaturedVerse = (): FeaturedVerse => {
  const now = new Date();
  const hoursIndex = Math.floor(now.getTime() / (3 * 60 * 60 * 1000)) % FEATURED_VERSES.length;
  return FEATURED_VERSES[hoursIndex];
};

// Fetch chapter content from Bible API
export const fetchChapter = async (book: string, chapter: number): Promise<BibleChapter | null> => {
  try {
    const response = await fetch(`${API_BASE}/${book}${chapter}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: BibleApiResponse = await response.json();
    
    return {
      book_id: data.verses[0]?.book_id || book,
      book_name: data.verses[0]?.book_name || book,
      chapter: chapter,
      verses: data.verses
    };
  } catch (error) {
    console.error(`Error fetching ${book} ${chapter}:`, error);
    return null;
  }
};

// Search verses by keyword
export const searchVerses = async (query: string): Promise<BibleApiResponse | null> => {
  try {
    // Bible API doesn't have search, so we'll search specific books
    // For now, return a placeholder - in a real app you'd use a different API
    const response = await fetch(`${API_BASE}/${query}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: BibleApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error(`Error searching for "${query}":`, error);
    return null;
  }
};
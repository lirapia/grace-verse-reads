import { useState, useEffect } from 'react';
import { getCurrentFeaturedVerse } from '@/lib/bible-api';
import { FeaturedVerse as FeaturedVerseType } from '@/types/bible';

export const FeaturedVerse = () => {
  const [currentVerse, setCurrentVerse] = useState<FeaturedVerseType>(getCurrentFeaturedVerse());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fade in animation
    setIsVisible(true);
    
    // Update verse every 3 hours
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentVerse(getCurrentFeaturedVerse());
        setIsVisible(true);
      }, 500);
    }, 3 * 60 * 60 * 1000); // 3 hours

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-gradient-featured shadow-featured rounded-xl p-8 md:p-12 mb-8">
      <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <h2 className="font-ui text-sm uppercase tracking-wider text-white/80 mb-4">
          Featured Verse
        </h2>
        
        <blockquote className="featured-verse-text text-2xl md:text-3xl lg:text-4xl text-white leading-relaxed mb-6 max-w-4xl mx-auto">
          "{currentVerse.text}"
        </blockquote>
        
        <cite className="font-ui text-lg md:text-xl text-white/90 font-medium">
          — {currentVerse.reference}
        </cite>
        
        <div className="mt-6 inline-flex items-center justify-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
          <span className="font-ui text-sm text-white/80 capitalize">
            Theme: {currentVerse.theme}
          </span>
        </div>
      </div>
    </section>
  );
};
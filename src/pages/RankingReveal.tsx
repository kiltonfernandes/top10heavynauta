import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StarryBackground } from "@/components/StarryBackground";
import { useNavigate } from "react-router-dom";
import { RankedAlbum } from "@/types/album";
import { Trophy, Star, ThumbsUp, Award } from "lucide-react";

interface Quote {
  text: string;
  author: string;
  song: string;
  album: string;
  band: string;
  year: number;
}

const QUOTES: Quote[] = [
  { text: "Just like the Pied Piper, led rats through the streets, we dance like marionettes, swaying to the symphony of destruction", author: "Dave Mustaine", song: "Symphony of Destruction", album: "Countdown to Extinction", band: "Megadeth", year: 1992 },
  { text: "So close, no matter how far", author: "James Hetfield", song: "Nothing Else Matters", album: "Metallica (Black Album)", band: "Metallica", year: 1991 },
  { text: "Fear of the dark, I have a constant fear that something's always near", author: "Bruce Dickinson", song: "Fear of the Dark", album: "Fear of the Dark", band: "Iron Maiden", year: 1992 },
  { text: "Painkiller! This is the Painkiller!", author: "Rob Halford", song: "Painkiller", album: "Painkiller", band: "Judas Priest", year: 1990 },
  { text: "The evil that men do lives on and on", author: "Bruce Dickinson", song: "The Evil That Men Do", album: "Seventh Son of a Seventh Son", band: "Iron Maiden", year: 1988 },
  { text: "Iron Man lives again!", author: "Ozzy Osbourne", song: "Iron Man", album: "Paranoid", band: "Black Sabbath", year: 1970 },
  { text: "Master of puppets, I'm pulling your strings", author: "James Hetfield", song: "Master of Puppets", album: "Master of Puppets", band: "Metallica", year: 1986 },
  { text: "You know it's true, everything I do, I do it for you", author: "Klaus Meine", song: "Still Loving You", album: "Love at First Sting", band: "Scorpions", year: 1984 },
  { text: "Forever trust in who we are, and nothing else matters", author: "James Hetfield", song: "Nothing Else Matters", album: "Metallica (Black Album)", band: "Metallica", year: 1991 },
  { text: "Maybe one day I'll be an honest man; up 'till now I'm doing the best I can...", author: "Bruce Dickinson", song: "Wasting Love", album: "Fear of the Dark", band: "Iron Maiden", year: 1992 },
  { text: "In trance, I'm lost, in the memories of you", author: "Klaus Meine", song: "In Trance", album: "In Trance", band: "Scorpions", year: 1975 },
  { text: "Carry on, there's a meaning to life which someday we may find", author: "Andre Matos", song: "Carry On", album: "Angels Cry", band: "Angra", year: 1993 },
  { text: "Future world, you're looking good to me!", author: "Michael Kiske", song: "Future World", album: "Keeper of the Seven Keys: Part I", band: "Helloween", year: 1987 },
  { text: "Ride the sky, like an eagle fly so high!", author: "Kai Hansen", song: "Ride the Sky", album: "Walls of Jericho", band: "Helloween", year: 1985 },
  { text: "Drifting in circles, lost in a maze", author: "Timo Kotipelto", song: "Black Diamond", album: "Visions", band: "Stratovarius", year: 1997 },
  { text: "Bury me in smoke", author: "Phil Anselmo", song: "Bury Me In Smoke", album: "NOLA", band: "Down", year: 1995 },
  { text: "I'm the king of all kings, I'm the master of none", author: "Tobias Sammet", song: "King of Fools", album: "Hellfire Club", band: "Edguy", year: 2004 },
  { text: "Twilight of the gods, darkness will descend", author: "Michael Kiske", song: "Twilight of the Gods", album: "Keeper of the Seven Keys: Part I", band: "Helloween", year: 1987 },
  { text: "In the land of ice and snow, the midnight sun will glow", author: "Marco Hietala", song: "Wish I Had an Angel", album: "Once", band: "Nightwish", year: 2004 },
  { text: "Destiny is calling, fate will decide", author: "Timo Kotipelto", song: "Destiny", album: "Destiny", band: "Stratovarius", year: 1998 },
  { text: "So take a look at yourself and tell me what you see", author: "Kai Hansen", song: "Eagle Fly Free", album: "Keeper of the Seven Keys: Part II", band: "Helloween", year: 1988 },
  { text: "How can I live, if I can't see the light?", author: "Roy Khan", song: "The Haunting", album: "The Black Halo", band: "Kamelot", year: 2005 },
  { text: "We are the hammer of the gods, we are thunder, wind and rain!", author: "Joakim Brodén", song: "Primo Victoria", album: "Primo Victoria", band: "Sabaton", year: 2005 },
  { text: "I'm alive, I'm alive in this world", author: "Michael Kiske", song: "I'm Alive", album: "Keeper of the Seven Keys: Part I", band: "Helloween", year: 1987 },
  { text: "I walk to my own song, I'm my own man", author: "Timo Kotipelto", song: "I Walk to My Own Song", album: "Elements Part 1", band: "Stratovarius", year: 2003 },
  { text: "In the shadows, I'm dancing alone", author: "Tony Kakko", song: "FullMoon", album: "Ecliptica", band: "Sonata Arctica", year: 1999 },
  { text: "The mirror will show who you are and reveal your deepest scars", author: "Michele Luppi", song: "Through Your Eyes", album: "The Art of Survival", band: "Vision Divine", year: 2004 },
  { text: "Rise and fall, now I'm standing tall", author: "Tobias Sammet", song: "Tears of a Mandrake", album: "Mandrake", band: "Edguy", year: 2001 },
  { text: "Don't try to live your life in one day", author: "Bruce Dickinson", song: "A Little Time", album: "Keeper of the Seven Keys: Part I", band: "Helloween", year: 1987 },
  { text: "Paradise is denied for those who fear the truth inside", author: "Timo Kotipelto", song: "Paradise", album: "Episode", band: "Stratovarius", year: 1996 },
  { text: "The silence makes me feel alive", author: "Tony Kakko", song: "Letter to Dana", album: "Ecliptica", band: "Sonata Arctica", year: 1999 },
  { text: "Fly away to the rainbow in the sky", author: "Ralf Scheepers", song: "Rainbow in the Dark", album: "Primal Fear", band: "Primal Fear", year: 1998 },
  { text: "Is this the end of everything we know?", author: "Fabio Lione", song: "Holy Thunderforce", album: "Dawn of Victory", band: "Rhapsody", year: 2000 },
  { text: "Wild child, you're so cruel", author: "Doro Pesch", song: "Wild Child", album: "Triumph and Agony", band: "Warlock", year: 1987 },
  { text: "We are the keepers of the seven keys", author: "Andi Deris", song: "Keeper of the Seven Keys", album: "Keeper of the Seven Keys: Part II", band: "Helloween", year: 1988 },
  { text: "The flames grow higher, consuming me", author: "Mark Jansen", song: "Consign to Oblivion", album: "Consign to Oblivion", band: "Epica", year: 2005 },
  { text: "Face the sunrise, never look back", author: "Timo Kotipelto", song: "Hunting High and Low", album: "Infinite", band: "Stratovarius", year: 2000 },
  { text: "Take me to the edge of infinity", author: "Tarja Turunen", song: "Wishmaster", album: "Wishmaster", band: "Nightwish", year: 2000 },
  { text: "Our hearts beat strong, for the glory we belong", author: "Joakim Brodén", song: "Ghost Division", album: "The Art of War", band: "Sabaton", year: 2008 },
  { text: "Through struggle we grow, in silence we know", author: "Simone Simons", song: "Cry for the Moon", album: "The Phantom Agony", band: "Epica", year: 2003 },
  { text: "In this masquerade, who is wearing the mask?", author: "Fabio Lione", song: "Power of the Dragonflame", album: "Power of the Dragonflame", band: "Rhapsody", year: 2002 },
  { text: "I am the law, and you're under my command", author: "Geoff Tate", song: "Revolution Calling", album: "Operation: Mindcrime", band: "Queensrÿche", year: 1988 },
  { text: "Sleep tight, my little angel", author: "Jukka Nevalainen", song: "Sleeping Sun", album: "Oceanborn", band: "Nightwish", year: 1998 },
  { text: "Through the fire and the flames we carry on", author: "Herman Li", song: "Through the Fire and Flames", album: "Inhuman Rampage", band: "DragonForce", year: 2006 },
  { text: "I am the one who will be king, bring me the dawn of magic", author: "Andre Matos", song: "Time", album: "Angels Cry", band: "Angra", year: 1993 },
  { text: "Mother Gaia, bring us peace", author: "Timo Kotipelto", song: "Mother Gaia", album: "Infinite", band: "Stratovarius", year: 2000 },
  { text: "Only the good die young", author: "Michael Kiske", song: "Only the Good Die Young", album: "Keeper of the Seven Keys: Part II", band: "Helloween", year: 1988 },
  { text: "Raise your banners high, never surrender!", author: "Fabio Lione", song: "Emerald Sword", album: "Symphony of Enchanted Lands", band: "Rhapsody", year: 1998 },
  { text: "I'm the real hero, but nobody knows my name", author: "Tobias Sammet", song: "Nobody's Hero", album: "Age of the Joker", band: "Edguy", year: 2011 },
  { text: "Reaching for the stars, tonight we fly", author: "Tony Kakko", song: "Victoria's Secret", album: "Winterheart's Guild", band: "Sonata Arctica", year: 2003 },
  { text: "Caught in a web, we're tangled up and lost", author: "James LaBrie", song: "Caught in a Web", album: "Awake", band: "Dream Theater", year: 1994 }
];

// Algorithm to create balanced batches for honorable mentions
const createBatches = (items: RankedAlbum[]): RankedAlbum[][] => {
  if (items.length === 0) return [];
  if (items.length <= 4) return [items]; // Single batch for small numbers
  
  // Calculate ideal batch size (target 3-5 items per batch)
  const idealBatchSize = items.length <= 10 ? 3 : 
                         items.length <= 20 ? 4 : 
                         items.length <= 50 ? 5 : 6;
  
  const numBatches = Math.ceil(items.length / idealBatchSize);
  const baseSize = Math.floor(items.length / numBatches);
  const remainder = items.length % numBatches;
  
  const batches: RankedAlbum[][] = [];
  let currentIndex = 0;
  
  for (let i = 0; i < numBatches; i++) {
    // Distribute remainder across first batches
    const batchSize = baseSize + (i < remainder ? 1 : 0);
    batches.push(items.slice(currentIndex, currentIndex + batchSize));
    currentIndex += batchSize;
  }
  
  return batches;
};

type Phase = 'honorable-intro' | 'honorable-batch' | 'top10-quote' | 'top10-album';

const RankingReveal = () => {
  const navigate = useNavigate();
  const [allAlbums, setAllAlbums] = useState<RankedAlbum[]>([]);
  const [top10Albums, setTop10Albums] = useState<RankedAlbum[]>([]);
  const [honorableMentions, setHonorableMentions] = useState<RankedAlbum[]>([]);
  const [honorableBatches, setHonorableBatches] = useState<RankedAlbum[][]>([]);
  
  const [phase, setPhase] = useState<Phase>('honorable-intro');
  const [honorableBatchIndex, setHonorableBatchIndex] = useState(0);
  const [top10Index, setTop10Index] = useState(0);
  
  const [showComments, setShowComments] = useState(false);
  const [currentQuote, setCurrentQuote] = useState<Quote>(QUOTES[0]);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const saved = localStorage.getItem("rankedAlbums");
    if (saved) {
      const allAlbumsData: RankedAlbum[] = JSON.parse(saved);
      setAllAlbums(allAlbumsData);
      
      // Split into top 10 and honorable mentions
      const top10 = allAlbumsData.slice(0, 10);
      const mentions = allAlbumsData.slice(10);
      
      setTop10Albums(top10);
      setHonorableMentions(mentions);
      
      // Create batches for honorable mentions (reverse order - worst first)
      const batches = createBatches([...mentions].reverse());
      setHonorableBatches(batches);
      
      // Determine starting phase
      if (mentions.length > 0) {
        setPhase('honorable-intro');
      } else {
        setPhase('top10-quote');
        const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
        setCurrentQuote(randomQuote);
      }
    } else {
      navigate("/ranking");
    }
  }, [navigate]);

  // Countdown timer for top10-quote phase
  useEffect(() => {
    if (phase === 'top10-quote' && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (phase === 'top10-quote' && countdown === 0) {
      setTimeout(() => {
        setPhase('top10-album');
      }, 1000);
    }
  }, [phase, countdown]);

  const handleStartHonorableMentions = () => {
    setPhase('honorable-batch');
  };

  const handleNextHonorableBatch = () => {
    if (honorableBatchIndex < honorableBatches.length - 1) {
      setHonorableBatchIndex(honorableBatchIndex + 1);
    } else {
      // Move to top 10
      setPhase('top10-quote');
      setCountdown(10);
      const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
      setCurrentQuote(randomQuote);
    }
  };

  const handleNextTop10 = () => {
    if (top10Index < top10Albums.length - 1) {
      setShowComments(false);
      setPhase('top10-quote');
      setCountdown(10);
      const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
      setCurrentQuote(randomQuote);
      setTop10Index(top10Index + 1);
    }
  };

  const handleFinish = () => {
    navigate("/statistics", { state: { rankedAlbums: allAlbums } });
  };

  // Render honorable mentions intro screen
  if (phase === 'honorable-intro' && honorableMentions.length > 0) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-4">
        <StarryBackground />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <Award className="w-24 h-24 mx-auto text-amber-500 animate-float" />
          
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-flame bg-clip-text text-transparent">
            Menções Honrosas
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Antes de revelarmos o Top 10, vamos reconhecer os álbuns que também merecem destaque!
          </p>
          
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-2 border-amber-500/30">
            <p className="text-2xl font-bold text-foreground mb-2">
              {honorableMentions.length} álbuns
            </p>
            <p className="text-muted-foreground">
              Serão apresentados em {honorableBatches.length} grupo{honorableBatches.length > 1 ? 's' : ''}
            </p>
          </Card>
          
          <Button 
            onClick={handleStartHonorableMentions}
            className="bg-gradient-flame text-xl py-6 px-12"
          >
            Começar
          </Button>
        </div>
      </div>
    );
  }

  // Render honorable mentions batch
  if (phase === 'honorable-batch' && honorableBatches.length > 0) {
    const currentBatch = honorableBatches[honorableBatchIndex];
    const isLastBatch = honorableBatchIndex === honorableBatches.length - 1;
    
    return (
      <div className="min-h-screen bg-background relative overflow-hidden">
        <StarryBackground />
        
        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Award className="w-12 h-12 text-amber-500" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-flame bg-clip-text text-transparent mb-2">
                Menções Honrosas
              </h1>
              <p className="text-muted-foreground">
                Grupo {honorableBatchIndex + 1} de {honorableBatches.length}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {currentBatch.map((album, index) => {
                // Calculate the actual position (reverse from mentions array)
                const mentionIndex = honorableBatches
                  .slice(0, honorableBatchIndex)
                  .reduce((acc, batch) => acc + batch.length, 0) + index;
                const actualPosition = allAlbums.length - mentionIndex;
                
                return (
                  <Card 
                    key={`${album.band}-${album.album}`}
                    className="p-6 bg-card/50 backdrop-blur-sm border-2 border-amber-500/30 animate-scale-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="text-center mb-4">
                      <span className="text-sm text-amber-500 font-bold">#{actualPosition}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-1 text-center">
                      {album.band}
                    </h3>
                    <p className="text-muted-foreground text-center mb-4">
                      {album.album}
                    </p>
                    
                    <div className="grid grid-cols-3 gap-2 text-center text-sm">
                      <div className="p-2 bg-muted/30 rounded">
                        <ThumbsUp className="w-4 h-4 mx-auto mb-1 text-secondary" />
                        <span>{album.averageLike}</span>
                      </div>
                      <div className="p-2 bg-muted/30 rounded">
                        <Star className="w-4 h-4 mx-auto mb-1 text-accent" />
                        <span>{album.averageOriginality}</span>
                      </div>
                      <div className="p-2 bg-primary/20 rounded">
                        <span className="text-xs text-muted-foreground">Final</span>
                        <p className="font-bold">{album.finalScore}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="flex justify-center pt-6">
              <Button 
                onClick={handleNextHonorableBatch}
                className={isLastBatch ? "bg-gradient-cosmic text-xl py-6 px-12" : "bg-gradient-flame text-xl py-6 px-12"}
              >
                {isLastBatch ? "Ir para o Top 10" : "Próximo Grupo"}
              </Button>
            </div>
            
            <div className="text-center text-sm text-muted-foreground">
              {honorableBatchIndex + 1} de {honorableBatches.length} grupos
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render quote screen before top 10 album
  if (phase === 'top10-quote') {
    const position = top10Albums.length - top10Index;
    
    return (
      <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-4">
        <StarryBackground />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <div className="mb-12">
            <div className="text-8xl md:text-9xl font-bold bg-gradient-cosmic bg-clip-text text-transparent animate-pulse">
              {countdown}
            </div>
          </div>

          <Card className="p-8 md:p-12 bg-card/80 backdrop-blur-sm border-2 border-primary/30 animate-scale-in">
            <blockquote className="space-y-6">
              <p className="text-xl md:text-2xl italic text-foreground leading-relaxed">
                "{currentQuote.text}"
              </p>
              
              <div className="border-t border-border/50 pt-6 space-y-2">
                <p className="text-lg md:text-xl font-bold text-primary">
                  - {currentQuote.author}
                </p>
                <p className="text-sm md:text-base text-muted-foreground">
                  {currentQuote.song}, {currentQuote.album}, {currentQuote.band} {currentQuote.year}
                </p>
              </div>
            </blockquote>
          </Card>

          <p className="text-xl text-muted-foreground">
            Próximo disco: #{position}
          </p>
        </div>
      </div>
    );
  }

  // Render top 10 album
  const currentAlbum = top10Albums[top10Index];
  if (!currentAlbum) return null;
  
  const position = top10Albums.length - top10Index;
  const isLast = top10Index === top10Albums.length - 1;

  const getTrophyColor = () => {
    if (position === 1) return "text-yellow-400";
    if (position === 2) return "text-gray-300";
    if (position === 3) return "text-amber-600";
    return "text-muted-foreground";
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <StarryBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Trophy className={`w-16 h-16 ${getTrophyColor()} animate-float`} />
            </div>
            <h1 className="text-6xl font-bold bg-gradient-cosmic bg-clip-text text-transparent mb-2">
              #{position}
            </h1>
            <p className="text-muted-foreground">
              de {top10Albums.length} álbuns no Top 10
            </p>
          </div>

          <Card className="p-8 bg-card/50 backdrop-blur-sm border-2 border-primary/30 animate-slideUp">
            <div className="text-center mb-6">
              <h2 className="text-4xl font-bold mb-2">{currentAlbum.band}</h2>
              <p className="text-2xl text-muted-foreground">{currentAlbum.album}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <ThumbsUp className="w-5 h-5 text-secondary" />
                  <span className="text-sm text-muted-foreground">Gostei</span>
                </div>
                <p className="text-3xl font-bold">{currentAlbum.averageLike}</p>
              </div>

              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-accent" />
                  <span className="text-sm text-muted-foreground">Original</span>
                </div>
                <p className="text-3xl font-bold">{currentAlbum.averageOriginality}</p>
              </div>

              <div className="text-center p-4 bg-gradient-cosmic rounded-lg">
                <div className="mb-2">
                  <span className="text-sm text-primary-foreground">Nota Final</span>
                </div>
                <p className="text-3xl font-bold text-primary-foreground">{currentAlbum.finalScore}</p>
              </div>
            </div>

            <Button
              onClick={() => setShowComments(!showComments)}
              variant="outline"
              className="w-full mb-4"
            >
              {showComments ? "Esconder" : "Ver"} Comentários
            </Button>

            {showComments && (
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {currentAlbum.comments.map((comment, index) => (
                  <Card key={index} className="p-4 bg-muted/30">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-bold">{comment.user}</p>
                      <div className="text-sm text-muted-foreground">
                        {comment.likeScore}/{comment.originalityScore}
                      </div>
                    </div>
                    <p className="text-sm text-foreground/80">{comment.comment}</p>
                  </Card>
                ))}
              </div>
            )}
          </Card>

          <div className="flex gap-4">
            {!isLast ? (
              <Button 
                onClick={handleNextTop10}
                className="w-full bg-gradient-cosmic text-xl py-6"
              >
                Próximo Álbum
              </Button>
            ) : (
              <Button 
                onClick={handleFinish}
                className="w-full bg-gradient-flame text-xl py-6"
              >
                Ver Estatísticas
              </Button>
            )}
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Revelado: {top10Index + 1} de {top10Albums.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingReveal;

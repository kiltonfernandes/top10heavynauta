import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StarryBackground } from "@/components/StarryBackground";
import { useNavigate } from "react-router-dom";
import { RankedAlbum } from "@/types/album";
import { Trophy, Star, ThumbsUp } from "lucide-react";

const RankingReveal = () => {
  const navigate = useNavigate();
  const [rankedAlbums, setRankedAlbums] = useState<RankedAlbum[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [showAnticipation, setShowAnticipation] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("rankedAlbums");
    if (saved) {
      setRankedAlbums(JSON.parse(saved));
    } else {
      navigate("/ranking");
    }
  }, [navigate]);

  const currentAlbum = rankedAlbums[currentIndex];
  const position = rankedAlbums.length - currentIndex;
  const isLast = currentIndex === rankedAlbums.length - 1;

  const handleNext = () => {
    if (currentIndex < rankedAlbums.length - 1) {
      setShowAnticipation(true);
      setShowComments(false);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setShowAnticipation(false);
      }, 3000);
    }
  };

  const handleReveal = () => {
    setShowAnticipation(false);
  };

  const handleFinish = () => {
    localStorage.removeItem("rankedAlbums");
    navigate("/choice");
  };

  if (!currentAlbum) {
    return null;
  }

  const getTrophyColor = () => {
    if (position === 1) return "text-yellow-400";
    if (position === 2) return "text-gray-300";
    if (position === 3) return "text-amber-600";
    return "text-muted-foreground";
  };

  if (showAnticipation && currentIndex > 0) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
        <StarryBackground />
        
        <div className="relative z-10 text-center space-y-8 animate-pulse">
          <div className="flex justify-center">
            <Trophy className="w-32 h-32 text-primary animate-float" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
            Revelando...
          </h1>
          <p className="text-2xl text-muted-foreground">
            Próximo disco: #{position}
          </p>
          <Button
            onClick={handleReveal}
            className="bg-gradient-cosmic text-xl px-8 py-6 animate-scale-in"
          >
            Revelar Agora
          </Button>
        </div>
      </div>
    );
  }

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
              de {rankedAlbums.length} álbuns
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
                onClick={handleNext}
                className="w-full bg-gradient-cosmic text-xl py-6"
              >
                Próximo Álbum
              </Button>
            ) : (
              <Button 
                onClick={handleFinish}
                className="w-full bg-gradient-flame text-xl py-6"
              >
                Finalizar
              </Button>
            )}
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Revelado: {currentIndex + 1} de {rankedAlbums.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingReveal;

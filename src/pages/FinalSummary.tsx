import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StarryBackground } from "@/components/StarryBackground";
import { useNavigate, useLocation } from "react-router-dom";
import { RankedAlbum } from "@/types/album";
import { Trophy, Award, Crown, Medal, Star, ThumbsUp, BarChart3 } from "lucide-react";

const FinalSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [allAlbums, setAllAlbums] = useState<RankedAlbum[]>([]);
  const [top10, setTop10] = useState<RankedAlbum[]>([]);
  const [honorableMentions, setHonorableMentions] = useState<RankedAlbum[]>([]);

  useEffect(() => {
    const stateAlbums = location.state?.rankedAlbums;
    if (stateAlbums) {
      setAllAlbums(stateAlbums);
      setTop10(stateAlbums.slice(0, 10).reverse()); // Best first
      setHonorableMentions(stateAlbums.slice(10));
    } else {
      const saved = localStorage.getItem("rankedAlbums");
      if (saved) {
        const albums = JSON.parse(saved);
        setAllAlbums(albums);
        setTop10(albums.slice(0, 10).reverse());
        setHonorableMentions(albums.slice(10));
      }
    }
  }, [location.state]);

  const getMedalIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-300" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{position}</span>;
    }
  };

  const getPositionStyle = (position: number) => {
    switch (position) {
      case 1:
        return "bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-500/50 shadow-lg shadow-yellow-500/20";
      case 2:
        return "bg-gradient-to-r from-gray-300/20 to-slate-400/20 border-gray-300/50";
      case 3:
        return "bg-gradient-to-r from-amber-600/20 to-orange-600/20 border-amber-600/50";
      default:
        return "bg-card/50 border-border/50";
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <StarryBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-4 animate-fade-in">
            <div className="flex items-center justify-center gap-4">
              <Trophy className="w-16 h-16 text-yellow-500 animate-float" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-flame bg-clip-text text-transparent">
              Resumo Final
            </h1>
            <p className="text-xl text-muted-foreground">
              {allAlbums.length} álbuns avaliados
            </p>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <Card className="p-4 bg-card/50 backdrop-blur-sm border-secondary/30 text-center">
              <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <p className="text-2xl font-bold text-foreground">{top10.length}</p>
              <p className="text-sm text-muted-foreground">Top 10</p>
            </Card>
            <Card className="p-4 bg-card/50 backdrop-blur-sm border-amber-500/30 text-center">
              <Award className="w-8 h-8 mx-auto mb-2 text-amber-500" />
              <p className="text-2xl font-bold text-foreground">{honorableMentions.length}</p>
              <p className="text-sm text-muted-foreground">Menções Honrosas</p>
            </Card>
            <Card className="p-4 bg-card/50 backdrop-blur-sm border-secondary/30 text-center">
              <ThumbsUp className="w-8 h-8 mx-auto mb-2 text-secondary" />
              <p className="text-2xl font-bold text-foreground">
                {top10[0]?.averageLike || 0}
              </p>
              <p className="text-sm text-muted-foreground">Maior Nota Gostei</p>
            </Card>
            <Card className="p-4 bg-card/50 backdrop-blur-sm border-accent/30 text-center">
              <Star className="w-8 h-8 mx-auto mb-2 text-accent" />
              <p className="text-2xl font-bold text-foreground">
                {top10[0]?.averageOriginality || 0}
              </p>
              <p className="text-sm text-muted-foreground">Maior Originalidade</p>
            </Card>
          </div>

          {/* Top 10 Section */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <h2 className="text-3xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
                Top 10
              </h2>
            </div>
            
            <div className="space-y-3">
              {top10.map((album, index) => {
                const position = index + 1;
                return (
                  <Card 
                    key={`${album.band}-${album.album}`}
                    className={`p-4 backdrop-blur-sm border-2 transition-all hover:scale-[1.02] ${getPositionStyle(position)}`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-background/50">
                        {getMedalIcon(position)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-foreground truncate">
                          {album.band}
                        </h3>
                        <p className="text-muted-foreground truncate">
                          {album.album}
                        </p>
                      </div>
                      
                      <div className="hidden sm:flex items-center gap-4 text-sm">
                        <div className="text-center px-3 py-1 bg-muted/30 rounded">
                          <ThumbsUp className="w-4 h-4 mx-auto mb-1 text-secondary" />
                          <span>{album.averageLike}</span>
                        </div>
                        <div className="text-center px-3 py-1 bg-muted/30 rounded">
                          <Star className="w-4 h-4 mx-auto mb-1 text-accent" />
                          <span>{album.averageOriginality}</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Final</p>
                        <p className={`text-xl font-bold ${position <= 3 ? 'text-yellow-500' : 'text-foreground'}`}>
                          {album.finalScore}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Honorable Mentions Section */}
          {honorableMentions.length > 0 && (
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-amber-500" />
                <h2 className="text-3xl font-bold bg-gradient-flame bg-clip-text text-transparent">
                  Menções Honrosas
                </h2>
                <span className="text-muted-foreground">({honorableMentions.length})</span>
              </div>
              
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {honorableMentions.map((album, index) => {
                  const position = 11 + index;
                  return (
                    <Card 
                      key={`${album.band}-${album.album}`}
                      className="p-4 bg-card/30 backdrop-blur-sm border border-amber-500/20 hover:border-amber-500/40 transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-sm font-bold text-amber-500/70">#{position}</span>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-foreground truncate text-sm">
                            {album.band}
                          </h4>
                          <p className="text-xs text-muted-foreground truncate">
                            {album.album}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-foreground">{album.finalScore}</p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button 
              onClick={() => navigate("/statistics", { state: { rankedAlbums: allAlbums } })}
              className="bg-gradient-cosmic text-lg py-6 px-8"
            >
              <BarChart3 className="w-5 h-5 mr-2" />
              Ver Estatísticas Detalhadas
            </Button>
            <Button 
              onClick={() => navigate("/")}
              variant="outline"
              className="text-lg py-6 px-8"
            >
              Voltar ao Início
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FinalSummary;

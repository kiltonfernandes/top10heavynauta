import { useLocation, useNavigate } from "react-router-dom";
import { RankedAlbum } from "@/types/album";
import { StarryBackground } from "@/components/StarryBackground";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { Trophy, Star, ThumbsUp, TrendingUp, Home } from "lucide-react";

const Statistics = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const rankedAlbums = location.state?.rankedAlbums as RankedAlbum[] | undefined;

  if (!rankedAlbums || rankedAlbums.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <StarryBackground />
        <Card className="p-8 text-center relative z-10">
          <h2 className="text-2xl font-bold mb-4">Sem dados disponíveis</h2>
          <Button onClick={() => navigate("/")}>
            Voltar ao Início
          </Button>
        </Card>
      </div>
    );
  }

  // Top 5 mais amados
  const topLoved = [...rankedAlbums]
    .sort((a, b) => b.averageLike - a.averageLike)
    .slice(0, 5);

  // Top 5 mais originais
  const topOriginal = [...rankedAlbums]
    .sort((a, b) => b.averageOriginality - a.averageOriginality)
    .slice(0, 5);

  // Dados para gráfico de barras comparativo (Top 10)
  const top10Data = rankedAlbums.slice(0, 10).map((album, index) => ({
    position: `#${index + 1}`,
    name: `${album.band} - ${album.album}`,
    gostei: album.averageLike,
    originalidade: album.averageOriginality,
    final: album.finalScore,
  }));

  // Dados para gráfico de radar (Top 5)
  const radarData = rankedAlbums.slice(0, 5).map((album, index) => ({
    album: `#${index + 1} ${album.band}`,
    gostei: album.averageLike,
    originalidade: album.averageOriginality,
    final: album.finalScore,
  }));

  const chartConfig = {
    gostei: {
      label: "Quanto Gostei",
      color: "hsl(var(--secondary))",
    },
    originalidade: {
      label: "Originalidade",
      color: "hsl(var(--accent))",
    },
    final: {
      label: "Nota Final",
      color: "hsl(var(--primary))",
    },
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <StarryBackground />
      
      <div className="max-w-7xl mx-auto relative z-10 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
            📊 Estatísticas Finais
          </h1>
          <p className="text-xl text-muted-foreground">
            Análise completa dos {rankedAlbums.length} álbuns avaliados
          </p>
        </div>

        {/* Top Rankings */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Top 5 Mais Amados */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <ThumbsUp className="w-8 h-8 text-secondary" />
              <h2 className="text-2xl font-bold">Top 5 Mais Amados</h2>
            </div>
            <div className="space-y-4">
              {topLoved.map((album, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-all"
                >
                  <div className="text-3xl font-bold text-secondary w-12 text-center">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold">{album.band}</p>
                    <p className="text-sm text-muted-foreground">{album.album}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-secondary">
                      {album.averageLike}
                    </p>
                    <p className="text-xs text-muted-foreground">pontos</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Top 5 Mais Originais */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Star className="w-8 h-8 text-accent" />
              <h2 className="text-2xl font-bold">Top 5 Mais Originais</h2>
            </div>
            <div className="space-y-4">
              {topOriginal.map((album, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-all"
                >
                  <div className="text-3xl font-bold text-accent w-12 text-center">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold">{album.band}</p>
                    <p className="text-sm text-muted-foreground">{album.album}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-accent">
                      {album.averageOriginality}
                    </p>
                    <p className="text-xs text-muted-foreground">pontos</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Gráfico de Barras Comparativo */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-8 h-8 text-primary" />
            <h2 className="text-2xl font-bold">Comparativo Top 10</h2>
          </div>
          <ChartContainer config={chartConfig} className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={top10Data}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="position" 
                  stroke="hsl(var(--foreground))"
                  tick={{ fill: 'hsl(var(--foreground))' }}
                />
                <YAxis 
                  stroke="hsl(var(--foreground))"
                  tick={{ fill: 'hsl(var(--foreground))' }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend 
                  wrapperStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Bar dataKey="gostei" fill="hsl(var(--secondary))" name="Quanto Gostei" />
                <Bar dataKey="originalidade" fill="hsl(var(--accent))" name="Originalidade" />
                <Bar dataKey="final" fill="hsl(var(--primary))" name="Nota Final" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Card>

        {/* Gráfico Radar */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="w-8 h-8 text-primary" />
            <h2 className="text-2xl font-bold">Perfil Top 5 - Radar</h2>
          </div>
          <ChartContainer config={chartConfig} className="h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis 
                  dataKey="album" 
                  stroke="hsl(var(--foreground))"
                  tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                />
                <PolarRadiusAxis 
                  stroke="hsl(var(--foreground))"
                  tick={{ fill: 'hsl(var(--foreground))' }}
                />
                <Radar 
                  name="Quanto Gostei" 
                  dataKey="gostei" 
                  stroke="hsl(var(--secondary))" 
                  fill="hsl(var(--secondary))" 
                  fillOpacity={0.6} 
                />
                <Radar 
                  name="Originalidade" 
                  dataKey="originalidade" 
                  stroke="hsl(var(--accent))" 
                  fill="hsl(var(--accent))" 
                  fillOpacity={0.6} 
                />
                <Radar 
                  name="Nota Final" 
                  dataKey="final" 
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary))" 
                  fillOpacity={0.6} 
                />
                <Legend wrapperStyle={{ color: 'hsl(var(--foreground))' }} />
              </RadarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Card>

        {/* Estatísticas Gerais */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="p-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">Total de Álbuns</p>
            <p className="text-4xl font-bold text-primary">{rankedAlbums.length}</p>
          </Card>
          <Card className="p-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">Média Gostei</p>
            <p className="text-4xl font-bold text-secondary">
              {(rankedAlbums.reduce((acc, album) => acc + album.averageLike, 0) / rankedAlbums.length).toFixed(2)}
            </p>
          </Card>
          <Card className="p-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">Média Original</p>
            <p className="text-4xl font-bold text-accent">
              {(rankedAlbums.reduce((acc, album) => acc + album.averageOriginality, 0) / rankedAlbums.length).toFixed(2)}
            </p>
          </Card>
          <Card className="p-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">Média Final</p>
            <p className="text-4xl font-bold text-primary">
              {(rankedAlbums.reduce((acc, album) => acc + album.finalScore, 0) / rankedAlbums.length).toFixed(2)}
            </p>
          </Card>
        </div>

        {/* Botões de Navegação */}
        <div className="flex gap-4 justify-center">
          <Button 
            onClick={() => navigate("/")}
            variant="outline"
            size="lg"
            className="gap-2"
          >
            <Home className="w-5 h-5" />
            Voltar ao Início
          </Button>
          <Button 
            onClick={() => navigate("/ranking/reveal", { state: { rankedAlbums } })}
            variant="outline"
            size="lg"
          >
            Ver Ranking Novamente
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Statistics;

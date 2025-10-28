import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StarryBackground } from "@/components/StarryBackground";
import { useNavigate } from "react-router-dom";
import { Music, Trophy } from "lucide-react";

const Choice = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <StarryBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-12 bg-gradient-cosmic bg-clip-text text-transparent">
          O que você quer fazer?
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
          <Card 
            className="p-8 bg-card/50 backdrop-blur-sm border-2 border-primary/30 hover:border-primary cursor-pointer transition-all duration-300 hover:shadow-glow group"
            onClick={() => navigate("/insert")}
          >
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-24 h-24 rounded-full bg-gradient-cosmic flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Music className="w-12 h-12 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold">Inserir Álbuns</h2>
              <p className="text-muted-foreground">
                Avalie álbuns com notas de originalidade e qualidade, 
                compartilhe seus comentários
              </p>
            </div>
          </Card>

          <Card 
            className="p-8 bg-card/50 backdrop-blur-sm border-2 border-secondary/30 hover:border-secondary cursor-pointer transition-all duration-300 hover:shadow-glow-blue group"
            onClick={() => navigate("/ranking")}
          >
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Trophy className="w-12 h-12 text-secondary-foreground" />
              </div>
              <h2 className="text-2xl font-bold">Montar Ranking</h2>
              <p className="text-muted-foreground">
                Faça upload dos arquivos CSV e descubra o ranking 
                final com revelação emocionante
              </p>
            </div>
          </Card>
        </div>

        <Button 
          onClick={() => navigate("/")}
          variant="outline"
          className="mt-12"
        >
          Voltar
        </Button>
      </div>
    </div>
  );
};

export default Choice;

import { Button } from "@/components/ui/button";
import { StarryBackground } from "@/components/StarryBackground";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.jpg";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <StarryBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen">
        <div className="animate-float mb-8">
          <img 
            src={logo} 
            alt="Heavynauta Logo" 
            className="w-64 h-64 object-contain drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]"
          />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-center mb-6 bg-gradient-cosmic bg-clip-text text-transparent">
          Escala Heavynauta
        </h1>
        
        <div className="max-w-2xl text-center space-y-4 mb-12">
          <p className="text-xl text-foreground/90">
            Bem-vindo ao ranking definitivo de álbuns de heavy metal!
          </p>
          <p className="text-muted-foreground">
            Avalie seus álbuns favoritos com notas de originalidade e qualidade, 
            compartilhe suas opiniões e descubra o ranking coletivo através de uma 
            revelação emocionante, disco por disco.
          </p>
        </div>

        <Button 
          onClick={() => navigate("/choice")}
          size="lg"
          className="bg-gradient-cosmic text-primary-foreground font-bold text-xl px-12 py-6 rounded-full hover:shadow-glow transition-all duration-300 hover:scale-105"
        >
          Começar
        </Button>
      </div>
    </div>
  );
};

export default Landing;

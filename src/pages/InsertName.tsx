import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { StarryBackground } from "@/components/StarryBackground";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";

const InsertName = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleContinue = () => {
    if (name.trim()) {
      localStorage.setItem("userName", name.trim());
      navigate("/insert/album");
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <StarryBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen">
        <Card className="w-full max-w-md p-8 bg-card/50 backdrop-blur-sm border-2 border-primary/30 animate-slideUp">
          <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-cosmic bg-clip-text text-transparent">
            Qual é o seu nome?
          </h1>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Seu nome</Label>
              <Input
                id="name"
                type="text"
                placeholder="Digite seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleContinue()}
                className="bg-input border-border text-lg"
              />
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={() => navigate("/choice")}
                variant="outline"
                className="flex-1"
              >
                Voltar
              </Button>
              <Button 
                onClick={handleContinue}
                disabled={!name.trim()}
                className="flex-1 bg-gradient-cosmic"
              >
                Seguir
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default InsertName;

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StarryBackground } from "@/components/StarryBackground";
import { useNavigate } from "react-router-dom";
import { Album } from "@/types/album";
import { Star } from "lucide-react";
import { toast } from "sonner";

const InsertAlbum = () => {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [currentAlbum, setCurrentAlbum] = useState({
    band: "",
    album: "",
    likeScore: 0,
    originalityScore: 0,
    comment: "",
  });

  useEffect(() => {
    const savedAlbums = localStorage.getItem("albums");
    if (savedAlbums) {
      setAlbums(JSON.parse(savedAlbums));
    }

    const userName = localStorage.getItem("userName");
    if (!userName) {
      navigate("/insert");
    }
  }, [navigate]);

  const wordCount = currentAlbum.comment.trim().split(/\s+/).filter(Boolean).length;
  const isFormValid = 
    currentAlbum.band.trim() &&
    currentAlbum.album.trim() &&
    currentAlbum.likeScore > 0 &&
    currentAlbum.originalityScore > 0 &&
    wordCount >= 50;

  const canFinish = albums.length >= 2;

  const handleAddAlbum = () => {
    if (isFormValid) {
      const newAlbum: Album = {
        id: Date.now().toString(),
        ...currentAlbum,
      };
      const updatedAlbums = [...albums, newAlbum];
      setAlbums(updatedAlbums);
      localStorage.setItem("albums", JSON.stringify(updatedAlbums));
      
      setCurrentAlbum({
        band: "",
        album: "",
        likeScore: 0,
        originalityScore: 0,
        comment: "",
      });
      
      toast.success("Álbum adicionado com sucesso!");
    }
  };

  const handleFinish = () => {
    if (canFinish) {
      navigate("/insert/confirm");
    }
  };

  const likeEmojis = ["", "😑", "🙂", "😌", "😃", "🤩"];
  const likeDescriptions = [
    "Pouco gostei: Achei mediano ou desinteressante; não ouviria novamente.",
    "Gostei um pouco: Tem alguns momentos bons, mas deixa a desejar no geral.",
    "Gosto médio: Bom disco, escutaria ocasionalmente, mas não marcou.",
    "Gostei bastante: Disco muito bom, escutei várias vezes e recomendo.",
    "Amei: Um dos melhores do ano, marcante, entrou para minha lista pessoal."
  ];
  
  const originalityEmojis = ["", "💤", "💿", "✨", "🤔", "🧬"];
  const originalityDescriptions = [
    "Nada original: Genérico, segue totalmente padrões do gênero, sem inovação.",
    "Pouco original: Tem pequenos diferenciais, mas é majoritariamente convencional.",
    "Originalidade média: Algumas faixas ou características se destacam; traz algo novo, mas não revoluciona.",
    "Bastante original: Apresenta ideias ou misturas incomuns, surpreende pela criatividade.",
    "Muito original: Um disco único, impossível de confundir; inovador e fora da curva."
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <StarryBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto space-y-6">
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-2 border-primary/30">
            <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-cosmic bg-clip-text text-transparent">
              Avalie um Álbum
            </h1>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="band">Banda</Label>
                <Input
                  id="band"
                  value={currentAlbum.band}
                  onChange={(e) => setCurrentAlbum({ ...currentAlbum, band: e.target.value })}
                  placeholder="Nome da banda"
                  className="bg-input"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="album">Álbum</Label>
                <Input
                  id="album"
                  value={currentAlbum.album}
                  onChange={(e) => setCurrentAlbum({ ...currentAlbum, album: e.target.value })}
                  placeholder="Nome do álbum"
                  className="bg-input"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="like">Quanto você gostou?</Label>
                <Select
                  value={currentAlbum.likeScore.toString()}
                  onValueChange={(value) => setCurrentAlbum({ ...currentAlbum, likeScore: parseInt(value) })}
                >
                  <SelectTrigger className="bg-input">
                    <SelectValue placeholder="Selecione uma nota" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {[1, 2, 3, 4, 5].map((score) => (
                      <SelectItem key={score} value={score.toString()}>
                        {score} {likeEmojis[score]} - {likeDescriptions[score - 1]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="originality">Quanto esse disco é original?</Label>
                <Select
                  value={currentAlbum.originalityScore.toString()}
                  onValueChange={(value) => setCurrentAlbum({ ...currentAlbum, originalityScore: parseInt(value) })}
                >
                  <SelectTrigger className="bg-input">
                    <SelectValue placeholder="Selecione uma nota" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {[1, 2, 3, 4, 5].map((score) => (
                      <SelectItem key={score} value={score.toString()}>
                        {score} {originalityEmojis[score]} - {originalityDescriptions[score - 1]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comment">
                  Comentário sobre o disco 
                  <span className={`ml-2 text-sm ${wordCount >= 50 ? "text-secondary" : "text-muted-foreground"}`}>
                    ({wordCount}/50 palavras)
                  </span>
                </Label>
                <Textarea
                  id="comment"
                  value={currentAlbum.comment}
                  onChange={(e) => setCurrentAlbum({ ...currentAlbum, comment: e.target.value })}
                  placeholder="Escreva seu comentário (mínimo 50 palavras)"
                  className="bg-input min-h-32"
                />
              </div>

              <Button 
                onClick={handleAddAlbum}
                disabled={!isFormValid}
                className="w-full bg-gradient-cosmic"
              >
                Seguir
              </Button>
            </div>
          </Card>

          {albums.length > 0 && (
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-2 border-secondary/30">
              <h2 className="text-xl font-bold mb-4">Álbuns avaliados: {albums.length}</h2>
              <div className="space-y-2 mb-4">
                {albums.map((album) => (
                  <div key={album.id} className="text-sm text-muted-foreground">
                    • {album.band} - {album.album}
                  </div>
                ))}
              </div>
              <Button 
                onClick={handleFinish}
                disabled={!canFinish}
                variant="outline"
                className="w-full"
              >
                Terminar {!canFinish && "(mínimo 2 álbuns)"}
              </Button>
            </Card>
          )}

          <Button 
            onClick={() => navigate("/choice")}
            variant="outline"
          >
            Voltar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InsertAlbum;

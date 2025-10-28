import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StarryBackground } from "@/components/StarryBackground";
import { useNavigate } from "react-router-dom";
import { Album } from "@/types/album";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Download } from "lucide-react";
import { toast } from "sonner";

const ConfirmAlbums = () => {
  const navigate = useNavigate();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [userName, setUserName] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const savedAlbums = localStorage.getItem("albums");
    const savedUserName = localStorage.getItem("userName");
    
    if (savedAlbums) {
      setAlbums(JSON.parse(savedAlbums));
    }
    
    if (savedUserName) {
      setUserName(savedUserName);
    }

    if (!savedAlbums || !savedUserName) {
      navigate("/insert");
    }
  }, [navigate]);

  const generateCSV = () => {
    const header = "Nome do usuário;Banda;Álbum;Gostei (1-5);Originalidade (1-5);Comentário\n";
    const rows = albums.map(album => 
      `${userName};${album.band};${album.album};${album.likeScore};${album.originalityScore};${album.comment}`
    ).join("\n");
    
    const csv = header + rows;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", `heavynauta_${userName.replace(/\s+/g, "_")}_${Date.now()}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("CSV baixado com sucesso!");
    
    // Clear data
    localStorage.removeItem("albums");
    localStorage.removeItem("userName");
    
    setTimeout(() => {
      navigate("/choice");
    }, 2000);
  };

  const handleStartOver = () => {
    localStorage.removeItem("albums");
    localStorage.removeItem("userName");
    navigate("/insert");
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <StarryBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-2 border-primary/30">
            <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-cosmic bg-clip-text text-transparent">
              Confirme suas avaliações
            </h1>
            
            <div className="space-y-6 mb-8">
              {albums.map((album, index) => (
                <Card key={album.id} className="p-6 bg-muted/30">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{album.band}</h3>
                      <p className="text-muted-foreground">{album.album}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Gostei: {album.likeScore}/5</div>
                      <div className="text-sm text-muted-foreground">Original: {album.originalityScore}/5</div>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/80">{album.comment}</p>
                </Card>
              ))}
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={handleStartOver}
                variant="outline"
                className="flex-1"
              >
                Começar de novo
              </Button>
              <Button 
                onClick={() => setShowModal(true)}
                className="flex-1 bg-gradient-cosmic"
              >
                <Download className="w-4 h-4 mr-2" />
                Enviar
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle>Confirmar envio?</DialogTitle>
            <DialogDescription>
              Suas avaliações serão salvas em um arquivo CSV que será baixado automaticamente.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-4 mt-4">
            <Button 
              onClick={() => setShowModal(false)}
              variant="outline"
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button 
              onClick={generateCSV}
              className="flex-1 bg-gradient-cosmic"
            >
              Confirmar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConfirmAlbums;

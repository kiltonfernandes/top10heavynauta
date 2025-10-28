import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StarryBackground } from "@/components/StarryBackground";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";
import { RankedAlbum } from "@/types/album";

const RankingUpload = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const csvFiles = newFiles.filter(file => file.name.endsWith(".csv"));
      
      if (csvFiles.length !== newFiles.length) {
        toast.error("Apenas arquivos CSV são permitidos");
      }
      
      if (files.length + csvFiles.length > 10) {
        toast.error("Máximo de 10 arquivos permitidos");
        return;
      }
      
      setFiles([...files, ...csvFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const parseCSV = async (file: File): Promise<any[]> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const lines = text.split("\n").slice(1); // Skip header
        const data = lines
          .filter(line => line.trim())
          .map(line => {
            const [userName, band, album, likeScore, originalityScore, comment] = line.split(";");
            return {
              userName: userName?.trim(),
              band: band?.trim(),
              album: album?.trim(),
              likeScore: parseInt(likeScore) || 0,
              originalityScore: parseInt(originalityScore) || 0,
              comment: comment?.trim(),
            };
          });
        resolve(data);
      };
      reader.readAsText(file);
    });
  };

  const handleProcessRanking = async () => {
    if (files.length === 0) {
      toast.error("Adicione pelo menos um arquivo CSV");
      return;
    }

    try {
      const allData: any[] = [];
      
      for (const file of files) {
        const data = await parseCSV(file);
        allData.push(...data);
      }

      // Group by band and album
      const grouped = allData.reduce((acc: any, curr) => {
        const key = `${curr.band}|||${curr.album}`;
        if (!acc[key]) {
          acc[key] = {
            band: curr.band,
            album: curr.album,
            scores: [],
            comments: [],
          };
        }
        acc[key].scores.push({
          like: curr.likeScore,
          originality: curr.originalityScore,
        });
        acc[key].comments.push({
          user: curr.userName,
          comment: curr.comment,
          likeScore: curr.likeScore,
          originalityScore: curr.originalityScore,
        });
        return acc;
      }, {});

      // Calculate averages and final scores
      const rankedAlbums: RankedAlbum[] = Object.values(grouped).map((item: any) => {
        const avgLike = item.scores.reduce((sum: number, s: any) => sum + s.like, 0) / item.scores.length;
        const avgOriginality = item.scores.reduce((sum: number, s: any) => sum + s.originality, 0) / item.scores.length;
        const finalScore = (avgLike + avgOriginality) / 2;

        return {
          band: item.band,
          album: item.album,
          averageLike: Math.round(avgLike * 10) / 10,
          averageOriginality: Math.round(avgOriginality * 10) / 10,
          finalScore: Math.round(finalScore * 10) / 10,
          comments: item.comments,
        };
      });

      // Sort by final score (ascending for reveal from worst to best)
      rankedAlbums.sort((a, b) => a.finalScore - b.finalScore);

      // Store in localStorage
      localStorage.setItem("rankedAlbums", JSON.stringify(rankedAlbums));
      
      toast.success("Ranking processado com sucesso!");
      navigate("/ranking/reveal");
    } catch (error) {
      toast.error("Erro ao processar os arquivos");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <StarryBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-2 border-secondary/30">
            <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              Montar Ranking
            </h1>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="csv-files">Upload de arquivos CSV (máximo 10)</Label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="csv-files"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer bg-muted/20 hover:bg-muted/40 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Clique para selecionar arquivos
                      </p>
                    </div>
                    <Input
                      id="csv-files"
                      type="file"
                      accept=".csv"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {files.length > 0 && (
                <div className="space-y-2">
                  <Label>Arquivos selecionados ({files.length}/10)</Label>
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                      >
                        <span className="text-sm truncate flex-1">{file.name}</span>
                        <Button
                          onClick={() => removeFile(index)}
                          variant="ghost"
                          size="sm"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <Button 
                  onClick={() => navigate("/choice")}
                  variant="outline"
                  className="flex-1"
                >
                  Voltar
                </Button>
                <Button 
                  onClick={handleProcessRanking}
                  disabled={files.length === 0}
                  className="flex-1 bg-gradient-to-r from-secondary to-accent"
                >
                  Processar Ranking
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RankingUpload;

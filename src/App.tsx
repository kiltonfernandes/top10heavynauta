import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Choice from "./pages/Choice";
import InsertName from "./pages/InsertName";
import InsertAlbum from "./pages/InsertAlbum";
import ConfirmAlbums from "./pages/ConfirmAlbums";
import RankingUpload from "./pages/RankingUpload";
import RankingReveal from "./pages/RankingReveal";
import Statistics from "./pages/Statistics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/choice" element={<Choice />} />
          <Route path="/insert" element={<InsertName />} />
          <Route path="/insert/album" element={<InsertAlbum />} />
          <Route path="/insert/confirm" element={<ConfirmAlbums />} />
          <Route path="/ranking" element={<RankingUpload />} />
          <Route path="/ranking/reveal" element={<RankingReveal />} />
          <Route path="/statistics" element={<Statistics />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

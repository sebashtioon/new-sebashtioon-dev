import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoadingProvider } from "@/contexts/LoadingContext";
import LoadingOverlay from "@/components/LoadingOverlay";
import Home from "./pages/Home";
import Music from "./pages/Music";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LoadingProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <LoadingOverlay />
        <BrowserRouter>
          <div className="dark min-h-screen">
            <Routes>
              <Route path="/" element={<Home />} />
                <Route path="/music" element={<Music />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </LoadingProvider>
  </QueryClientProvider>
);

export default App;

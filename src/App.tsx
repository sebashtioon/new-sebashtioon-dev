import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoadingProvider } from "@/contexts/LoadingContext";
import LoadingOverlay from "@/components/LoadingOverlay";
import BackgroundGrid from "@/components/BackgroundGrid";
import Home from "./pages/Home";
import Music from "./pages/Music";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import CantWakeUp from "./pages/projects/CantWakeUp";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import ScrollToTop from "@/components/ScrollToTop";
import { ThemeProvider } from "@/contexts/ThemeContext";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const EXCLUDE_TAGS = new Set(["STYLE", "SCRIPT", "CODE", "PRE", "TEXTAREA", "INPUT", "NOSCRIPT", "SVG"]);

    const replaceInTextNode = (node: Node) => {
      if (node.nodeType !== Node.TEXT_NODE) return;
      const parent = node.parentElement;
      if (!parent) return;
      if (EXCLUDE_TAGS.has(parent.tagName)) return;
      // If this text node is inside an element that requests preserving apostrophes, skip it
      if (parent.closest('[data-preserve-apostrophes]')) return;
      const text = node.textContent;
      if (!text) return;
      const cleaned = text.replace(/['\u2018\u2019]/g, "");
      if (cleaned !== text) node.textContent = cleaned;
    };

    const walk = (root: Node) => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
      let n: Node | null = walker.nextNode();
      while (n) {
        replaceInTextNode(n);
        n = walker.nextNode();
      }
    };

    // initial pass
    walk(document.body);

    // observe for dynamically added content
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "characterData" && m.target) {
          replaceInTextNode(m.target as Node);
        }
        if (m.addedNodes && m.addedNodes.length) {
          m.addedNodes.forEach((n) => walk(n));
        }
      }
    });

    mo.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => mo.disconnect();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LoadingProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <LoadingOverlay />
            <BrowserRouter>
              <ScrollToTop />
              <div className="min-h-screen">
                <BackgroundGrid />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/music" element={<Music />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/cant-wake-up" element={<CantWakeUp />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </LoadingProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;

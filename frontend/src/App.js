import { useState, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RGYChatsPage } from "@/pages/RGYChatsPage";
import { Toaster } from "@/components/ui/sonner";

function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Add dark class to html element for dark theme
    document.documentElement.classList.add('dark');
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RGYChatsPage />} />
          <Route path="/rgy-chats" element={<RGYChatsPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;

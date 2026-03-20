// src/App.tsx
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { EmpireProvider } from "@/contexts/EmpireContext";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Chat from "./pages/Chat";
import Timeline from "./pages/Timeline";
import MapPage from "./pages/MapPage";
import Quiz from "./pages/Quiz";
import Profiles from "./pages/Profiles";
import ProfileDetail from "./pages/ProfileDetail";
import Lineage from "./pages/Lineage";
import StoryMode from "./pages/StoryMode";
import EmpireSelect from "./pages/EmpireSelect";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";

import { ProtectedRoute } from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => {
  const { isAdmin } = useAuth();
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <EmpireProvider>
            <div className="flex">
              {/* Sidomeny */}
              <nav className="flex flex-col gap-2 p-4 bg-gray-100 h-screen w-48">
                <button onClick={() => window.location.href = "/"}>Home</button>
                <button onClick={() => window.location.href = "/settings"}>Inställningar</button>

                {/* Admin-knapp endast för admins */}
                {isAdmin && (
                  <button
                    className="bg-red-600 text-white px-3 py-2 rounded mt-2"
                    onClick={() => setShowAdminPanel(!showAdminPanel)}
                  >
                    Admin Panel
                  </button>
                )}
              </nav>

              {/* Huvudinnehåll */}
              <main className="flex-1 p-4">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/select-empire" element={<ProtectedRoute skipEmpireCheck><EmpireSelect /></ProtectedRoute>} />
                  <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
                  <Route path="/timeline" element={<ProtectedRoute><Timeline /></ProtectedRoute>} />
                  <Route path="/map" element={<ProtectedRoute><MapPage /></ProtectedRoute>} />
                  <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
                  <Route path="/profiles" element={<ProtectedRoute><Profiles /></ProtectedRoute>} />
                  <Route path="/profiles/:id" element={<ProtectedRoute><ProfileDetail /></ProtectedRoute>} />
                  <Route path="/lineage" element={<ProtectedRoute><Lineage /></ProtectedRoute>} />
                  <Route path="/story" element={<ProtectedRoute><StoryMode /></ProtectedRoute>} />
                  <Route path="/settings" element={<ProtectedRoute skipEmpireCheck><Settings /></ProtectedRoute>} />

                  {/* Admin route som fallback om du vill */}
                  <Route path="/admin" element={<ProtectedRoute skipEmpireCheck><Admin /></ProtectedRoute>} />

                  <Route path="*" element={<NotFound />} />
                </Routes>

                {/* Inline adminpanel */}
                {showAdminPanel && isAdmin && (
                  <div className="mt-4 p-4 border rounded shadow-lg bg-white">
                    <button
                      className="text-sm text-gray-500 underline mb-2"
                      onClick={() => setShowAdminPanel(false)}
                    >
                      Stäng Admin Panel
                    </button>
                    <Admin />
                  </div>
                )}
              </main>
            </div>
          </EmpireProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

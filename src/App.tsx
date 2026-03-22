import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EmpireProvider } from "@/contexts/EmpireContext";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Onboarding from "./Onboarding";
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
import Notifications from "./pages/Notifications";
import { ProtectedRoute } from "./components/ProtectedRoute";
 
const queryClient = new QueryClient();
 
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <EmpireProvider>
            <Onboarding />
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
              <Route path="/admin" element={<ProtectedRoute skipEmpireCheck><Admin /></ProtectedRoute>} />
              <Route path="/notifications" element={<ProtectedRoute skipEmpireCheck><Notifications /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </EmpireProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};
 
export default App;

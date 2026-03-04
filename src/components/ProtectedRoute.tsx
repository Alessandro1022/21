import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useEmpire } from "@/contexts/EmpireContext";
import { Loader2 } from "lucide-react";

export function ProtectedRoute({ children, skipEmpireCheck }: { children: React.ReactNode; skipEmpireCheck?: boolean }) {
  const { user, loading } = useAuth();
  const { empireId } = useEmpire();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/auth" replace />;
  if (!skipEmpireCheck && !empireId) return <Navigate to="/select-empire" replace />;
  return <>{children}</>;
}

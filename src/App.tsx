import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { MainLayout } from "@/components/layout/MainLayout";
import { AuthPage } from "./pages/Auth";
import { Dashboard } from "./pages/Dashboard";
import { ClientsPage } from "./pages/Clients";
import { ServicesPage } from "./pages/Services";
import { ServiceDetailsPage } from "./pages/ServiceDetails";
import { UserManagementPage } from "./pages/UserManagement";
import { ServiceWizardPage } from "./pages/ServiceWizard";
import { NotaryPage } from "./pages/NotaryPage";
import { SyariahPage } from "./pages/SyariahPage";
import { PPATPage } from "./pages/PPATPage";
import NotFound from "./pages/NotFound";
import Keuangan from "./pages/Keuangan";
import { Loader2 } from "lucide-react";
import WorksheetEdit from "./pages/WorksheetEdit";
import WorksheetDetail from "./pages/WorksheetDetail";
import FileManager from "./pages/FileManager";

const queryClient = new QueryClient();

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/notaris" element={<NotaryPage />} />
        <Route path="/services/syariah" element={<SyariahPage />} />
        <Route path="/services/ppat" element={<PPATPage />} />
        <Route path="/keuangan" element={<Keuangan />} />
        <Route path="/file-manager" element={<FileManager />} />
        <Route path="/audit-log" element={<div className="p-8">Audit Log - Coming Soon</div>} />
        <Route path="/audit-trail" element={<div className="p-8">Audit Trail - Coming Soon</div>} />
        <Route path="/settings" element={<div className="p-8">Pengaturan - Coming Soon</div>} />
        <Route path="/services/:id" element={<ServiceDetailsPage />} />
        <Route path="/services/new" element={<ServiceWizardPage />} />
        <Route path="/users" element={<UserManagementPage />} />
        <Route path="/worksheet/edit/:id" element={<WorksheetEdit />} />
        <Route path="/worksheet/:id" element={<WorksheetDetail />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

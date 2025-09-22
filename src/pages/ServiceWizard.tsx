import { Header } from '@/components/layout/Header';
import { ServiceCreationWizard } from '@/components/service/ServiceCreationWizard';
import { useNavigate } from 'react-router-dom';

export function ServiceWizardPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <ServiceCreationWizard
          onSuccess={() => {
            navigate('/services');
          }}
          onCancel={() => {
            navigate('/services');
          }}
        />
      </main>
    </div>
  );
}
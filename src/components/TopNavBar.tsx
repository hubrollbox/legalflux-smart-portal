import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/useAuth';

interface TopNavBarProps {
  blurPlaceholder: string;
}

const TopNavBar = ({ blurPlaceholder }: TopNavBarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading, role } = useAuth();
  const userAddons: string[] = []; // placeholder: sem extras

  const publicNavItems = [
    { to: '/contato', label: 'Contacto' },
    { to: '/recursos', label: 'Recursos' },
    // Removido: { to: '/integracoes', label: 'Integrações' }, // Não deve aparecer no menu superior
    { to: '/seguranca', label: 'Segurança' },
    { to: '/sobre', label: 'Sobre' },
  ];

  // Não mostrar "Prazos"
  const privateNavItemsAll = [
    // { to: '/prazos', label: 'Prazos', addon: false },
    { to: '/agenda', label: 'Agenda', addon: 'calendario' },
    // Removido: { to: '/minhas-integracoes', label: 'Integrações', addon: false },
    { to: '/insolvencias', label: 'Insolvências', addon: 'insolvencia' }
    // ... outras rotas possíveis
  ];

  const privateNavItems = privateNavItemsAll.filter(
    item =>
      !item.addon
      || (typeof item.addon === 'string' && userAddons.includes(item.addon))
  );

  const userIsAuthenticated = !!user && !loading;

  return (
    <>
      <nav className="hidden md:flex items-center space-x-8">
        <button
          type="button"
          className="text-gray-800 hover:text-primary-600 transition-colors font-medium bg-transparent border-0 cursor-pointer"
          onClick={() => {
            if (window.location.pathname !== '/') {
              window.location.href = '/#planos';
            } else {
              const el = document.getElementById('planos');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          Planos
        </button>
        {publicNavItems.map(item => (
          <Link
            key={item.to}
            to={item.to}
            className="text-gray-800 hover:text-primary-600 transition-colors font-medium"
          >
            {item.label}
          </Link>
        ))}
        {userIsAuthenticated && privateNavItems.map(item => (
          <Link
            key={item.to}
            to={item.to}
            className="text-gray-800 hover:text-primary-600 transition-colors font-medium"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      {/* Botões lado direito */}
      <div className="hidden md:flex items-center space-x-4">
        {!userIsAuthenticated && (
          <>
            <Button variant="ghost" className="text-primary-600 hover:bg-primary-100" asChild>
              <Link to="/login">Entrar</Link>
            </Button>
            <Button className="bg-primary-600 hover:bg-primary-500 text-white px-6" asChild>
              <Link to="/register">Começar Gratuitamente</Link>
            </Button>
          </>
        )}
        {userIsAuthenticated && (
          <>
            <Button variant="ghost" asChild className="text-primary-600 hover:bg-primary-100">
              <Link to="/dashboard">Painel</Link>
            </Button>
            <Button variant="ghost" asChild className="text-primary-600 hover:bg-primary-100">
              <Link to="/definicoes">Conta</Link>
            </Button>
            <Button variant="ghost" className="text-primary-600 hover:bg-primary-100 p-2">
              <span className="sr-only">Notificações</span>
              <svg width="24" height="24" fill="none" stroke="currentColor" className="h-5 w-5"><use href="#bell" /></svg>
            </Button>
          </>
        )}
      </div>
      {/* Botão menu mobile */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-primary-600"
        >
          {isMenuOpen
            ? <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            : <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          }
        </Button>
      </div>
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden py-4 border-t border-gray-200 bg-white animate-fade-in">
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => {
                setIsMenuOpen(false);
                if (window.location.pathname !== '/') {
                  window.location.href = '/#planos';
                } else {
                  const el = document.getElementById('planos');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-gray-800 hover:text-primary-600 transition-colors font-medium px-2 py-1 text-left"
            >
              Planos
            </button>
            {publicNavItems.map(item => (
              <Link
                key={item.to}
                to={item.to}
                className="text-gray-800 hover:text-primary-600 transition-colors font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {userIsAuthenticated && privateNavItems.map(item => (
              <Link
                key={item.to}
                to={item.to}
                className="text-gray-800 hover:text-primary-600 transition-colors font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
              {!userIsAuthenticated && (
                <>
                  <Button variant="ghost" className="text-primary-600 hover:bg-primary-100 justify-start" asChild>
                    <Link to="/login">Entrar</Link>
                  </Button>
                  <Button className="bg-primary-600 hover:bg-primary-500 text-white" asChild>
                    <Link to="/register">Começar Gratuitamente</Link>
                  </Button>
                </>
              )}
              {userIsAuthenticated && (
                <>
                  <Button variant="ghost" className="text-primary-600 hover:bg-primary-100 justify-start" asChild>
                    <Link to="/dashboard">Painel</Link>
                  </Button>
                  <Button variant="ghost" className="text-primary-600 hover:bg-primary-100 justify-start" asChild>
                    <Link to="/definicoes">Conta</Link>
                  </Button>
                  {/* Notificações só para autenticados */}
                  <Button variant="ghost" className="text-primary-600 hover:bg-primary-100 justify-start p-2">
                    <span className="sr-only">Notificações</span>
                    <svg width="24" height="24" fill="none" stroke="currentColor" className="h-5 w-5"><use href="#bell" /></svg>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopNavBar;

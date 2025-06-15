import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { generateBlurPlaceholder } from '@/lib/imageUtils';
import { useAuth } from '@/contexts/useAuth';

const blurPlaceholder = generateBlurPlaceholder(100, 40);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useScrollToTop();
  const { user, loading, role } = useAuth();

  // Obtém add-ons – neste exemplo, não há field "addons" no user, então previne erro TS.
  // Pode expandir a lógica mais tarde se guardar add-ons noutro sítio.
  const userAddons: string[] = []; // placeholder: sem extras, nenhum add-on

  // -- Mantém a definição destes arrays --
  const publicNavItems = [
    { to: '/contato', label: 'Contacto' },
    { to: '/recursos', label: 'Recursos' },
    { to: '/seguranca', label: 'Segurança' },
    { to: '/sobre', label: 'Sobre' },
  ];

  // Removido o item "Prazos" deste array
  const privateNavItemsAll = [
    // { to: '/prazos', label: 'Prazos', addon: false },  // <-- REMOVIDO
    { to: '/agenda', label: 'Agenda', addon: 'calendario' }, // Exemplo: precisa addon
    { to: '/minhas-integracoes', label: 'Integrações', addon: false },
    { to: '/insolvencias', label: 'Insolvências', addon: 'insolvencia' },
    // ... Adicione só rotas existentes & existentes no código.
  ];

  // Filtra apenas páginas existentes e cujo add-on está "subscrito" se aplicável
  const privateNavItems = privateNavItemsAll.filter(
    item =>
      !item.addon // se não requer addon, mostra sempre
      // ADDONS: apenas mostra se o addon está incluído no array (a lógica real deverá verificar subscrição num perfil, aqui vai sempre ocultar)
      || (typeof item.addon === 'string' && userAddons.includes(item.addon))
  );

  const userIsAuthenticated = !!user && !loading;

  return (
    <header className="bg-white p-2 md:p-4 flex flex-row items-center justify-between w-full border-b border-gray-200 shadow sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6 w-full">
        {/* Logo SEMPRE à esquerda */}
        <div className="flex items-center gap-4">
          <Link to="/">
            <img
              src="/lovable-uploads/e64d9504-cd29-4461-8732-1fa9de63eda5.png"
              alt="Legalflux Logo"
              width={40}
              height={40}
              className="h-10 w-auto"
              onError={e => { (e.target as HTMLImageElement).src = '/lovable-uploads/e64d9504-cd29-4461-8732-1fa9de63eda5.png'; }}
            />
          </Link>
        </div>
        {/* Navbar Desktop */}
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
              {/* Botão de notificações só para autenticados */}
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
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
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
    </header>
  );
};

export default Header;

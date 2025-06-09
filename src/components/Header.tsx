import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import logo from '@/../public/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useScrollToTop();

  const scrollToSection = (sectionId: string) => {
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-xl">
              <img 
                src={logo} 
                alt="Legalflux Logo" 
                className="h-8 w-8 object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary-800">Legalflux</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Portal Jurídico Inteligente</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/recursos" className="text-gray-600 hover:text-primary-800 transition-colors font-medium">
              Recursos
            </Link>
            <button 
              onClick={() => scrollToSection('planos')} 
              className="text-gray-600 hover:text-primary-800 transition-colors font-medium"
            >
              Planos
            </button>
            <Link to="/sobre" className="text-gray-600 hover:text-primary-800 transition-colors font-medium">
              Sobre
            </Link>
            <Link to="/contato" className="text-gray-600 hover:text-primary-800 transition-colors font-medium">
              Contacto
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-primary-800 hover:bg-primary-50" asChild>
              <Link to="/login">Entrar</Link>
            </Button>
            <Button className="bg-primary-800 hover:bg-primary-700 text-white px-6" asChild>
              <Link to="/register">Começar Gratuitamente</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-primary-800"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link to="/recursos" className="text-gray-600 hover:text-primary-800 transition-colors font-medium px-2 py-1">
                Recursos
              </Link>
              <button 
                onClick={() => scrollToSection('planos')} 
                className="text-gray-600 hover:text-primary-800 transition-colors font-medium px-2 py-1 text-left"
              >
                Planos
              </button>
              <Link to="/sobre" className="text-gray-600 hover:text-primary-800 transition-colors font-medium px-2 py-1">
                Sobre
              </Link>
              <Link to="/contato" className="text-gray-600 hover:text-primary-800 transition-colors font-medium px-2 py-1">
                Contacto
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
                <Button variant="ghost" className="text-primary-800 hover:bg-primary-50 justify-start" asChild>
                  <Link to="/login">Entrar</Link>
                </Button>
                <Button className="bg-primary-800 hover:bg-primary-700 text-white" asChild>
                  <Link to="/register">Começar Gratuitamente</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

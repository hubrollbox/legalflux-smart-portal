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
    <header className="bg-primary-800 p-2 md:p-4 flex flex-row items-center justify-between w-full">
      <img src={logo} alt="Legalflux Logo" className="h-10 w-auto" />

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-8">
        <Link to="/recursos" className="text-gray-200 hover:text-primary-300 transition-colors font-medium">
          Recursos
        </Link>
        <button 
          onClick={() => scrollToSection('planos')} 
          className="text-gray-200 hover:text-primary-300 transition-colors font-medium"
        >
          Planos
        </button>
        <Link to="/sobre" className="text-gray-200 hover:text-primary-300 transition-colors font-medium">
          Sobre
        </Link>
        <Link to="/contato" className="text-gray-200 hover:text-primary-300 transition-colors font-medium">
          Contacto
        </Link>
      </nav>

      {/* Action Buttons */}
      <div className="hidden md:flex items-center space-x-4">
        <Button variant="ghost" className="text-primary-300 hover:bg-primary-700" asChild>
          <Link to="/login">Entrar</Link>
        </Button>
        <Button className="bg-primary-600 hover:bg-primary-500 text-white px-6" asChild>
          <Link to="/register">Começar Gratuitamente</Link>
        </Button>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-primary-300"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden py-4 border-t border-gray-700 bg-primary-800 animate-fade-in">
          <div className="flex flex-col space-y-4">
            <Link to="/recursos" className="text-gray-200 hover:text-primary-300 transition-colors font-medium px-2 py-1">
              Recursos
            </Link>
            <button 
              onClick={() => scrollToSection('planos')} 
              className="text-gray-200 hover:text-primary-300 transition-colors font-medium px-2 py-1 text-left"
            >
              Planos
            </button>
            <Link to="/sobre" className="text-gray-200 hover:text-primary-300 transition-colors font-medium px-2 py-1">
              Sobre
            </Link>
            <Link to="/contato" className="text-gray-200 hover:text-primary-300 transition-colors font-medium px-2 py-1">
              Contacto
            </Link>
            <div className="flex flex-col space-y-2 pt-4 border-t border-gray-700">
              <Button variant="ghost" className="text-primary-300 hover:bg-primary-700 justify-start" asChild>
                <Link to="/login">Entrar</Link>
              </Button>
              <Button className="bg-primary-600 hover:bg-primary-500 text-white" asChild>
                <Link to="/register">Começar Gratuitamente</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

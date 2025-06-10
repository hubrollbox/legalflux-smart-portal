import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import Image from 'next/image';
import logo from '@/public/logo.png';
import { generateBlurPlaceholder } from '@/lib/imageUtils';

const blurPlaceholder = generateBlurPlaceholder(100, 40); // Placeholder dimensions for logo

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
    <header className="bg-white p-2 md:p-4 flex flex-row items-center justify-between w-full border-b border-gray-200 shadow">
      <div className="container mx-auto flex items-center justify-between py-4 px-6 w-full">
        <Link to="/">
          <Image 
            src="/logo.png" 
            alt="Legalflux Logo" 
            width={100} 
            height={40} 
            priority
            className="h-10 w-auto logo-placeholder"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/recursos" className="text-gray-800 hover:text-primary-600 transition-colors font-medium">
            Recursos
          </Link>
          <Link to="/planos" className="text-gray-800 hover:text-primary-600 transition-colors font-medium">
            Planos
          </Link>
          <Link to="/sobre" className="text-gray-800 hover:text-primary-600 transition-colors font-medium">
            Sobre
          </Link>
          <Link to="/contato" className="text-gray-800 hover:text-primary-600 transition-colors font-medium">
            Contacto
          </Link>
          <Link to="/seguranca" className="text-gray-800 hover:text-primary-600 transition-colors font-medium">
            Segurança
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" className="text-primary-600 hover:bg-primary-100" asChild>
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
            <Link to="/recursos" className="text-gray-800 hover:text-primary-600 transition-colors font-medium px-2 py-1">
              Recursos
            </Link>
            <button 
              onClick={() => scrollToSection('planos')} 
              className="text-gray-800 hover:text-primary-600 transition-colors font-medium px-2 py-1 text-left"
            >
              Planos
            </button>
            <Link to="/sobre" className="text-gray-800 hover:text-primary-600 transition-colors font-medium px-2 py-1">
              Sobre
            </Link>
            <Link to="/contato" className="text-gray-800 hover:text-primary-600 transition-colors font-medium px-2 py-1">
              Contacto
            </Link>
            <Link to="/seguranca" className="text-gray-800 hover:text-primary-600 transition-colors font-medium px-2 py-1">
              Segurança
            </Link>
            <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
              <Button variant="ghost" className="text-primary-600 hover:bg-primary-100 justify-start" asChild>
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

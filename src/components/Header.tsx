
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-xl">
              <img 
                src="/lovable-uploads/3c621e97-ebe6-4a63-be63-bcee1711ab40.png" 
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
            <a href="#recursos" className="text-gray-600 hover:text-primary-800 transition-colors font-medium">
              Recursos
            </a>
            <a href="#planos" className="text-gray-600 hover:text-primary-800 transition-colors font-medium">
              Planos
            </a>
            <a href="#sobre" className="text-gray-600 hover:text-primary-800 transition-colors font-medium">
              Sobre
            </a>
            <a href="#contato" className="text-gray-600 hover:text-primary-800 transition-colors font-medium">
              Contacto
            </a>
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
              <a href="#recursos" className="text-gray-600 hover:text-primary-800 transition-colors font-medium px-2 py-1">
                Recursos
              </a>
              <a href="#planos" className="text-gray-600 hover:text-primary-800 transition-colors font-medium px-2 py-1">
                Planos
              </a>
              <a href="#sobre" className="text-gray-600 hover:text-primary-800 transition-colors font-medium px-2 py-1">
                Sobre
              </a>
              <a href="#contato" className="text-gray-600 hover:text-primary-800 transition-colors font-medium px-2 py-1">
                Contacto
              </a>
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

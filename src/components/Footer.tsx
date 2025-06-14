
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-white p-2 rounded-xl">
                <img 
                  src="/lovable-uploads/e64d9504-cd29-4461-8732-1fa9de63eda5.png"
                  alt="Legalflux Logo"
                  className="h-6 w-6 object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">Legalflux</h3>
                <p className="text-primary-200 text-sm">Portal Jurídico Inteligente</p>
              </div>
            </div>
            <p className="text-primary-200 mb-4 max-w-md">
              Revolucionando a gestão jurídica com tecnologia avançada, 
              inteligência artificial e foco na experiência do usuário.
            </p>
            <p className="text-primary-300 text-sm">
              © 2025 Legalflux. Todos os direitos reservados.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Produto</h4>
            <ul className="space-y-2 text-primary-200">
              <li><Link to="/recursos" className="hover:text-white transition-colors">Recursos</Link></li>
              <li><a href="#planos" className="hover:text-white transition-colors">Planos</a></li>
              <li><Link to="/seguranca" className="hover:text-white transition-colors">Segurança</Link></li>
              <li><Link to="/integracoes" className="hover:text-white transition-colors">Integrações</Link></li>
              <li><Link to="/documentacao" className="hover:text-white transition-colors">API</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Suporte</h4>
            <ul className="space-y-2 text-primary-200">
              <li><Link to="/central-ajuda" className="hover:text-white transition-colors">Central de Ajuda</Link></li>
              <li><Link to="/contato" className="hover:text-white transition-colors">Contato</Link></li>
              <li><Link to="/status-sistema" className="hover:text-white transition-colors">Status do Sistema</Link></li>
              <li><Link to="/documentacao" className="hover:text-white transition-colors">Documentação</Link></li>
              <li><Link to="/comunidade" className="hover:text-white transition-colors">Comunidade</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 text-primary-200 text-sm mb-4 md:mb-0">
              <Link to="/politica-privacidade" className="hover:text-white transition-colors">Política de Privacidade</Link>
              <Link to="/termos-uso" className="hover:text-white transition-colors">Termos de Uso</Link>
              <a href="#" className="hover:text-white transition-colors">LGPD</a>
            </div>
            <div className="text-primary-300 text-sm">
              Desenvolvido com ❤️ para a comunidade jurídica dos PALOP
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

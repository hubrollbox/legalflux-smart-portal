import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { generateBlurPlaceholder } from '@/lib/imageUtils';
import { useAuth } from '@/contexts/useAuth';
import TopNavBar from './TopNavBar';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useScrollToTop();
  const { user, loading, role } = useAuth();

  const blurPlaceholder = generateBlurPlaceholder(100, 40);

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
        {/* Navbar Desktop e Botões lado direito now handled by TopNavBar  */}
        <TopNavBar blurPlaceholder={blurPlaceholder} />
      </div>
    </header>
  );
};

export default Header;

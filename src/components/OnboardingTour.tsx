import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, ArrowLeft, ArrowRight, Play } from 'lucide-react';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  targetSelector: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 'dashboard-welcome',
    title: 'Bem-vindo ao LegalFlux!',
    description: 'Este é o seu dashboard principal onde pode ver um resumo de todos os seus processos e atividades.',
    targetSelector: '.dashboard-header',
    position: 'bottom'
  },
  {
    id: 'new-process',
    title: 'Começa aqui',
    description: 'Cria o teu primeiro processo clicando neste botão. É aqui que tudo começa!',
    targetSelector: '[data-tour="new-process"]',
    position: 'bottom'
  },
  {
    id: 'calendar-check',
    title: 'Consulta os prazos desta semana',
    description: 'Aqui podes ver os próximos eventos e prazos importantes. Nunca mais percas um prazo!',
    targetSelector: '[data-tour="upcoming-events"]',
    position: 'top'
  },
  {
    id: 'sidebar-navigation',
    title: 'Navegação principal',
    description: 'Usa este menu para navegar entre as diferentes secções: Processos, Clientes, Calendário e muito mais.',
    targetSelector: '.sidebar',
    position: 'right'
  }
];

interface OnboardingTourProps {
  isActive: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max));

const OnboardingTour: React.FC<OnboardingTourProps> = ({ isActive, onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!isActive || currentStep >= onboardingSteps.length) return;

    const updatePosition = () => {
      const step = onboardingSteps[currentStep];
      const targetElement = document.querySelector(step.targetSelector);

      // Default width/height of tooltip (aprox)
      const TOOLTIP_WIDTH = 320;
      const TOOLTIP_HEIGHT = 180;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let top, left;

      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

        switch (step.position) {
          case 'bottom':
            top = rect.top + scrollTop + rect.height + 10;
            left = rect.left + scrollLeft + rect.width / 2 - TOOLTIP_WIDTH / 2;
            break;
          case 'top':
            top = rect.top + scrollTop - TOOLTIP_HEIGHT - 10;
            left = rect.left + scrollLeft + rect.width / 2 - TOOLTIP_WIDTH / 2;
            break;
          case 'right':
            top = rect.top + scrollTop + rect.height / 2 - TOOLTIP_HEIGHT / 2;
            left = rect.left + scrollLeft + rect.width + 10;
            break;
          case 'left':
            top = rect.top + scrollTop + rect.height / 2 - TOOLTIP_HEIGHT / 2;
            left = rect.left + scrollLeft - TOOLTIP_WIDTH - 10;
            break;
          default:
            top = rect.top + scrollTop;
            left = rect.left + scrollLeft;
        }

        // Guarantee tooltip stays inside viewport (10px padding)
        top = clamp(top, 10, viewportHeight - TOOLTIP_HEIGHT - 10 + scrollTop);
        left = clamp(left, 10, viewportWidth - TOOLTIP_WIDTH - 10 + scrollLeft);

        setPosition({ top, left });

        // Highlight the target
        targetElement.classList.add('ring-2', 'ring-accent-500', 'ring-offset-2', 'rounded-lg');
        // Scroll to element
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
      } else {
        // Fallback: center the tooltip in the viewport
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        top = scrollTop + viewportHeight / 2 - TOOLTIP_HEIGHT / 2;
        left = scrollLeft + viewportWidth / 2 - TOOLTIP_WIDTH / 2;
        // Guarantee it's inside visible area
        top = clamp(top, 10, viewportHeight - TOOLTIP_HEIGHT - 10 + scrollTop);
        left = clamp(left, 10, viewportWidth - TOOLTIP_WIDTH - 10 + scrollLeft);

        setPosition({ top, left });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      // Remove highlighting from all tour elements
      document.querySelectorAll('[data-tour]').forEach(el => {
        el.classList.remove('ring-2', 'ring-accent-500', 'ring-offset-2', 'rounded-lg');
      });
      document.querySelector('.dashboard-header')?.classList.remove('ring-2', 'ring-accent-500', 'ring-offset-2', 'rounded-lg');
      document.querySelector('.sidebar')?.classList.remove('ring-2', 'ring-accent-500', 'ring-offset-2', 'rounded-lg');
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [isActive, currentStep]);

  if (!isActive || currentStep >= onboardingSteps.length) {
    return null;
  }

  const currentStepData = onboardingSteps[currentStep];

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />

      <Card 
        className="fixed z-50 w-80 border-0 shadow-2xl"
        style={{ 
          top: `${position.top}px`, 
          left: `${position.left}px`,
          maxWidth: '320px'
        }}
        // Extra: garantir que está dentro do ecrã
      >
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-2">
              <Play className="h-5 w-5 text-accent-600" />
              <span className="text-sm font-medium text-accent-600">
                {currentStep + 1} de {onboardingSteps.length}
              </span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onSkip}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <h3 className="text-lg font-bold text-primary-800 mb-3">
            {currentStepData.title}
          </h3>
          
          <p className="text-gray-600 mb-6">
            {currentStepData.description}
          </p>
          
          <div className="flex justify-between items-center">
            <Button 
              variant="ghost" 
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="text-gray-500"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Anterior
            </Button>
            
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={onSkip}
                className="border-gray-300"
              >
                Saltar
              </Button>
              <Button 
                onClick={handleNext}
                className="bg-accent-600 hover:bg-accent-700"
              >
                {currentStep === onboardingSteps.length - 1 ? 'Concluir' : 'Seguinte'}
                {currentStep < onboardingSteps.length - 1 && <ArrowRight className="h-4 w-4 ml-1" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default OnboardingTour;

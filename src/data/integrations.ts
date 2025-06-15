import { 
  Database, FileText, Globe, Shield, Mail, Cloud, Calendar, 
  Users, Building, MessageSquare, Video, CreditCard, BookOpen, 
  Briefcase, Smartphone, Zap, Settings 
} from 'lucide-react';

export interface Integration {
  id: number;
  name: string;
  description: string;
  category: string;
  status: 'disponivel' | 'em_desenvolvimento';
  icon: any;
  features: string[];
  documentationUrl: string;
}

export const integracoesDisponiveis: Integration[] = [
  // Sistemas Jurídicos Portugueses
  {
    id: 1,
    name: 'CITIUS',
    description: 'Sistema de Gestão Processual dos Tribunais',
    category: 'Tribunais',
    status: 'disponivel',
    icon: Database,
    features: ['Consulta de processos', 'Notificações automáticas', 'Download de peças'],
    documentationUrl: '/documentacao#citius'
  },
  {
    id: 2,
    name: 'Portal da Justiça',
    description: 'Acesso aos serviços judiciais online',
    category: 'Governo',
    status: 'disponivel',
    icon: Globe,
    features: ['Certidões online', 'Registo criminal', 'Consulta de decisões'],
    documentationUrl: '/documentacao#portal-justica'
  },
  {
    id: 3,
    name: 'IRN - Instituto dos Registos',
    description: 'Conservatórias e notariado online',
    category: 'Registos',
    status: 'em_desenvolvimento',
    icon: FileText,
    features: ['Certidões prediais', 'Registo comercial', 'Registo automóvel'],
    documentationUrl: '/documentacao#irn'
  },
  {
    id: 4,
    name: 'AT - Autoridade Tributária',
    description: 'Portal das Finanças',
    category: 'Fiscal',
    status: 'disponivel',
    icon: Shield,
    features: ['Certidões fiscais', 'Consulta de dívidas', 'Declarações'],
    documentationUrl: '/documentacao#at'
  },
  {
    id: 5,
    name: 'Segurança Social',
    description: 'Instituto da Segurança Social',
    category: 'Social',
    status: 'disponivel',
    icon: Database,
    features: ['Situação contributiva', 'Benefícios', 'Histórico laboral'],
    documentationUrl: '/documentacao#seguranca-social'
  },
  {
    id: 6,
    name: 'RJSP - Rede Judicial',
    description: 'Sistema integrado de informação criminal',
    category: 'Criminal',
    status: 'em_desenvolvimento',
    icon: Shield,
    features: ['Consulta de antecedentes', 'Processos criminais', 'Decisões'],
    documentationUrl: '/documentacao#rjsp'
  },
  
  // Email & Comunicação
  {
    id: 10,
    name: 'Gmail',
    description: 'Integração com Gmail para advogados',
    category: 'Email',
    status: 'disponivel',
    icon: Mail,
    features: ['Sincronização de emails', 'Templates jurídicos', 'Arquivamento automático'],
    documentationUrl: '/documentacao#gmail'
  },
  {
    id: 11,
    name: 'Outlook',
    description: 'Microsoft Outlook para escritórios',
    category: 'Email',
    status: 'disponivel',
    icon: Mail,
    features: ['Calendário integrado', 'Contactos sincronizados', 'Assinaturas automáticas'],
    documentationUrl: '/documentacao#outlook'
  },
  {
    id: 12,
    name: 'WhatsApp Business',
    description: 'Comunicação com clientes via WhatsApp',
    category: 'Comunicação',
    status: 'em_desenvolvimento',
    icon: MessageSquare,
    features: ['Mensagens automáticas', 'Templates aprovados', 'Histórico de conversas'],
    documentationUrl: '/documentacao#whatsapp'
  },
  {
    id: 13,
    name: 'Zoom',
    description: 'Videoconferências para audiências e reuniões',
    category: 'Comunicação',
    status: 'disponivel',
    icon: Video,
    features: ['Gravação de sessões', 'Agendamento automático', 'Salas de espera'],
    documentationUrl: '/documentacao#zoom'
  },
  {
    id: 14,
    name: 'Microsoft Teams',
    description: 'Colaboração em equipa para escritórios',
    category: 'Comunicação',
    status: 'disponivel',
    icon: Users,
    features: ['Chat em equipa', 'Partilha de ficheiros', 'Reuniões virtuais'],
    documentationUrl: '/documentacao#teams'
  },
  
  // Cloud Storage
  {
    id: 20,
    name: 'Google Drive',
    description: 'Armazenamento e sincronização de documentos',
    category: 'Armazenamento',
    status: 'disponivel',
    icon: Cloud,
    features: ['Backup automático', 'Partilha segura', 'Versionamento'],
    documentationUrl: '/documentacao#google-drive'
  },
  {
    id: 21,
    name: 'Dropbox',
    description: 'Sincronização de ficheiros em nuvem',
    category: 'Armazenamento',
    status: 'disponivel',
    icon: Cloud,
    features: ['Sincronização automática', 'Histórico de versões', 'Links seguros'],
    documentationUrl: '/documentacao#dropbox'
  },
  {
    id: 22,
    name: 'OneDrive',
    description: 'Armazenamento Microsoft integrado',
    category: 'Armazenamento',
    status: 'disponivel',
    icon: Cloud,
    features: ['Integração Office', 'Colaboração em tempo real', 'Backup automático'],
    documentationUrl: '/documentacao#onedrive'
  },
  {
    id: 23,
    name: 'iCloud',
    description: 'Sincronização para dispositivos Apple',
    category: 'Armazenamento',
    status: 'em_desenvolvimento',
    icon: Cloud,
    features: ['Sincronização iOS/Mac', 'Backup de documentos', 'Acesso universal'],
    documentationUrl: '/documentacao#icloud'
  },
  
  // Calendário
  {
    id: 30,
    name: 'Google Calendar',
    description: 'Gestão de prazos e audiências',
    category: 'Calendário',
    status: 'disponivel',
    icon: Calendar,
    features: ['Prazos automáticos', 'Lembretes personalizados', 'Partilha de calendários'],
    documentationUrl: '/documentacao#google-calendar'
  },
  {
    id: 31,
    name: 'Outlook Calendar',
    description: 'Calendário Microsoft integrado',
    category: 'Calendário',
    status: 'disponivel',
    icon: Calendar,
    features: ['Agendamento de reuniões', 'Convites automáticos', 'Sincronização móvel'],
    documentationUrl: '/documentacao#outlook-calendar'
  },
  {
    id: 32,
    name: 'Apple Calendar',
    description: 'Calendário para dispositivos Apple',
    category: 'Calendário',
    status: 'em_desenvolvimento',
    icon: Calendar,
    features: ['Sincronização iCloud', 'Lembretes inteligentes', 'Integração Siri'],
    documentationUrl: '/documentacao#apple-calendar'
  },
  
  // Office & Produtividade
  {
    id: 40,
    name: 'Microsoft Office 365',
    description: 'Suite completa de produtividade',
    category: 'Produtividade',
    status: 'disponivel',
    icon: FileText,
    features: ['Word, Excel, PowerPoint', 'Templates jurídicos', 'Colaboração em tempo real'],
    documentationUrl: '/documentacao#office365'
  },
  {
    id: 41,
    name: 'Google Workspace',
    description: 'Ferramentas colaborativas Google',
    category: 'Produtividade',
    status: 'disponivel',
    icon: FileText,
    features: ['Docs, Sheets, Slides', 'Comentários e revisões', 'Partilha segura'],
    documentationUrl: '/documentacao#google-workspace'
  },
  {
    id: 42,
    name: 'Adobe Acrobat',
    description: 'Gestão avançada de PDFs',
    category: 'Produtividade',
    status: 'disponivel',
    icon: FileText,
    features: ['Assinatura digital', 'Formulários interativos', 'Anotações jurídicas'],
    documentationUrl: '/documentacao#adobe-acrobat'
  },
  {
    id: 43,
    name: 'Notion',
    description: 'Base de conhecimento e notas',
    category: 'Produtividade',
    status: 'em_desenvolvimento',
    icon: BookOpen,
    features: ['Base de dados jurídica', 'Templates personalizados', 'Colaboração em equipa'],
    documentationUrl: '/documentacao#notion'
  },
  
  // Dispositivos Móveis
  {
    id: 50,
    name: 'iOS Shortcuts',
    description: 'Automatizações para iPhone/iPad',
    category: 'Móvel',
    status: 'em_desenvolvimento',
    icon: Smartphone,
    features: ['Atalhos personalizados', 'Automação Siri', 'Widgets informativos'],
    documentationUrl: '/documentacao#ios-shortcuts'
  },
  {
    id: 51,
    name: 'Android Tasker',
    description: 'Automatizações para Android',
    category: 'Móvel',
    status: 'em_desenvolvimento',
    icon: Smartphone,
    features: ['Perfis automáticos', 'Notificações inteligentes', 'Ações programadas'],
    documentationUrl: '/documentacao#android-tasker'
  },
  
  // Pagamentos & Financeiro
  {
    id: 60,
    name: 'Stripe',
    description: 'Processamento de pagamentos online',
    category: 'Financeiro',
    status: 'disponivel',
    icon: CreditCard,
    features: ['Pagamentos recorrentes', 'Faturas automáticas', 'Relatórios financeiros'],
    documentationUrl: '/documentacao#stripe'
  },
  {
    id: 61,
    name: 'PayPal',
    description: 'Pagamentos internacionais',
    category: 'Financeiro',
    status: 'disponivel',
    icon: CreditCard,
    features: ['Pagamentos seguros', 'Conversão de moedas', 'Proteção de vendedor'],
    documentationUrl: '/documentacao#paypal'
  },
  {
    id: 62,
    name: 'MB Way',
    description: 'Pagamentos móveis portugueses',
    category: 'Financeiro',
    status: 'em_desenvolvimento',
    icon: Smartphone,
    features: ['Pagamentos instantâneos', 'QR Code', 'Transferências rápidas'],
    documentationUrl: '/documentacao#mbway'
  },
  
  // CRM & Gestão
  {
    id: 70,
    name: 'Salesforce',
    description: 'CRM para escritórios de advocacia',
    category: 'CRM',
    status: 'em_desenvolvimento',
    icon: Briefcase,
    features: ['Gestão de clientes', 'Pipeline de vendas', 'Relatórios detalhados'],
    documentationUrl: '/documentacao#salesforce'
  },
  {
    id: 71,
    name: 'HubSpot',
    description: 'Marketing e vendas para advogados',
    category: 'CRM',
    status: 'em_desenvolvimento',
    icon: Users,
    features: ['Lead tracking', 'Email marketing', 'Automação de vendas'],
    documentationUrl: '/documentacao#hubspot'
  },
  
  // Outros
  {
    id: 80,
    name: 'Zapier',
    description: 'Automação entre aplicações',
    category: 'Automação',
    status: 'disponivel',
    icon: Zap,
    features: ['Workflows personalizados', '5000+ integrações', 'Triggers automáticos'],
    documentationUrl: '/documentacao#zapier'
  },
  {
    id: 81,
    name: 'IFTTT',
    description: 'Se isto então aquilo - automações simples',
    category: 'Automação',
    status: 'disponivel',
    icon: Settings,
    features: ['Automações simples', 'Dispositivos IoT', 'Ações programadas'],
    documentationUrl: '/documentacao#ifttt'
  },
  
  // --- Add-on Insolvência destacado ---
  {
    id: 900,
    name: 'LegalFlux Insolvências',
    description: 'Gestão de massas falidas, credores, inventários, checklist legal e geração de documentos CIRE.',
    category: 'Add-ons',
    status: 'disponivel',
    icon: FileText,
    features: [
      'Gestão de processos de insolvência',
      'Checklist legal automático (CIRE)',
      'Inventário de bens e dívidas da massa',
      'Exportação e geração de PDFs oficiais',
      'Somente subscritores Profissional/Enterprise',
    ],
    documentationUrl: '/documentacao#insolvencia'
  }
];

export const categorias = [
  'Todas',
  'Tribunais',
  'Governo',
  'Email',
  'Comunicação',
  'Armazenamento',
  'Calendário',
  'Produtividade',
  'Móvel',
  'Financeiro',
  'CRM',
  'Automação',
  'Add-ons'
];

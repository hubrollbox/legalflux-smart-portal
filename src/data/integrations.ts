
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

// Centraliza exportação
export { integrationList } from "./integrationList";

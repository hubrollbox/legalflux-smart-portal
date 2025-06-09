import ReactGA from 'react-ga4';
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import AnalyticsTracker from '@/components/AnalyticsTracker';

ReactGA.initialize('G-XXXXXXXXXX'); // Substitua pelo seu ID GA4

const root = createRoot(document.getElementById('root')!);
root.render(
  <>
    <AnalyticsTracker />
    <App />
  </>
);

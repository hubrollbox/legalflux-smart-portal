// Remover temporariamente o Google Analytics para evitar erro de runtime
// import ReactGA from 'react-ga4';
// import AnalyticsTracker from '@/components/AnalyticsTracker';
// ReactGA.initialize('G-XXXXXXXXXX');

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const root = createRoot(document.getElementById('root')!);
root.render(
  // <>
  //   <AnalyticsTracker />
  //   <App />
  // </>
  <App />
);

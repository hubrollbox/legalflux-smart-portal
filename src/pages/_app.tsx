import * as Sentry from '@sentry/nextjs';
import LegalFluxCommandProvider from "@/components/layout/LegalFluxCommandProvider";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0, // Adjust this value for production
});

function App({ Component, pageProps }) {
  return (
    <LegalFluxCommandProvider>
      <Component {...pageProps} />
    </LegalFluxCommandProvider>
  );
}

export default App;

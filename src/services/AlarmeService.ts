// AlarmeService.ts
// Serviço para agendamento e envio de notificações push para alarmes/lembretes

export class AlarmeService {
  // Solicita permissão para notificações push
  static async requestPermission() {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  }

  // Agenda um lembrete local (fallback caso push não esteja disponível)
  static scheduleLocalNotification({ title, body, date }: { title: string; body: string; date: Date }) {
    const now = new Date();
    const delay = date.getTime() - now.getTime();
    if (delay > 0) {
      setTimeout(() => {
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification(title, { body, icon: '/logo-legalflux-192.png' });
        }
      }, delay);
    }
  }

  // Envia uma notificação push (requer backend para enviar push real)
  static async sendPushNotification({ title, body, url }: { title: string; body: string; url?: string }) {
    // Aqui normalmente você enviaria a notificação via backend usando a subscription do usuário
    // Exemplo: fetch('/api/send-push', { method: 'POST', body: JSON.stringify({ title, body, url }) })
    // Para demo, apenas mostra local
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body, icon: '/logo-legalflux-192.png', data: { url } });
    }
  }

  // Subscreve o usuário ao PushManager (requer service worker registrado)
  static async subscribeUserToPush() {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      const reg = await navigator.serviceWorker.ready;
      try {
        const sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: undefined // Adicione sua VAPID public key aqui para produção
        });
        // Envie sub para backend para salvar
        return sub;
      } catch (e) {
        return null;
      }
    }
    return null;
  }
}

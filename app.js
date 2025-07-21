// كشف إذا كان التطبيق يعمل على localhost
const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1' ||
  window.location.hostname === ''
);

function setupPWA() {
  if (!isLocalhost && window.location.protocol !== 'https:') {
    console.warn('PWA تحتاج HTTPS للعمل بكامل ميزاتها');
    return;
  }

  const installButton = document.getElementById('installButton');
  
  let deferredPrompt;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installButton.style.display = 'block';
    
    setTimeout(() => {
      if (deferredPrompt) {
        installButton.style.display = 'none';
      }
    }, 30000);
  });

  installButton.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log('نتيجة التثبيت:', outcome);
    deferredPrompt = null;
    installButton.style.display = 'none';
  });

  window.addEventListener('appinstalled', () => {
    console.log('تم التثبيت بنجاح');
    installButton.style.display = 'none';
  });
}

// تسجيل Service Worker فقط على localhost أو HTTPS
if ('serviceWorker' in navigator && (isLocalhost || window.location.protocol === 'https:')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('Service Worker مسجل');
        setupPWA();
      })
      .catch(err => {
        console.error('فشل تسجيل Service Worker:', err);
      });
  });
} else {
  setupPWA();
}
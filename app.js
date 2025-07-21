const installBtn = document.getElementById('installBtn');
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  console.log('📌 beforeinstallprompt fired!');
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = 'block';
});

installBtn.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  console.log('✅ نتيجة التثبيت:', outcome);
  deferredPrompt = null;
  installBtn.style.display = 'none';
});

window.addEventListener('appinstalled', () => {
  console.log('🎉 تم تثبيت التطبيق!');
  installBtn.style.display = 'none';
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/my-pwa/sw.js')
      .then(reg => console.log('✅ Service Worker مسجل', reg))
      .catch(err => console.error('❌ فشل تسجيل Service Worker:', err));
  });
}

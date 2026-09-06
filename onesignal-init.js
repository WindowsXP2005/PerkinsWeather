// Perkins Weather - OneSignal push notification setup
//
// 1. Sign up free at https://onesignal.com (Web Push app)
// 2. Copy your App ID from their dashboard
// 3. Paste it below in place of YOUR-ONESIGNAL-APP-ID-HERE
//
// See push-notifications-setup.html for the full walkthrough.

window.OneSignalDeferred = window.OneSignalDeferred || [];
OneSignalDeferred.push(async function (OneSignal) {
  await OneSignal.init({
    appId: "YOUR-ONESIGNAL-APP-ID-HERE",
    notifyButton: {
      enable: true, // shows a small bell icon users can click to subscribe
    },
    allowLocalhostAsSecureOrigin: true, // handy for testing before you have HTTPS hosting
  });
});

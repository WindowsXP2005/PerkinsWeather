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
    appId: "6148eb7c-5d9a-4b9a-996b-a9da1bc5d89b",
    notifyButton: {
      enable: true, // shows a small bell icon users can click to subscribe
    },
    allowLocalhostAsSecureOrigin: true, // handy for testing before you have HTTPS hosting
  });
});

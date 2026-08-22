const currentDate = document.getElementById("current-date");

if (currentDate) {
  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
  currentDate.dateTime = localDate.toISOString().slice(0, 10);
  currentDate.textContent = today.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
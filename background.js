chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create("dailyGitaQuote", {
    when: Date.now() + 5000,
    periodInMinutes: 1440
  });
});

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    chrome.tabs.create({
      url: "welcome.html" // Create this file in your root folder
    });
  }
});

chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === "dailyGitaQuote") {
    fetch(chrome.runtime.getURL("quotes.json"))
      .then(res => res.json())
      .then(quotes => {
        const q = quotes[Math.floor(Math.random() * quotes.length)];

        chrome.notifications.create({
          type: "basic",
          iconUrl: "icon/icon48.png",
          title: "Bhagavad Gita",
          message: `${q.text}\n— ${q.ref}`
        });
      });
  }
});

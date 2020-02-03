var s = document.createElement('script');
s.src = chrome.runtime.getURL('netflix-clean.js');
(document.head || document.documentElement).appendChild(s);

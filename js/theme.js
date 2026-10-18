/* Apply the saved theme before first paint to avoid a flash of the wrong theme */
try { const t = localStorage.getItem('theme'); if (t) document.documentElement.dataset.theme = t; } catch (e) { /* storage unavailable */ }

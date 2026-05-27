const themeToggle = document.getElementById('themeToggle');
const body = document.body;

function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark');
    themeToggle.textContent = 'Switch to Light Theme';
  } else {
    body.classList.remove('dark');
    themeToggle.textContent = 'Switch to Dark Theme';
  }
}

function toggleTheme() {
  body.classList.toggle('dark');
  const isDark = body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  themeToggle.textContent = isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme';
  
  // Add pulse animation to button
  themeToggle.classList.add('clicked');
  setTimeout(() => {
    themeToggle.classList.remove('clicked');
  }, 600);
}

themeToggle.addEventListener('click', toggleTheme);
loadTheme();

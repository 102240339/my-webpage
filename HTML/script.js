const themeToggle = document.getElementById('themeToggle');
const themeToggleText = themeToggle.querySelector('span');
const body = document.body;

function loadTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark');
    themeToggleText.textContent = 'Switch to Light Theme';
  } else {
    body.classList.remove('dark');
    themeToggleText.textContent = 'Switch to Dark Theme';
  }
}

function toggleTheme() {
  // determine target primary color for animation
  const wasDark = body.classList.contains('dark');
  let targetPrimary = '';
  if (wasDark) {
    // target will be light: read from :root
    targetPrimary = getComputedStyle(document.documentElement).getPropertyValue('--primary');
  } else {
    // target will be dark: temporarily add class to read value
    body.classList.add('dark');
    targetPrimary = getComputedStyle(body).getPropertyValue('--primary');
    body.classList.remove('dark');
  }

  // set CSS variable on the button for overlay color
  themeToggle.style.setProperty('--btn-target', targetPrimary.trim());
  // set swipe origin depending on direction: from left when going to light, from right when going to dark
  themeToggle.style.setProperty('--btn-origin', wasDark ? 'left' : 'right');
  // make the overlay more visible and slower when going dark->light (wasDark === true)
  if (wasDark) {
    // currently dark, switching to light — make overlay brighter and more opaque
    themeToggle.style.setProperty('--btn-overlay-opacity', '1');
    themeToggle.style.setProperty('--btn-overlay-shadow', '0 10px 34px rgba(255, 255, 255, 0.12)');
  } else {
    // switching to dark — keep original bluish highlight but slightly more visible
    themeToggle.style.setProperty('--btn-overlay-opacity', '0.98');
    themeToggle.style.setProperty('--btn-overlay-shadow', '0 14px 30px rgba(79, 109, 245, 0.22)');
  }

  // trigger color swipe animation
  themeToggle.classList.add('color-swipe');

  // small timeout to start the swipe, then toggle theme so both animate together
  setTimeout(() => {
    body.classList.toggle('dark');
    const isDark = body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggleText.textContent = isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme';
  }, 20);

  // pulse effect
  themeToggle.classList.add('clicked');
  // remove animations after they complete (longer to match slower swipe)
  setTimeout(() => {
    themeToggle.classList.remove('clicked');
  }, 900);
  setTimeout(() => {
    themeToggle.classList.remove('color-swipe');
    themeToggle.style.removeProperty('--btn-target');
    themeToggle.style.removeProperty('--btn-origin');
    themeToggle.style.removeProperty('--btn-overlay-opacity');
    themeToggle.style.removeProperty('--btn-overlay-shadow');
  }, 950);
}

themeToggle.addEventListener('click', toggleTheme);
loadTheme();

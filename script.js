document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const fontSizeInput = document.getElementById('fontsize');
  const fontColorInput = document.getElementById('fontcolor');

  // Load preferences from cookies if available
  const savedFontSize = getCookie('fontsize');
  const savedFontColor = getCookie('fontcolor');

  if (savedFontSize) {
    document.body.style.fontSize = savedFontSize;
    fontSizeInput.value = parseInt(savedFontSize);
  }

  if (savedFontColor) {
    document.body.style.color = savedFontColor;
    fontColorInput.value = savedFontColor;
  }

  // Handle form submission
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get values from the form inputs
    const fontSize = fontSizeInput.value + 'px';
    const fontColor = fontColorInput.value;

    // Apply styles to the body
    document.body.style.fontSize = fontSize;
    document.body.style.color = fontColor;

    // Save preferences as cookies
    setCookie('fontsize', fontSize, 30); // Expires in 30 days
    setCookie('fontcolor', fontColor, 30); // Expires in 30 days
  });

  // Function to set a cookie
  function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  }

  // Function to get a cookie by name
  function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName.trim() === name) {
        return cookieValue;
      }
    }
    return null;
  }
});

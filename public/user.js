function User(firstName, lastName, username, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
  }
  
  async function register(e) {
    e.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    const newUser = new User(firstName, lastName, username, password);
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      localStorage.setItem('userId', data.userId);
      alert('Registration successful');
      window.location.href = 'notes.html';
    } catch (err) {
      alert(`Registration failed: ${err.message}`);
    }
  }
  
  async function login(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const loginUser = { username, password };
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginUser)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      localStorage.setItem('userId', data.userId);
      alert('Login successful');
      window.location.href = 'notes.html';
    } catch (err) {
      alert(`Login failed: ${err.message}`);
    }
  }
  
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', register);
  }
  
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', login);
  }
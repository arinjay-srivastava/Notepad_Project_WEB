// User constructor
function User(firstName, lastName, username, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
}

// Register function
function register(e) {
    e.preventDefault(); // Prevent form submission

    // Form inputs
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    //New User object is created using the constructor function User
    const newUser = new User(firstName, lastName, username, password);

    console.log(newUser);
}

// Event listener for the registration form
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', register);
    }
});

// Login function
function login(e) {
    e.preventDefault(); 
    // form inputs
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const loginUser = new User(null, null, username, password);

    console.log(loginUser);
}

// Event listener to the login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', login);
    
};

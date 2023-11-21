
const { renderDOM } = require('./helpers')

let dom; 
let document; 


describe('Register page html structure', () => {

      beforeEach(async () => {
    dom = await renderDOM('./register.html')
    document = await dom.window.document
  })


  it('should have the correct title', () => {
    expect(document.title).toBe('Register');
  });

  it('should have a registration form with username, password, and re-type password fields', () => {
    const registerForm = document.getElementById('register-form');
    expect(registerForm).toBeTruthy()

    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const rePasswordInput = document.getElementById('re-password');

    expect(usernameInput).toBeTruthy()
    expect(passwordInput).toBeTruthy();
    expect(rePasswordInput).toBeTruthy();
  });

  it('should have a link to log in', () => {
    const loginLink = document.querySelector('a[href="./login.html"]');
    expect(loginLink).toBeTruthy();
  });

  describe('Login Page HTML Structure', () => {
  
    beforeEach(async () => {
      dom = await renderDOM('./login.html')
      document = await dom.window.document
    })


    // Load the HTML file before each test

    it('should have the correct title', () => {
      expect(document.title).toBe('Login');
    });

    it('should have a login form with username and password fields', () => {
      const loginForm = document.getElementById('login-form');
      expect(loginForm).toBeTruthy();

      const usernameInput = document.getElementById('username');
      expect(usernameInput).toBeTruthy();

      const passwordInput = document.getElementById('password');
      expect(passwordInput).toBeTruthy();
    });

    it('should have a link to sign up', () => {
      const signUpLink = document.querySelector('a[href="./register.html"]');
      expect(signUpLink).toBeTruthy();
    });
  })

 describe('Homepage HTML Structure', () => {


//   // Load the HTML file before each test
    beforeEach(async () => {
      dom = await renderDOM('./homepage.html')
      document = await dom.window.document
    })


  it('should have the correct title', () => {
    expect(document.title).toBe('Cats');
  });

  it('should have a container with the title "CATS"', () => {
    const container = document.querySelector('.container');
    expect(container).toBeTruthy();

    const title = container.querySelector('h1');
    expect(title).toBeTruthy();
    expect(title.textContent).toBe('CATS');
  });

  it('should have a logout button', () => {
    const logoutButton = document.getElementById('logout');
    expect(logoutButton).toBeTruthy();
    expect(logoutButton.tagName).toBe('BUTTON');
    expect(logoutButton.textContent).toBe('logout');
  });

  it('should have a form to enter cat details', () => {
    const catForm = document.getElementById('cat-form');
    expect(catForm).toBeTruthy();

    const nameInput = catForm.querySelector('#name');
    expect(nameInput).toBeTruthy();

    const typeInput = catForm.querySelector('#type');
    expect(typeInput).toBeTruthy();

    const descriptionTextarea = catForm.querySelector('#description');
    expect(descriptionTextarea).toBeTruthy();

    const habitatTextarea = catForm.querySelector('#habitat');
    expect(habitatTextarea).toBeTruthy();

    const submitButton = catForm.querySelector('input[type="submit"]');
    expect(submitButton).toBeTruthy();
    expect(submitButton.value).toBe('Add a cat');
  });

  it('should have a "Show cats" button and an empty list for all cats', () => {
    const showCatsButton = document.getElementById('show-cats');
    expect(showCatsButton).toBeTruthy();
    expect(showCatsButton.tagName).toBe('BUTTON');
    expect(showCatsButton.textContent).toBe('Show cats');

    const allCatsList = document.getElementById('all-cats');
    expect(allCatsList).toBeTruthy();
    expect(allCatsList.tagName).toBe('UL');
    expect(allCatsList.children.length).toBe(0);
  });
    
  
    
    
});

});

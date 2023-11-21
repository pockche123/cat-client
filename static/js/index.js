const login = require('./login')
const homepage = require('./homepage')

const logout = document.getElementById('logout')
const loginForm = document.getElementById('login-form'); 

const catForm = document.getElementById('cat-form')
const showCats = document.getElementById('show-cats')




if (logout) {
  logout.addEventListener('click', () => {
    console.log('logout clicked')
    localStorage.removeItem('token')
    window.location.assign('login.html')
  })
}

if (loginForm) {
    loginForm.addEventListener('submit', login.login)
}


if (showCats) {
    showCats.addEventListener('click', homepage.fetchOrClearCats)
}

if (catForm) {
    catForm.addEventListener('submit', homepage.createCat)
}


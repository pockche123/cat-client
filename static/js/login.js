

async function login(e) {
    e.preventDefault(); 

    const form = new FormData(e.target)
        let username = form.get('username')
    let password = form.get('password')
    console.log(`username: ${username}, password: ${password}`)


    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    }
  const response = await fetch("http://localhost:3000/users/login", options);
  const data = await response.json();

  if (response.status == 200) {
    localStorage.setItem("token", data.token)
    window.location.assign('homepage.html')
  } else {
    alert(data.error);
  }
}
 


module.exports = {login}


const registerForm = document.getElementById("register-form")

if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault()

        const form = new FormData(e.target)
        let username = form.get('username')
         let password = form.get('password')
        let repassword = form.get('re-password')

          if (password !== repassword) {
              alert('Passwords are not the same')
              return
        }

        const options = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                username: username,
                password: password
            })
        }
       
       


        const response = await fetch("http://localhost:3000/users/register", options);
  const data = await response.json();

        if (response.status == 201) {
            window.location.assign("login.html")
        } else {
            console.log(data.error)
            alert("register failed")
        }
    })
}
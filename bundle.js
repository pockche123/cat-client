(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const catsList = document.getElementById('all-cats')

let toggleUpdate = true

let token = localStorage.getItem('token')

if (!token && window.location.pathname === '/homepage.html') {
  window.location.assign('login.html')
}

let fetching = true
function fetchOrClearCats (e) {
  if (fetching) {
    fetchCats(e)
  } else {
    catsList.textContent = ''
  }
  fetching = !fetching
}

async function fetchCats () {

  await fetch('http://localhost:3000/cats')
    .then(resp => resp.json())
    .then(cats => cats.map(cat => showAllCats(cat)))
    .catch(e => console.log(e))
}

function showAllCats (cat) {
  const li = document.createElement('li')
  li.textContent = cat.name
  catsList.appendChild(li)

  const updateButton = document.createElement('button')
  li.appendChild(updateButton)
  updateButton.textContent = 'Update'
  const input = document.createElement('input')

  updateButton.addEventListener('click', e => {
    toggleUpdateCat(cat.id, e, li, input)
  })

  const deletebutton = document.createElement('button')
  li.appendChild(deletebutton)
  deletebutton.textContent = 'Delete'
  deletebutton.addEventListener('click', e => deleteCat(e, cat.id, cat.name))
}

const deleteCat = async (e, id, name) => {
  e.stopPropagation()

  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const response = await fetch(`http://localhost:3000/cats/${id}`, options)

  if (response.ok) {
    alert(`${name} has been deleted successfully`)
  }
}

const toggleUpdateCat = (id, e, li, input) => {
  if (li.contains(input)) {
    li.removeChild(input)
  } else {
    updateCat(id, e, li, input)
  }

  toggleUpdate = !toggleUpdate
}

const updateCat = async (id, event, li, input) => {
  event.stopPropagation()
  event.preventDefault()
  li.appendChild(input)
  input.addEventListener('keyup', event => updateInput(event, id))
}

const updateInput = async (e, id) => {
  let value = e.target.value
  if (e.key === 'Enter') {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: value
      })
    }

    const response = await fetch(`http://localhost:3000/cats/${id}`, options)

    if (response.status == 200) {
      alert('Cat has been updated')
    }
  }
}

async function createCat (e) {
  e.preventDefault()

  const form = new FormData(e.target)
  let name = form.get('name')
  let type = form.get('type')
  let description = form.get('description')
  let habitat = form.get('habitat')

  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      type: type,
      description: description,
      habitat: habitat
    })
  }

  const response = await fetch('http://localhost:3000/cats', options)

  if (response.status == 201) {
    alert('New cat has been created')
  } else {
    console.log(error)
    alert('ERROR CREATING CAT')
  }
}

module.exports = { fetchOrClearCats, createCat, fetchCats, showAllCats }

},{}],2:[function(require,module,exports){
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


},{"./homepage":1,"./login":3}],3:[function(require,module,exports){


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
},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzdGF0aWMvanMvaG9tZXBhZ2UuanMiLCJzdGF0aWMvanMvaW5kZXguanMiLCJzdGF0aWMvanMvbG9naW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc3QgY2F0c0xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWxsLWNhdHMnKVxyXG5cclxubGV0IHRvZ2dsZVVwZGF0ZSA9IHRydWVcclxuXHJcbmxldCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpXHJcblxyXG5pZiAoIXRva2VuICYmIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PT0gJy9ob21lcGFnZS5odG1sJykge1xyXG4gIHdpbmRvdy5sb2NhdGlvbi5hc3NpZ24oJ2xvZ2luLmh0bWwnKVxyXG59XHJcblxyXG5sZXQgZmV0Y2hpbmcgPSB0cnVlXHJcbmZ1bmN0aW9uIGZldGNoT3JDbGVhckNhdHMgKGUpIHtcclxuICBpZiAoZmV0Y2hpbmcpIHtcclxuICAgIGZldGNoQ2F0cyhlKVxyXG4gIH0gZWxzZSB7XHJcbiAgICBjYXRzTGlzdC50ZXh0Q29udGVudCA9ICcnXHJcbiAgfVxyXG4gIGZldGNoaW5nID0gIWZldGNoaW5nXHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGZldGNoQ2F0cyAoKSB7XHJcblxyXG4gIGF3YWl0IGZldGNoKCdodHRwOi8vbG9jYWxob3N0OjMwMDAvY2F0cycpXHJcbiAgICAudGhlbihyZXNwID0+IHJlc3AuanNvbigpKVxyXG4gICAgLnRoZW4oY2F0cyA9PiBjYXRzLm1hcChjYXQgPT4gc2hvd0FsbENhdHMoY2F0KSkpXHJcbiAgICAuY2F0Y2goZSA9PiBjb25zb2xlLmxvZyhlKSlcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd0FsbENhdHMgKGNhdCkge1xyXG4gIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxyXG4gIGxpLnRleHRDb250ZW50ID0gY2F0Lm5hbWVcclxuICBjYXRzTGlzdC5hcHBlbmRDaGlsZChsaSlcclxuXHJcbiAgY29uc3QgdXBkYXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcclxuICBsaS5hcHBlbmRDaGlsZCh1cGRhdGVCdXR0b24pXHJcbiAgdXBkYXRlQnV0dG9uLnRleHRDb250ZW50ID0gJ1VwZGF0ZSdcclxuICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcclxuXHJcbiAgdXBkYXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XHJcbiAgICB0b2dnbGVVcGRhdGVDYXQoY2F0LmlkLCBlLCBsaSwgaW5wdXQpXHJcbiAgfSlcclxuXHJcbiAgY29uc3QgZGVsZXRlYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJylcclxuICBsaS5hcHBlbmRDaGlsZChkZWxldGVidXR0b24pXHJcbiAgZGVsZXRlYnV0dG9uLnRleHRDb250ZW50ID0gJ0RlbGV0ZSdcclxuICBkZWxldGVidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IGRlbGV0ZUNhdChlLCBjYXQuaWQsIGNhdC5uYW1lKSlcclxufVxyXG5cclxuY29uc3QgZGVsZXRlQ2F0ID0gYXN5bmMgKGUsIGlkLCBuYW1lKSA9PiB7XHJcbiAgZS5zdG9wUHJvcGFnYXRpb24oKVxyXG5cclxuICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgbWV0aG9kOiAnREVMRVRFJyxcclxuICAgIGhlYWRlcnM6IHtcclxuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgfVxyXG4gIH1cclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjMwMDAvY2F0cy8ke2lkfWAsIG9wdGlvbnMpXHJcblxyXG4gIGlmIChyZXNwb25zZS5vaykge1xyXG4gICAgYWxlcnQoYCR7bmFtZX0gaGFzIGJlZW4gZGVsZXRlZCBzdWNjZXNzZnVsbHlgKVxyXG4gIH1cclxufVxyXG5cclxuY29uc3QgdG9nZ2xlVXBkYXRlQ2F0ID0gKGlkLCBlLCBsaSwgaW5wdXQpID0+IHtcclxuICBpZiAobGkuY29udGFpbnMoaW5wdXQpKSB7XHJcbiAgICBsaS5yZW1vdmVDaGlsZChpbnB1dClcclxuICB9IGVsc2Uge1xyXG4gICAgdXBkYXRlQ2F0KGlkLCBlLCBsaSwgaW5wdXQpXHJcbiAgfVxyXG5cclxuICB0b2dnbGVVcGRhdGUgPSAhdG9nZ2xlVXBkYXRlXHJcbn1cclxuXHJcbmNvbnN0IHVwZGF0ZUNhdCA9IGFzeW5jIChpZCwgZXZlbnQsIGxpLCBpbnB1dCkgPT4ge1xyXG4gIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKVxyXG4gIGxpLmFwcGVuZENoaWxkKGlucHV0KVxyXG4gIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZXZlbnQgPT4gdXBkYXRlSW5wdXQoZXZlbnQsIGlkKSlcclxufVxyXG5cclxuY29uc3QgdXBkYXRlSW5wdXQgPSBhc3luYyAoZSwgaWQpID0+IHtcclxuICBsZXQgdmFsdWUgPSBlLnRhcmdldC52YWx1ZVxyXG4gIGlmIChlLmtleSA9PT0gJ0VudGVyJykge1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgbWV0aG9kOiAnUEFUQ0gnLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xyXG4gICAgICB9LFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgbmFtZTogdmFsdWVcclxuICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjMwMDAvY2F0cy8ke2lkfWAsIG9wdGlvbnMpXHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSAyMDApIHtcclxuICAgICAgYWxlcnQoJ0NhdCBoYXMgYmVlbiB1cGRhdGVkJylcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUNhdCAoZSkge1xyXG4gIGUucHJldmVudERlZmF1bHQoKVxyXG5cclxuICBjb25zdCBmb3JtID0gbmV3IEZvcm1EYXRhKGUudGFyZ2V0KVxyXG4gIGxldCBuYW1lID0gZm9ybS5nZXQoJ25hbWUnKVxyXG4gIGxldCB0eXBlID0gZm9ybS5nZXQoJ3R5cGUnKVxyXG4gIGxldCBkZXNjcmlwdGlvbiA9IGZvcm0uZ2V0KCdkZXNjcmlwdGlvbicpXHJcbiAgbGV0IGhhYml0YXQgPSBmb3JtLmdldCgnaGFiaXRhdCcpXHJcblxyXG4gIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgIGhlYWRlcnM6IHtcclxuICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgIH0sXHJcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgIHR5cGU6IHR5cGUsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbixcclxuICAgICAgaGFiaXRhdDogaGFiaXRhdFxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9jYXRzJywgb3B0aW9ucylcclxuXHJcbiAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSAyMDEpIHtcclxuICAgIGFsZXJ0KCdOZXcgY2F0IGhhcyBiZWVuIGNyZWF0ZWQnKVxyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgIGFsZXJ0KCdFUlJPUiBDUkVBVElORyBDQVQnKVxyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7IGZldGNoT3JDbGVhckNhdHMsIGNyZWF0ZUNhdCwgZmV0Y2hDYXRzLCBzaG93QWxsQ2F0cyB9XHJcbiIsImNvbnN0IGxvZ2luID0gcmVxdWlyZSgnLi9sb2dpbicpXHJcbmNvbnN0IGhvbWVwYWdlID0gcmVxdWlyZSgnLi9ob21lcGFnZScpXHJcblxyXG5jb25zdCBsb2dvdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9nb3V0JylcclxuY29uc3QgbG9naW5Gb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvZ2luLWZvcm0nKTsgXHJcblxyXG5jb25zdCBjYXRGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhdC1mb3JtJylcclxuY29uc3Qgc2hvd0NhdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hvdy1jYXRzJylcclxuXHJcblxyXG5cclxuXHJcbmlmIChsb2dvdXQpIHtcclxuICBsb2dvdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZygnbG9nb3V0IGNsaWNrZWQnKVxyXG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3Rva2VuJylcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5hc3NpZ24oJ2xvZ2luLmh0bWwnKVxyXG4gIH0pXHJcbn1cclxuXHJcbmlmIChsb2dpbkZvcm0pIHtcclxuICAgIGxvZ2luRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBsb2dpbi5sb2dpbilcclxufVxyXG5cclxuXHJcbmlmIChzaG93Q2F0cykge1xyXG4gICAgc2hvd0NhdHMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBob21lcGFnZS5mZXRjaE9yQ2xlYXJDYXRzKVxyXG59XHJcblxyXG5pZiAoY2F0Rm9ybSkge1xyXG4gICAgY2F0Rm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBob21lcGFnZS5jcmVhdGVDYXQpXHJcbn1cclxuXHJcbiIsIlxyXG5cclxuYXN5bmMgZnVuY3Rpb24gbG9naW4oZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpOyBcclxuXHJcbiAgICBjb25zdCBmb3JtID0gbmV3IEZvcm1EYXRhKGUudGFyZ2V0KVxyXG4gICAgICAgIGxldCB1c2VybmFtZSA9IGZvcm0uZ2V0KCd1c2VybmFtZScpXHJcbiAgICBsZXQgcGFzc3dvcmQgPSBmb3JtLmdldCgncGFzc3dvcmQnKVxyXG4gICAgY29uc29sZS5sb2coYHVzZXJuYW1lOiAke3VzZXJuYW1lfSwgcGFzc3dvcmQ6ICR7cGFzc3dvcmR9YClcclxuXHJcblxyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgdXNlcm5hbWU6IHVzZXJuYW1lLFxyXG4gICAgICAgICAgICBwYXNzd29yZDogcGFzc3dvcmRcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjMwMDAvdXNlcnMvbG9naW5cIiwgb3B0aW9ucyk7XHJcbiAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuXHJcbiAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSAyMDApIHtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidG9rZW5cIiwgZGF0YS50b2tlbilcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5hc3NpZ24oJ2hvbWVwYWdlLmh0bWwnKVxyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydChkYXRhLmVycm9yKTtcclxuICB9XHJcbn1cclxuIFxyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge2xvZ2lufSJdfQ==

const formEl = document.querySelector("#loginForm")
const apiUrl = "https://reqres.in/"
const usersListEl = document.querySelector(".usersList")
const userInfoContainer = document.querySelector(".userInfoContainer")

formEl.addEventListener("submit", event => {
  event.preventDefault()
  console.log("tests")

  //skicka iväg
  fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: formEl["email"].value,
      password: formEl["password"].value
    })
  })
    .then(res => res.json())
    .then(jsonData => {
      if (jsonData.error) {
        const errMessage = document.querySelector("#loginErrorMessage")
        errMessage.innerText = jsonData.error
        errMessage.innerText.classList.remove("hide")
      } else {
        const showUsersButtonEl = document.querySelector(".showUsersButton")
        showUsersButtonEl.classList.remove("hide")
      }
      console.log(jsonData)
    })
})

const showUsersButtonEl = document.querySelector("button")

showUsersButtonEl.addEventListener("click", e => {
  fetch(apiUrl + "api/users/")
    .then(res => res.json())
    .then(data => {
      const users = data.data
      const usersList = users
        .map(user => {
          console.log(user)
          return `<li class="user" data-userid= ${user.id}>${user.first_name}</li>`
        })
        .join("")
      usersListEl.innerHTML = usersList
    })
})

usersListEl.addEventListener("click", e => {
  console.log(e.target.dataset.daniel)
  const userId = e.target.dataset.userid
  //fetch single user
  console.log(`${apiUrl}api/users/${userId}`)
  fetch(`${apiUrl}api/users/${userId}`)
    .then(res => res.json())
    .then(user => {
      console.log(user)
      userInfoContainer.innerHTML = ""
      //fetch the user name
      const name = document.createElement("p")
      name.innerText = user.data.first_name + " " + user.data.last_name

      //fetch the user image
      const img = document.createElement("img")
      img.src = user.data.avatar

      //fetch the user email
      const email = document.createElement("p")
      email.innerText = user.data.email
      userInfoContainer.append(name, img, email)
    })
})

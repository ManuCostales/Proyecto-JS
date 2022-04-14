// FUNCION CONSTRUCTORA DE CLASE DE OBJETO "USER" /USUARIOS:

class User {
  constructor(id, firstName, lastName, nickname, email, phone, password, projects) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.nickname = nickname
    this.email = email
    this.phone = phone
    this.password = password
    this.projects = projects
  }
  info() {
    //
    return `<br>
        Nickname: ${this.nickname}<br>
        Usuario: ${this.firstName} ${this.lastName}.<br>
        Email: ${this.email}<br>
        Telefono: ${this.phone}`
    //
  }
}

function oldestUser() {
  //
  let userIdList = userList.map((a) => a.id)
  let minId = Math.min(...userIdList)
  console.log(...userIdList)
  console.log(minId)
  return userList.find((user) => (user.id = minId))

  //
}

function newestUser() {
  //

  let userIdList = userList.map((a) => a.id)
  let maxId = Math.max(...userIdList)
  console.log(...userIdList)
  console.log(maxId)
  return userList.find((user) => (user.id = maxId))

  //
}

let userList = []

let userId
let userName
let userLastName
let userNickName
let userEmail
let userPhone
let userPassword

let USER_CURRENT

console.log(userList)



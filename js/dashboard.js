

// LOAD USER DATA:

function cargarDatosUsuarios() {

    USER_CURRENT = JSON.parse(localStorage.getItem("Usuario activo"));
    console.log(USER_CURRENT);

    userList = JSON.parse(localStorage.getItem("Lista de Usuarios"));
    console.log(userList);

}

cargarDatosUsuarios();

// SHOW CURRENT USER:

navCurrentUser = document.querySelector("#nav-current-user");

usernick = USER_CURRENT.nickname;

navCurrentUser.innerHTML = usernick;
console.log(usernick);

// LOG OFF BUTTON

function desloguear() {

    const logOff = document.querySelector("#log-off");

    logOff.addEventListener("click", ()=>{

        localStorage.removeItem("Usuario activo");

        location.href= "./user_login.html";

    })

}

desloguear();


function cargarDatosProjectos() {

    
    projectList = JSON.parse(localStorage.getItem("Lista de Proyectos"));
    console.log(projectList);

}

cargarDatosProjectos();


// SHOW PROJECTS

function mostrarProyectos() {

    projectsDashboard = document.querySelector("#projectsDashboard");

    console.log(projectsDashboard);

}
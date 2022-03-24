

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

    projectsDashboard.innerHTML = `<div class="table__header">
        
                <div class="cell">TEAM</div>
                <div class="cell team__project--title">PROJECT</div>
                <div class="cell team__members--title">MEMBERS</div>
                <div class="cell"></div>
                <div class="cell"></div>

            </div>`;

    projectList.forEach(project =>{

        projectsDashboard.innerHTML += `
                    <div class="row">
        
                        <div class="cell project__title" data-title="project">${project.title}</div>
                        <div class="cell project__host" data-title="host">${project.host}</div>
                        <div class="cell project__creator" data-title="creator">${project.creator}</div>
                        <div class="cell project__date" data-title="date">.</div>
                        <div class="cell" data-title="notifications"><button class="btnNoti">2</button></div>
                        <div class="cell" data-title="view"><button class="btnView">View</button></div>
        
                    </div>`

    })

}

mostrarProyectos();
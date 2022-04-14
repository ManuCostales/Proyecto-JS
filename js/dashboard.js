// CARGA DE DATOS 📚
cargarDatosProyectos();

cargarDatosUsuarios();

// SHOW CURRENT USER:

navCurrentUser = document.querySelector("#nav-current-user");

usernick = USER_CURRENT.nickname;

navCurrentUser.innerHTML = usernick;

// LOG OFF BUTTON

function desloguear() {

    const logOff = document.querySelector("#log-off");

    logOff.addEventListener("click", ()=>{

        localStorage.removeItem("Usuario activo");

        location.href= "./user_login.html";

    })

}

desloguear();

// SHOW PROJECTS

function mostrarProyectos() {

    projectsDashboard = document.querySelector("#projectsDashboard");

    projectsDashboard.innerHTML = `<div class="table__header">
        
                                        <div class="cell">PROJECT</div>
                                        <div class="cell project__host--title">HOST</div>
                                        <div class="cell project__creator--title">CREATOR</div>
                                        <div class="cell project__date--title">DATE</div>
                                        <div class="cell"></div>
                                        <div class="cell"></div>

                                    </div>`;

    USER_CURRENT.projects.forEach(project =>{

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

    const showActiveProjects = document.querySelector("#dashboard-projects-active")
    showActiveProjects.innerText = `ACTIVE PROJECTS: ${USER_CURRENT.projects.length}`

}

mostrarProyectos();


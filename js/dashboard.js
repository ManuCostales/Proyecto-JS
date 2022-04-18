// CARGA DE DATOS 📚
cargarDatosProyectos();

cargarDatosEquipos();

cargarDatosUsuarios();



// SHOW CURRENT USER:

navCurrentUser = document.querySelector("#nav-current-user");

usernick = USER_CURRENT.nickname;

navCurrentUser.innerHTML = usernick;

console.log(USER_CURRENT.projects)
console.log(USER_CURRENT.teams)

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

function mostrarEquipos() {

    teamsDashboard = document.querySelector("#teamsDashboard");

    teamsDashboard.innerHTML = `<div class="table__header">
        
                                        <div class="team__title">TEAM</div>
                                        <div class="team__project">PROJECT</div>
                                        <div class="team__members">MEMBERS</div>
                                        <div class="team__notif"></div>
                                        <div class="team__view"></div>

                                    </div>`;

    USER_CURRENT.teams.forEach(team =>{

        const foundProject = projectList.find(project => project.id == team.project)

        teamsDashboard.innerHTML += `
                                    <div class="row">
                                    
                                    <div class="team__title" data-title="team">${team.name}</div>
                                    <div class="team__project team__project--vis" data-title="team_project">${foundProject.title}</div>
                                    <div class="team__members" data-title="members">${team.members.length}</div>
                                    <div class="team__notif" data-title="notifications"><button class="btnNoti">2</button></div>
                                    <div class="team__view" data-title="view"><button class="btnView">View</button></div>

                                    </div>`

    })

    const showActiveTeams = document.querySelector("#dashboard-teams-active")
    showActiveTeams.innerText = `ACTIVE TEAMS: ${USER_CURRENT.teams.length}`

}

mostrarEquipos();


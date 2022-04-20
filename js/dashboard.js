// DATA LOAD 📚

cargarDatosProyectos();

cargarDatosEquipos();

cargarDatosUsuarios();

cargarDatosIssues();

sendToLogin()

// SHOW CURRENT USER:
console.log(USER_CURRENT)

navCurrentUser = document.querySelector("#nav-current-user");

usernick = USER_CURRENT.nickname;

navCurrentUser.innerHTML = usernick;

console.log(USER_CURRENT.projects)
console.log(USER_CURRENT.teams)

Toastify({
    text: "The Dashboard shows all the information related to the user",
    duration: 5000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00D0DD, #8D83FF)",
    },
    onClick: function(){} // Callback after click
  }).showToast();

// LOG OFF BUTTON

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

    console.log(USER_CURRENT.projects)

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


    console.log(USER_CURRENT.teams)

    USER_CURRENT.teams.forEach(team =>{

        console.log(team)

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

function mostrarTareas() {

    issuesDashboard = document.querySelector("#issuesDashboard");

    const projectsUser = USER_CURRENT.projects
    let issuesFullList = []
    projectsUser.forEach(project => {
        issuesFullList.push(...project.issues)
    })
    console.log(issuesFullList)
    
    if(issuesFullList == []|| issuesFullList == false){
        issuesDashboard.innerHTML = ``
    }
    else {

        issuesDashboard.innerHTML = `<div class="table__header">
                                    <div class="cell">ID</div>
                                    <div class="cell">TITLE</div>
                                    <div class="cell">TYPE</div>
                                    <div class="cell">PRIORITY</div>
                                    <div class="cell">AUTHOR</div>
                                    <div class="cell">PROJECT</div>
                                    <div class="cell">TEAM</div>
                                    <div class="cell">LAST ENTRY</div>
                                    <div class="cell"></div>
                                    <div class="cell"></div>
                                </div>`;


        issuesFullList.forEach(issue =>{

            console.log(issue.author)
            const foundProject = projectList.find(project => project.id == issue.project)
            let foundTeam = teamList.find(team => team.id == issue.team)
            const foundUser = userList.find(user =>user.id == issue.author)
            if(foundTeam == undefined){
                foundTeam = {
                    name: "None"
                }
            }
            console.log(foundUser)

            issuesDashboard.innerHTML += `
                                        <div class="row">
                                            
                                        <div class="cell issue__id" data-title="issue-id">${issue.id}</div>
                                        <div class="cell issue__title" data-title="issue-title">${issue.title}</div>
                                        <div class="cell issue__type" data-title="issue-type">${issue.type}</div>
                                        <div class="cell issue__priority" data-title="issue-priority">${issue.priority}</div>
                                        <div class="cell issue__author" data-title="issue-author">${foundUser.firstName} ${foundUser.lastName}</div>
                                        <div class="cell issue__project" data-title="issue-project">${foundProject.title}</div>
                                        <div class="cell issue__team" data-title="issue-team">${foundTeam.name}</div>
                                        <div class="cell issue__lastEntry" data-title="last-entry">Yesterday</div>
                                        <div class="cell" data-title="notifications"><button class="btnNoti">2</button></div>
                                        <div class="cell" data-title="view"><button class="btnView">View</button></div>

                                        </div>`

        })
    }
    
    const showActiveIssues = document.querySelector("#active-issues")
    showActiveIssues.innerText = `ACTIVE ISSUES: ${USER_CURRENT.issues.length}`

    
}
mostrarTareas();


// DATA LOAD 📚

cargarDatosProyectos();

cargarDatosEquipos();

cargarDatosUsuarios();

cargarDatosIssues();

desloguear();

sendToLogin()

Toastify({
    text: "Teams allow you to gather a smaller group of people inside a project, to work on certain tasks",
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

const teamCardList = document.querySelector("#team-card-list");
const teamsTable = document.querySelector("#teams-table")

console.log(USER_CURRENT)

function addTeamCards(){

    teamCardList.innerHTML = ""
    
    USER_CURRENT.teams.forEach(team => {

        const foundProject = projectList.find(project => project.id == team.project)
        console.log(foundProject)

        let cardDiv = document.createElement("div")
        cardDiv.className = "team__card"
        cardDiv.id = `team-card-${team.id}`
        cardDiv.innerHTML = ` <div class="team__card--header">
                                <div class="team__card--header--info">
                                    <img src="./img/board_team_title.svg" alt="team Icon">
                                    <p>${team.id}</p>
                                </div>
                                <h3 class="team__card--header--title">${team.name}</h3>
                                <div class="team__card--header--notif">2</div>
                            </div>

                            <div class="separator__big--bluePurple-2"></div>

                            <div class="team__card--body">
                                <div class="card--body--header">
                                    <p>PROJECT</p>
                                    <h6>${foundProject.title}</h6>
                                </div>
                                <div class="card--body--desc">
                                    <p>${team.descr}</p>
                                </div>
                            </div>

                            <div class="separator__small--bluePurple"></div>

                            <div class="team__card--footer">
                                <button class="team__card--btn" id="open-card-team-${team.id}">Open</button>
                            </div>`

        teamCardList.append(cardDiv)

    })
}
addTeamCards()



function addTeamNewCard(){
    let newTeamCard = document.createElement("div")
    newTeamCard.className = "team__card--new"
    newTeamCard.innerHTML = `<div class="team__card--new--div">
                                    <h5>ADD</h5>
                                    <img src="./img/plus.svg" alt="Add Project">
                                    <img src="./img/project_big.svg" alt="Project Icon Big">
                                    <h6>New Team</h6>
                                </div>`
    teamCardList.append(newTeamCard)
    newTeamCard.addEventListener("click", () => location.href = "./new_team.html")
}
addTeamNewCard()



function addTeamRow(){

    teamsTable.innerHTML = ``

    let tableHeader = document.createElement("div")
    tableHeader.className = "list__board--table--header"
    tableHeader.innerHTML = `<div class="project__id">ID</div>
                            <div class="team__name">NAME</div>
                            <div class="team__project">PROJECT</div>
                            <div class="team__lead">LEAD</div>
                            <div class="project__description">DESCRIPTION</div>
                            <div class="project__notif"></div>
                            <div class="project__view"></div>`
    teamsTable.append(tableHeader)

    USER_CURRENT.teams.forEach(team => {

        const foundProject = projectList.find(project => project.id == team.project)

        let teamRow = document.createElement("div")
        teamRow.id = `teamRow-${team.id}`
        teamRow.className = "list__board--row"
        teamRow.innerHTML = `<div class="project__id project__id--vis" data-title="project-id">${team.id}</div>
                            <div class="team__name team__name--vis" data-title="issue-title">${team.name}</div>
                            <div class="team__project team__project--vis" data-title="project-host">${foundProject.title}</div>
                            <div class="team__lead team__lead--vis" data-title="project-creator">${team.lead.firstName} ${team.lead.lastName}</div>
                            <div class="project__description project__description--vis" data-title="project-description">${team.descr}</div>
                            <div class="project__notif" data-title="notifications"><button class="btnNoti">2</button></div>
                            <div class="project__view" data-title="view"><button id="open-team-${team.id}"class="btnView">Open</button></div>`

        teamsTable.append(teamRow)
    })
}
addTeamRow()



function addOrDeleteProject(){

    console.log("hey")

    const newProjectBtn = document.querySelector("#new-project-btn")
    newProjectBtn.onclick = () => location.href = "./new_project.html"

    const deleteProjectBtn = document.querySelector("#delete-project-btn")
    deleteProjectBtn.onclick = () => {
        let active = projectsTable.querySelectorAll(".active")
        if(active.length === 0){
            console.log(active)
            console.log("WTF")
            return
        }
        else {
            console.log(active)
            console.log("hey")
            deleteProjectBtn.onclick = () => {
                
            }
        }
    }
}



function showTeamPreview(){

    const active = (row) => row.classList.add("active")
    const inactive = (row) => row.classList.remove("active")
    let rows = []
    let row
    let selectedTeam

    document.addEventListener("click", function (e){
        if (e.target.classList.contains("list__board--row")|| e.target.closest('.list__board--row') !== null){
            if (e.target.className == "list__board--row"){
                rows.push(e.target)
                rows.forEach(row => inactive(row))
                row = rows[rows.length - 1]
                active(row)
                selectedTeam = e.target
            }
            else {
                rows.push(e.target.closest('.list__board--row'))
                rows.forEach(row => inactive(row))
                row = rows[rows.length - 1]
                active(row)
                selectedTeam = e.target.parentNode
            }
        
        }
        else {
            rows.forEach(row => inactive(row))
            rows = []
        }

        function addTeamPreview(){
            let teamId
            let foundTeam
            try {
                teamId = selectedTeam.id.match(/\d+/g)
                foundTeam = teamList.find(team => team.id == teamId)
                const foundProject = projectList.find(project => project.id == foundTeam.project)

                const previewNode = document.querySelector('#project-preview')
                previewNode.classList.remove("list__board--inactive")
                previewNode.innerHTML = `<div class="list__board--preview--header">
                                            <h5>PREVIEW</h5>
                                        </div>
                                        <div class="separator__big--purpleOrange-2"></div>
                                        <div class="list__board--preview--info">
                                            <div class="list__board--preview--one">
                                                <div class="list__preview--one--title">
                                                    <p class="list__preview--one--title--id">${foundTeam.id}</p>
                                                    <h4>${foundTeam.name}</h4>
                                                    <p class="list__preview--one--title--host">${foundProject.title}</p>
                                                </div>
                                                <div class="list__preview--one--descr">
                                                    <p>${foundTeam.descr}</p>
                                                </div>
                                            </div>
                                            <div class="list__board--preview--two">
                                                <p>LEAD: ${foundTeam.lead.firstName} ${foundTeam.lead.lastName}</p>
                                                <p>ASSIGNED MEMBERS: ${foundTeam.members.length}</p>
                                                <p>ACTIVE TEAMS: </p>
                                                <p>ACTIVE ISSUES: </p>
                                                <p>SOLVED ISSUES: </p>
                                                <p>REPOSITORIES: ${foundTeam.repos.length}</p>
                                            </div>
                                            <div class="list__board--preview--three">
                                                <div class="list__preview--three--data">
                                                </div>
                                                <div class="list__preview--three--more">
                                                    <div class="list__preview--three--notif">
                                                        <p>Notifications:</p>
                                                        <div>2</div>
                                                    </div>
                                                    <button class="project__preview--btn" id="preview-btn-${foundTeam.id}">See Full Info</button>
                                                </div>
                                            </div>
                                        </div> 

                                        <div class="separator__small--purpleOrange-2"></div>

                                        <div class="list__board--footer">
                                            <p>ACTIVE ISSUES: 6</p>
                                        </div>`
            } catch (error) {
                
            }
            
            
            
        }

        addTeamPreview()

    })
}
showTeamPreview()


function openTeamModal(){
    document.addEventListener("click", function(e){
        if (e.target.closest('.project__card--btn') !== null || e.target.closest('.btnView') !== null || e.target.closest('.project__preview--btn') !== null || e.target.closest('.team__card--btn') !== null){
            let targetId = e.target.id
            let numberId = targetId.match(/\d+/g)

            let foundTeams = []
            teamList.forEach(team => {

                isUserOnTeam = team.members.find(member => member.id == USER_CURRENT.id)
                if (isUserOnTeam == ""|| isUserOnTeam == false){
                    return
                }
                else{
                    foundTeams.push(team)  
                }
            })
            foundTeam = foundTeams.filter(team => team.id == numberId)

            localStorage.setItem("Equipo Activo", JSON.stringify(...foundTeam))

            location.href= "./modal__team.html";
            console.log(foundTeam)
            
            // openPreview(foundProject)
        }
    })
}
openTeamModal()

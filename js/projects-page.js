// DATA LOAD 📚

cargarDatosProyectos();

cargarDatosUsuarios();

cargarDatosEquipos();

cargarDatosIssues();

desloguear();

sendToLogin()

Toastify({
    text: "Projects Allow you to get a list of people working together on different issues",
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

const projectCardList = document.querySelector("#project-card-list");
const projectsTable = document.querySelector("#projects-table")

console.log(USER_CURRENT)

function addProjectCards(){

    projectCardList.innerHTML = ""
    
    USER_CURRENT.projects.forEach(project => {

        let cardDiv = document.createElement("div")
        cardDiv.className = "project__card"
        cardDiv.id = `dproject-card-${project.id}`
        cardDiv.innerHTML = `<div class="project__card--header">
                                <div class="project__card--header--info">
                                    <img src="./img/board_project_title.svg" alt="Project Icon">
                                    <p>${project.id}</p>
                                </div>
                                <h3 class="project__card--header--title">${project.title}</h3>
                                <div class="project__card--header--notif">2</div>
                            </div>

                            <div class="separator__big--orangeYellow"></div>

                            <div class="project__card--img">
                                <img src="${project.image}" alt="Project image">
                            </div>

                            <div class="separator__small--purpleOrange"></div>

                            <div class="project__card--description">
                                <h5>${project.host}</h5>
                                <p>${project.descr}</p>
                            </div>

                            <button class="project__card--btn" id="project-card-${project.id}">Open</button>

                            <div class="project__card--footer">
                                <p>${project.creationDate.slice(0, 10)}</p>
                                <p>8 Hours</p>
                            </div>`

        projectCardList.append(cardDiv)

    })
}
addProjectCards()



function addProjectNewCard(){
    let newProjectCard = document.createElement("div")
    newProjectCard.className = "project__card--new"
    newProjectCard.innerHTML = `<div class="project__card--new--div">
                                    <h5>ADD</h5>
                                    <img src="./img/plus.svg" alt="Add Project">
                                    <img src="./img/project_big.svg" alt="Project Icon Big">
                                    <h6>New Project</h6>
                                </div>`
    projectCardList.append(newProjectCard)
    newProjectCard.addEventListener("click", () => location.href = "./new_project.html")
}
addProjectNewCard()



function addProjectRow(){

    projectsTable.innerHTML = ``

    let tableHeader = document.createElement("div")
    tableHeader.className = "list__board--table--header"
    tableHeader.innerHTML = `<div class="project__id">ID</div>
                            <div class="project__title">TITLE</div>
                            <div class="project__host">HOST</div>
                            <div class="project__creator">CREATOR</div>
                            <div class="project__description">DESCRIPTION</div>
                            <div class="project__date">CREATION</div>
                            <div class="project__lastEntry">LAST ENTRY</div>
                            <div class="project__notif"></div>
                            <div class="project__view"></div>`
    projectsTable.append(tableHeader)

    USER_CURRENT.projects.forEach(project => {

        let projectRow = document.createElement("div")
        projectRow.id = `projectRow-${project.id}`
        projectRow.className = "list__board--row"
        projectRow.innerHTML = `<div class="project__id project__id--vis" data-title="project-id">${project.id}</div>
                                <div class="project__title project__title--vis" data-title="issue-title">${project.title}</div>
                                <div class="project__host project__host--vis" data-title="project-host">${project.host}</div>
                                <div class="project__creator project__creator--vis" data-title="project-creator">${project.creator}</div>
                                <div class="project__description project__description--vis" data-title="project-description">${project.descr}</div>
                                <div class="project__date" data-title="project-project">${project.creationDate.slice(0, 10)}</div>
                                <div class="project__lastEntry" data-title="project-lastEntry">Yesterday</div>
                                <div class="project__notif" data-title="notifications"><button class="btnNoti">2</button></div>
                                <div class="project__view" data-title="view"><button class="btnView" id="project-open-${project.id}">Open</button></div>`

        projectsTable.append(projectRow)
    })

}
addProjectRow()



function addOrDeleteProject(){

    const newProjectBtn = document.querySelector("#new-project-btn")
    newProjectBtn.onclick = () => location.href = "./new_project.html"

    const deleteProjectBtn = document.querySelector("#delete-project-btn")
    deleteProjectBtn.onclick = () => {
        let active = projectsTable.querySelectorAll(".active")
        if(active.length === 0){
            console.log(active)
            return
        }
        else {
            console.log(active)
            deleteProjectBtn.onclick = () => {
                
            }
        }
    }
}

addOrDeleteProject()



function showProjectPreview(){

    const active = (row) => row.classList.add("active")
    const inactive = (row) => row.classList.remove("active")
    let rows = []
    let row
    let selectedProject

    document.addEventListener("click", function (e){
        if (e.target.classList.contains("list__board--row")|| e.target.closest('.list__board--row') !== null){
            if (e.target.className == "list__board--row"){
                rows.push(e.target)
                rows.forEach(row => inactive(row))
                row = rows[rows.length - 1]
                active(row)
                selectedProject = e.target
            }
            else {
                rows.push(e.target.closest('.list__board--row'))
                rows.forEach(row => inactive(row))
                row = rows[rows.length - 1]
                active(row)
                selectedProject = e.target.parentNode
            }
        
        }
        else {
            rows.forEach(row => inactive(row))
            rows = []
        }

        function addProjectPreview(){
            let projectId
            let foundProject
            try {
                projectId = selectedProject.id.match(/\d+/g)
                foundProject = projectList.find(project => project.id == projectId)

                const previewNode = document.querySelector('#project-preview')
                previewNode.classList.remove("list__board--inactive")
                previewNode.innerHTML = `<div class="list__board--preview--header">
                                            <h5>PREVIEW</h5>
                                        </div>
                                        <div class="separator__big--purpleOrange-2"></div>
                                        <div class="list__board--preview--info">
                                            <div class="list__board--preview--one">
                                                <div class="list__preview--one--title">
                                                    <p class="list__preview--one--title--id">${foundProject.id}</p>
                                                    <h4>${foundProject.title}</h4>
                                                    <p class="list__preview--one--title--host">${foundProject.host}</p>
                                                </div>
                                                <div class="list__preview--one--descr">
                                                    <p>${foundProject.descr}</p>
                                                </div>
                                            </div>
                                            <div class="list__board--preview--two">
                                                <p>CREATOR: ${foundProject.creator}</p>
                                                <p>ASSIGNED MEMBERS: ${foundProject.members.length}</p>
                                                <p>ACTIVE TEAMS: </p>
                                                <p>ACTIVE ISSUES: </p>
                                                <p>SOLVED ISSUES: </p>
                                                <p>REPOSITORIES: ${foundProject.repos.length}</p>
                                            </div>
                                            <div class="list__board--preview--three">
                                                <div class="list__preview--three--data">
                                                    <p>CREATION DATE: ${foundProject.creationDate.slice(0, 10)}</p>
                                                    <p>FINISH DATE: ${foundProject.endDate.slice(0, 10)}</p>
                                                    <p>ROLES CREATED: ${foundProject.roles.length}</p>
                                                </div>
                                                <div class="list__preview--three--more">
                                                    <div class="list__preview--three--notif">
                                                        <p>Notifications:</p>
                                                        <div>2</div>
                                                    </div>
                                                    <button class="project__preview--btn" id="preview-btn-${foundProject.id}">See Full Info</button>
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

        addProjectPreview()

    })
}
showProjectPreview()



function openProjectModal(){
    document.addEventListener("click", function(e){
        if (e.target.closest('.project__card--btn') !== null || e.target.closest('.btnView') !== null || e.target.closest('.project__preview--btn') !== null){
            console.log("ASD")
            let targetId = e.target.id
            let numberId = targetId.match(/\d+/g)
            let foundProject = USER_CURRENT.projects.find(project => project.id == numberId)
            openPreview(foundProject)
        }
    })
}
openProjectModal()

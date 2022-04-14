// DATA LOAD 📚

cargarDatosProyectos();

cargarDatosUsuarios();



const projectCardList = document.querySelector("#project-card-list");
const projectsTable = document.querySelector("#projects-table")

console.log(USER_CURRENT)

function addProjectCards(){

    projectCardList.innerHTML = ""
    
    USER_CURRENT.projects.forEach(project => {

        let cardDiv = document.createElement("div")
        cardDiv.className = "project__card"
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

                            <button class="project__card--btn">Open</button>

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
                                <div class="project__view" data-title="view"><button class="btnView">Open</button></div>`

        projectsTable.append(projectRow)
    })

}

addProjectRow()

function showProjectPreview(){

    const active = (row) => row.classList.add("active")
    const inactive = (row) => row.classList.remove("active")

    projectsTable.addEventListener("click", function (e){
        if (e.target.classList.contains("list__board--row")|| e.target.closest('.list__board--row') !== null){

            let isClickInsideElement = projectsTable.contains(e.target);
            if (!isClickInsideElement) {
                "FUCK YOU"
                inactive(e.target)
            }
            active(e.target)
           
        

        }
    })

    
}

showProjectPreview()

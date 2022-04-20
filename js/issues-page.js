// DATA LOAD 📚

cargarDatosProyectos();

cargarDatosUsuarios();

cargarDatosEquipos();

cargarDatosIssues();

desloguear();

sendToLogin()

Toastify({
    text: "Issues consist of tasks that the project needs realized. They can be of different types and have different priorities",
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

const issueTable = document.querySelector("#issues-table")

console.log(USER_CURRENT)

function showIssueTable(){

    const projectsUser = USER_CURRENT.projects
    let issuesFullList = []
    projectsUser.forEach(project => {
        issuesFullList.push(...project.issues)
    })

    let issuesTakenList = []
    issueList.forEach(issue =>{
        issue.users.includes(USER_CURRENT.id)?issuesTakenList.push(issue) : ""
    })

    const listIndicator = document.querySelector("#issue-list-indicator")

    function addIssueRow(){

        issueTable.innerHTML = ``

        let tableHeader = document.createElement("div")
        tableHeader.className = "list__board--table--header"
        tableHeader.innerHTML = `<div class="issues__id">ID</div>
                                <div class="issues__title">TITLE</div>
                                <div class="issues__host">TYPE</div>
                                <div class="issues__creator">PRIORITY</div>
                                <div class="issues__description">AUTHOR</div>
                                <div class="issues__date">DESCRIPTION</div>
                                <div class="issues__date">PROJECT</div>
                                <div class="issues__lastEntry">TEAM</div>
                                <div class="issues__notif"></div>
                                <div class="issues__view"></div>`
        issueTable.append(tableHeader)

        issuesFullList.forEach(issue => {

            const foundProject = projectList.find(project => project.id == issue.project)
            let foundTeam = teamList.find(team => team.id == issue.team)
            if(foundTeam == undefined){
                foundTeam = {
                    name: "None"
                }
            }
            const foundUser = userList.find(user =>user.id == issue.author)

            let issueRow = document.createElement("div")
            issueRow.id = `issueRow-${issue.id}`
            issueRow.className = "list__board--row"
            issueRow.innerHTML = `<div class="project__id project__id--vis" data-title="project-id">${issue.id}</div>
                                <div class="issues__title issues__title--vis" data-title="issue-title">${issue.title}</div>
                                <div class="issues__host issues__host--vis" data-title="project-host">${issue.type}</div>
                                <div class="issues__creator issues__creator--vis" data-title="project-creator">${issue.priority}</div>
                                <div class="issues__description issues__description--vis" data-title="project-description">${foundUser.firstName} ${foundUser.lastName}</div>
                                <div class="issues__date" data-title="project-project">${issue.descr}</div>
                                <div class="issues__date issues__lastEntry--vis" data-title="project-project">${foundProject.title}</div>
                                <div class="issues__lastEntry issues__lastEntry--vis" data-title="project-lastEntry">${foundTeam.name}</div>
                                <div class="issues__notif" data-title="notifications"><button class="btnNoti">2</button></div>
                                <div class="issues__view" id="open-issue-${issue.id}" data-title="view"><button id="open-issue-btn-${issue.id}"class="btnView">Open</button></div>`

            issueTable.append(issueRow)

            listIndicator.innerText = "FULL LIST"

        })
    }
    addIssueRow()

    const showAllIssuesBtn = document.querySelector("#issues-available")
    showAllIssuesBtn.onclick = () => addIssueRow()

    const showTakenIssuesBtn = document.querySelector("#issues-taken")
    showTakenIssuesBtn.onclick = () => addTakenIssueRow()

    function addTakenIssueRow(){
        issueTable.innerHTML = ``

        let tableHeader = document.createElement("div")
        tableHeader.className = "list__board--table--header"
        tableHeader.innerHTML = `<div class="issues__id">ID</div>
                                <div class="issues__title">TITLE</div>
                                <div class="issues__host">TYPE</div>
                                <div class="issues__creator">PRIORITY</div>
                                <div class="issues__description">AUTHOR</div>
                                <div class="issues__date">DESCRIPTION</div>
                                <div class="issues__date">PROJECT</div>
                                <div class="issues__lastEntry">TEAM</div>
                                <div class="issues__notif"></div>
                                <div class="issues__view"></div>`
        issueTable.append(tableHeader)

        issuesTakenList.forEach(issue => {

            const foundProject = projectList.find(project => project.id == issue.project)
            let foundTeam = teamList.find(team => team.id == issue.team)
            const foundUser = userList.find(user =>user.id == issue.author)
            if(foundTeam == undefined){
                foundTeam = {
                    name: "None"
                }
            }

            let issueRow = document.createElement("div")
            issueRow.id = `issueRow-${issue.id}`
            issueRow.className = "list__board--row"
            issueRow.innerHTML = `<div class="project__id project__id--vis" data-title="project-id">${issue.id}</div>
                                <div class="issues__title issues__title--vis" data-title="issue-title">${issue.title}</div>
                                <div class="issues__host issues__host--vis" data-title="project-host">${issue.type}</div>
                                <div class="issues__creator issues__creator--vis" data-title="project-creator">${issue.priority}</div>
                                <div class="issues__description issues__description--vis" data-title="project-description">${foundUser.firstName} ${foundUser.lastName}</div>
                                <div class="issues__date" data-title="project-project">${issue.descr}</div>
                                <div class="issues__date issues__lastEntry--vis" data-title="project-project">${foundProject.title}</div>
                                <div class="issues__lastEntry issues__lastEntry--vis" data-title="project-lastEntry">${foundTeam.name}</div>
                                <div class="issues__notif" data-title="notifications"><button class="btnNoti">2</button></div>
                                <div class="issues__view" id="open-issue-${issue.id}" data-title="view"><button id="open-issue-btn-${issue.id}"class="btnView">Open</button></div>`

            issueTable.append(issueRow)

            listIndicator.innerText = "TAKEN ISSUES"

        })
    }
}
showIssueTable()

function addOrDeleteProject(){

    console.log("hey")

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




function showIssuePreview(){

    const active = (row) => row.classList.add("active")
    const inactive = (row) => row.classList.remove("active")
    let rows = []
    let row
    let selectedIssue

    document.addEventListener("click", function (e){
        if (e.target.classList.contains("list__board--row")|| e.target.closest('.list__board--row') !== null){
            if (e.target.className == "list__board--row"){
                rows.push(e.target)
                rows.forEach(row => inactive(row))
                row = rows[rows.length - 1]
                active(row)
                selectedIssue = e.target
            }
            else {
                rows.push(e.target.closest('.list__board--row'))
                rows.forEach(row => inactive(row))
                row = rows[rows.length - 1]
                active(row)
                selectedIssue = e.target.parentNode
            }
        
        }
        else {
            rows.forEach(row => inactive(row))
            rows = []
        }

        function addIssuePreview(){
            let issueId
            let foundIssue
            try {
                issueId = selectedIssue.id.match(/\d+/g)
                foundIssue = issueList.find(issue => issue.id == issueId)
                const foundProject = projectList.find(project => project.id == foundIssue.project)
                let foundTeam = teamList.find(team => team.id == foundIssue.team)
                const foundUser = userList.find(user =>user.id == foundIssue.author)
                if(foundTeam == undefined){
                    foundTeam = {
                        name: "None"
                    }
                }

                const previewNode = document.querySelector('#project-preview')
                previewNode.classList.remove("list__board--inactive")
                previewNode.innerHTML = `<div class="list__board--preview--header">
                                            <h5>PREVIEW</h5>
                                        </div>
                                        <div class="separator__big--purpleOrange-2"></div>
                                        <div class="list__board--preview--info">
                                            <div class="list__board--preview--one">
                                                <div class="list__preview--one--title">
                                                    <p class="list__preview--one--title--id">${foundIssue.id}</p>
                                                    <h4>${foundIssue.title}</h4>
                                                    <p class="list__preview--one--title--host">${foundProject.title}</p>
                                                </div>
                                                <div class="list__preview--one--descr">
                                                    <p>${foundIssue.descr}</p>
                                                </div>
                                            </div>
                                            <div class="list__board--preview--two">
                                                <p>AUTHOR: ${foundUser.firstName} ${foundUser.lastName}</p>
                                                <p>ASSIGNED USERS: ${foundIssue.users.length}</p>
                                                <p>TEAM: <span class="team">${foundTeam.name}</span></p>
                                                <p>TYPE: <span class="important">${foundIssue.type}</span></p>
                                                <p>PRIORITY: <span class="important">${foundIssue.priority}</span></p>
                                            </div>
                                            <div class="list__board--preview--three">
                                                <div class="list__preview--three--data">
                                                </div>
                                                <div class="list__preview--three--more">
                                                    <div class="list__preview--three--notif">
                                                        <p>Notifications:</p>
                                                        <div>2</div>
                                                    </div>
                                                    <button class="project__preview--btn" id="preview-btn-${foundIssue.id}">See Full Info</button>
                                                </div>
                                            </div>
                                        </div> 

                                        <div class="separator__small--purpleOrange-2"></div>

                                        <div class="list__board--footer">
                                            <p>ACTIVE ISSUES: ${issueList.length}</p>
                                        </div>`
            } catch (error) {
                
            }
            
        }

        addIssuePreview()

    })
}
showIssuePreview()


function openIssueModal(){
    document.addEventListener("click", function(e){
        if (e.target.closest('.project__card--btn') !== null || e.target.closest('.btnView') !== null || e.target.closest('.project__preview--btn') !== null){
            let targetId = e.target.id
            let numberId = targetId.match(/\d+/g)

            // let foundIssues = []
            // issueList.forEach(team => {

            //     isUserOnTeam = team.members.find(member => member.id == USER_CURRENT.id)
            //     if (isUserOnTeam == ""|| isUserOnTeam == false){
            //         return
            //     }
            //     else{
            //         foundTeams.push(team)  
            //     }
            // })
            // foundTeam = foundTeams.filter(team => team.id == numberId)

            console.log(numberId)
            let foundIssue = issueList.find(issue => issue.id == numberId)
            console.log(foundIssue)

            localStorage.setItem("Issue Activo", JSON.stringify(foundIssue))

            
            location.href= "./modal__issue.html";
            console.log(foundIssue)
            
            // openPreview(foundProject)
        }
    })
}
openIssueModal()

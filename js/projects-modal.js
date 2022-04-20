// DATA LOAD 📚

cargarDatosProyectos();

cargarDatosUsuarios();

cargarDatosEquipos();

cargarDatosIssues();

// MODAL PROJECT 

function openPreview(project){

    function closeWindow(element){
        element.remove()
    }

    const modalDiv = document.createElement("div")
    modalDiv.className = "modal"
    modalDiv.innerHTML = `<div class="modal__div">

                            <div class="modal__div--header">
                                <div class="modal__title">
                                    <img src="./img/board_project_title.svg" alt="Project Icon">
                                    <h2>Project</h2>
                                </div>
                                <img class="close__modal" src="./img/close.svg" alt="Close Window">
                            </div>

                            <div class="separator__extraBig--orangeYellow"></div>

                            <div class="modal__body">

                                <div class="modal__body--one">
                                    <div class="project__modal--img">
                                        <img src="${project.image}" alt="Project Image">
                                    </div>
                                    <div class="project__modal--name">
                                        <div class="project__modal--info">
                                            <p>Project Name</p>
                                            <img src="./img/edit.svg" class="project__edit" id="edit-project-name" alt="Edit Name">
                                        </div>
                                        <h1 class="project__title">${project.title}</h1>
                                    </div>
                                    <div class="project__modal--host">
                                        <div class="project__modal--info">
                                            <p>Project Host</p>
                                            <img src="./img/edit.svg" class="project__edit" id="edit-project-host" alt="Edit Host">
                                        </div>
                                        <h4 class="project__host">${project.host}</h4>
                                    </div>
                                    <div class="project__modal--creator">
                                        <div class="project__modal--info">
                                            <p>Project Creator:</p>
                                        </div>
                                        <p>${project.creator}</p>
                                    </div>
                                    <div class="project__modal--startDate">
                                        <div class="project__modal--info">
                                            <p>Project Starting Date:</p>
                                        </div>
                                        <p>${project.creationDate.slice(0, 10)}</p>
                                    </div>
                                    <div class="project__modal--endDate">
                                        <div class="project__modal--info">
                                            <p>Project End Date</p>
                                            <img src="./img/edit.svg" class="project__edit" id="edit-project-endDate" alt="Edit End Date">
                                        </div>
                                        <p class="project__endDate">${project.endDate.slice(0, 10)}</p>
                                    </div>

                                </div>

                                <div class="modal__body--two">
                                    <div class="modal__body--two--repos">
                                        <p class="repo__title">Project Repository/s:</p>
                                        <div class="repo__list">
                                            <div class="repo__list--table" id="project-modal-repos">
                                            </div>
                                            <div class="repo__list--footer">
                                                <button id="project-modal-repo-list">View Full List - Add New Repo</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal__body--two--roles">
                                        <p class="role__title">Project Member Roles:</p>
                                        <div class="role__list">
                                            <ul id="project-modal-roles">
                                            </ul>
                                            <div class="role__list--footer">
                                                <p>Add New <span>Role</span></p>
                                                <input type="text" id="new-role-input">
                                                <button id="new-role-btn">Add</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal__body--two--descr">
                                        <div class="project__descr--title">
                                            <p>Project Description</p>
                                            <img src="./img/edit.svg" class="project__edit" id="edit-project-descr" alt="Edit Description">
                                        </div>
                                        <div class="project__descr--text">
                                            <p class="project__descr">${project.descr}</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="modal__body--three">

                                    <div class="modal__body--three--issues">
                                        <div class="project__issues--title">
                                            <p>Active Issues:</p>
                                            <p>${project.issues.length}</p>
                                        </div>
                                        <div class="project__issues">
                                            <div class="project__issues--table" id="project-modal-issues-table">
                                            </div>
                                            <div class="project__issues--footer">
                                                <button id="open-project-issues-list">Manage Issues</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="modal__body--three--teams">
                                        <div class="project__teams--title">
                                            <p>Active Teams:</p>
                                            <p>${project.teams.length}</p>
                                        </div>
                                        <div class="project__teams">
                                            <div class="project__teams--table" id="project-modal-teams-table">
                                            </div>
                                            <div class="project__teams--footer">
                                                <button id="open-project-teams-list">Manage Teams</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="modal__body--three--members">
                                        <div class="project__members--title">
                                            <p>Active Members:</p>
                                            <p>${project.members.length}</p>
                                        </div>
                                        <div class="project__members">
                                            <div class="project__members--table" id="project-modal-members-table">
                                            </div>
                                            <div class="project__members--footer">
                                                <button id="open-project-members-list">Manage Members</button>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                            <div class="separator__big--orangeYellow-2"></div>

                            <div class="modal__footer">
                                <button class="delete" id="delete-project">Delete Project <img src="./img/delete_white.svg" alt="Delete Project"></button>
                                <button class="close close__modal">Close <img src="./img/close_white.svg" alt="Close Window"></button>
                            </div>

                        </div>`

    document.body.prepend(modalDiv)

    function closeProjectModal(){

        const closeButtons = modalDiv.querySelectorAll(".close__modal")
        closeButtons.forEach(button => button.onclick = ()=> closeWindow(modalDiv))
    }
    closeProjectModal()



    function deleteProject(){
        const deleteButton = modalDiv.querySelector("#delete-project")
        if(isUserAdmin(project) != true){
            deleteButton.innerText = "Leave Project"
            deleteButton.onclick = () => {
                userToRemove = project.members.find(user => user.id == USER_CURRENT.id)
                project.members.splice(project.members.indexOf(userToRemove), 1)
                localStorage.setItem("Lista de Proyectos", JSON.stringify(projectList))
                closeWindow(modalDiv)
                window.location.reload()
            }
        }
        else {
            deleteButton.onclick = () => {
                projectToRemove = projectList.find(project => project == project)
                projectList.splice(projectList.indexOf(projectToRemove), 1)
                localStorage.setItem("Lista de Proyectos", JSON.stringify(projectList))
                closeWindow(modalDiv)
                window.location.reload()
            }
        }
    }
    deleteProject()



    function projectModalRepos(){

        const reposTable = document.querySelector("#project-modal-repos")
        console.log(project.repos)
        function createRepoList(){
            project.repos.forEach(repo => {

                const repoRow = document.createElement("div")
                repoRow.className = "repo__list--row"
                repoRow.id = `repo-row-${project.repos.length}`
                repoRow.innerHTML = `<p>${reposTable.childElementCount + 1}</p>
                                    <p id="repo-name-${project.repos.length}">${repo}</p>
                                    <a href="${repo}"><img src="./img/github.svg" alt="Github Repo Link"></a>
                                    <img class="modal__delete--repo" src="./img/addMember_delete.svg" alt="Delete Repo">`
                reposTable.append(repoRow)
            })
        }
        createRepoList()

        function removeRepo(element, classOne, classTwo){
            element.addEventListener("click", function (e) {
                if (e.target.classList.contains(classOne)|| e.target.closest(classTwo) !== null){
                    if(isUserAdmin(project) != true){
                        alert("You don´t have permission to do this")
                        return
                    }
                    else{
                        console.log(e.target)
                        let getRow = e.target.parentNode
                        let rowId = e.target.parentNode.id.match(/\d+/g)
                        let repoName = getRow.querySelector(`#repo-name-${rowId}`).innerText
                        let foundRepo = project.repos.find(repo => repo == repoName)
                        let repoToRemove = project.repos.indexOf(foundRepo)
                        console.log(repoToRemove)
                        project.repos.splice((repoToRemove), 1)
                        e.target.parentNode.remove()
                        localStorage.setItem("Lista de Proyectos", JSON.stringify(projectList))
                    }
                }
            })
        }
        removeRepo(reposTable, "modal__delete--repo", '.modal__delete--repo')

        function viewRepoList(){

            const openRepoList = document.querySelector("#project-modal-repo-list")
            openRepoList.onclick = () => {

                const repoModal = document.createElement("div")
                repoModal.className = "modalRepos"
                repoModal.innerHTML = `<div class="modalRepos__div">

                                            <div class="modal__div--header">
                                                <div class="modal__title">
                                                    <img src="./img/board_project_title.svg" alt="Project Icon">
                                                    <h2>Project</h2>
                                                </div>
                                                <img src="./img/close.svg" alt="Close Window" class="close__window">
                                            </div>

                                            <div class="separator__extraBig--orangeYellow"></div>

                                            <div class="modal__body">

                                                <div class="modal__body--title">
                                                    <h1>Project Repository/s</h1>
                                                    <h2>${project.title}</h2>
                                                </div>

                                                <div class="modal__body--list">
                                                    <div class="modal__body--list--table" id="modal-repo-table">
                                                    </div>
                                                    <div class="modal__body--list--footer">
                                                        <p>Add New <span>Repo</span></p>
                                                        <input type="text" id="new-repo-input">
                                                        <button id="new-repo-btn">Add</button>
                                                    </div>
                                                </div>
                                            
                                            </div>

                                            <div class="separator__big--orangeYellow-2"></div>

                                            <div class="modal__footer">
                                                <p>ACTIVE REPOS: ${project.repos.length}</p>
                                                <button class="close close__window">Close <img src="./img/close_white.svg" alt="Close Window"></button>
                                            </div>

                                        </div>`

                document.body.prepend(repoModal)

                function addRepoRow(repo){
                    const repoList = repoModal.querySelector("#modal-repo-table")
                    const repoRow = document.createElement("div")
                    repoRow.className = "modal__body--table--row"
                    repoRow.id = `repo-list-row-${project.repos.length}`
                    repoRow.innerHTML = `<p class="repo__number">${(project.repos.indexOf(repo))+1}</p>
                                        <a id="repo-name-${project.repos.length}" href="${repo}">${repo}</a>
                                        <a href=${repo}><img src="./img/github.svg" alt="Github Repo Link"></a>
                                        <img src="./img/addMember_delete.svg" alt="Delete Repo" class="delete__repo">`
                    repoList.append(repoRow)
                }

                removeRepo(repoModal, "delete__repo", '.delete__repo')
                
                project.repos.forEach(repo => addRepoRow(repo))

                function addNewRepo(){
                    const newRepoBtn = document.querySelector("#new-repo-btn")
                    const newRepoInput = document.querySelector("#new-repo-input")
                    
                    newRepoBtn.onclick = () => {
                        if(newRepoInput.value == ""){
                            return
                        }
                        else {
                            if (isUserAdmin(project) != true){
                                alert("you don´t have permission to do this")
                                return
                            }
                            else{
                                const newRepo = newRepoInput.value
                                project.repos.push(newRepo)
                                localStorage.setItem("Lista de Proyectos", JSON.stringify(projectList))
                                newRepoInput.value = ""
                                addRepoRow(newRepo)
                            }
                        }
                    }
                }
                addNewRepo()

                // Close window buttons:

                const closeButtons = repoModal.querySelectorAll(".close__window")
                console.log(closeButtons)
                closeButtons.forEach(button => {
                    button.addEventListener("click", ()=> {
                        closeWindow(repoModal)
                        reposTable.innerHTML = ``
                        createRepoList()
                    })
                })

            }
        }
        viewRepoList()
    }
    projectModalRepos()



    function projectModalRoles(){

        const rolesList = document.querySelector("#project-modal-roles")
        console.log(project.roles)
        project.roles.forEach(role => {
            if(role == "ADMIN"){
                return
            }
            const roleItem = document.createElement("li")
            roleItem.className = "repo__list--li"
            roleItem.id = `role-item-${project.id}`
            roleItem.innerHTML = `<p>${role}</p><img src="./img/addMember_delete.svg" class="remove__role" alt="Delete Repo">`
            rolesList.append(roleItem)
        })

        function removeRole(){
            rolesList.addEventListener("click", function(e){
                if (e.target.classList.contains("remove__role")|| e.target.closest(".remove__role") !== null){
                    if(isUserAdmin(project) != true){
                        alert("You don´t have permission to do this")
                        return
                    }
                    else {
                        let roleName = project.roles.find(role => role == e.target.previousElementSibling.innerText)
                        project.roles.splice(project.roles.indexOf(roleName), 1)
                        localStorage.setItem("Lista de Proyectos", JSON.stringify(projectList))
                        e.target.parentNode.remove()
                    }
                }
            })
        }
        removeRole()

        function addNewRoles(){

            const roleInput = document.querySelector("#new-role-input")
            const roleBtn = document.querySelector("#new-role-btn")
    
            roleBtn.addEventListener("click",()=>{
                if(roleInput.value == ""){
                    return
                }
                else if (isUserAdmin(project) != true){
                    alert("you don´t have permission to do this")
                    return
                }
                else {
                    let newRole = roleInput.value.toUpperCase()
                    project.roles.push(newRole)
                    const roleItem = document.createElement("li")
                    roleItem.className = "repo__list--li"
                    roleItem.id = `role-item-${project.id}`
                    roleItem.innerHTML = `<p>${newRole}</p><img src="./img/addMember_delete.svg" class="remove__role" alt="Delete Repo">`
                    rolesList.append(roleItem)
                    localStorage.setItem("Lista de Proyectos", JSON.stringify(projectList))
                    roleInput.value = ""
                }
            })
        }
        addNewRoles()
    }
    projectModalRoles()



    function editProjectProperties(){

        const editButtons = modalDiv.querySelectorAll(".project__edit")
        if(isUserAdmin(project) != true){
            editButtons.forEach(button => button.remove())
        }
        else{
            function cancelAndClose(div){
                const closeModal = div.querySelector(".closeModal")
                closeModal.onclick = () => closeWindow(div)
    
                const cancelModal = div.querySelector(".cancel")
                cancelModal.onclick = () => closeWindow(div)
            }
    
            function editProjectName(){
                const changeName = modalDiv.querySelector("#edit-project-name")
                changeName.onclick = () => {
    
                    const changeNameDiv = document.createElement("div")
                    changeNameDiv.className = "change__project--prop"
                    changeNameDiv.innerHTML = `<div class="changeProp__div">
                                                    <div class="changeProp__div--header">
                                                        <h5>Change Name</h5>
                                                        <img class="closeModal" src="./img/close.svg" alt="Close Window">
                                                    </div>
                                                    <div class="separator__small--orangeYellow"></div>
                                                    <div class="changeProp__div--body">
                                                        <input type="text" placeholder="Insert New Project Name" id="edit-project-new-name">
                                                    </div>
                                                    <div class="separator__small--orangeYellow-2"></div>
                                                    <div class="changeProp__div--footer">
                                                        <button class="cancel">Cancel</button>
                                                        <button class="accept">Accept</button>
                                                    </div>
                                                </div>`
                    document.body.prepend(changeNameDiv)
                    
                    cancelAndClose(changeNameDiv)
    
                    const nameInput = changeNameDiv.querySelector("#edit-project-new-name")
    
                    const acceptModal = changeNameDiv.querySelector(".accept")
                    acceptModal.addEventListener("click", function(){
                        if(nameInput.value == ""){
                            return
                        }
                        project.title = nameInput.value
                        localStorage.setItem("Lista de Proyectos", JSON.stringify(projectList))
                        changeNameDiv.remove()
                        document.querySelector(".project__title").innerHTML = `${project.title}`
                    })
                }
            }
            editProjectName()
    
            function editProjectHost(){
                const changeHost = modalDiv.querySelector("#edit-project-host")
                changeHost.onclick = () => {
    
                    const changeHostDiv = document.createElement("div")
                    changeHostDiv.className = "change__project--prop"
                    changeHostDiv.innerHTML = `<div class="changeProp__div">
                                                    <div class="changeProp__div--header">
                                                        <h5>Change Host</h5>
                                                        <img class="closeModal" src="./img/close.svg" alt="Close Window">
                                                    </div>
                                                    <div class="separator__small--orangeYellow"></div>
                                                    <div class="changeProp__div--body">
                                                        <input type="text" placeholder="Insert New Project Host" id="edit-project-new-host">
                                                    </div>
                                                    <div class="separator__small--orangeYellow-2"></div>
                                                    <div class="changeProp__div--footer">
                                                        <button class="cancel">Cancel</button>
                                                        <button class="accept">Accept</button>
                                                    </div>
                                                </div>`
                    document.body.prepend(changeHostDiv)
                    
                    cancelAndClose(changeHostDiv)
    
                    const hostInput = changeHostDiv.querySelector("#edit-project-new-host")
    
                    const acceptModal = changeHostDiv.querySelector(".accept")
                    acceptModal.addEventListener("click", function(){
                        if(hostInput.value == ""){
                            return
                        }
                        project.host = hostInput.value
                        localStorage.setItem("Lista de Proyectos", JSON.stringify(projectList))
                        changeHostDiv.remove()
                        document.querySelector(".project__host").innerHTML = `${project.host}`
                    })
                }
            }
            editProjectHost()
    
            function editProjectEndDate(){
                const changeEndDate = modalDiv.querySelector("#edit-project-endDate")
                changeEndDate.onclick = () => {
    
                    const changeEndDateDiv = document.createElement("div")
                    changeEndDateDiv.className = "change__project--prop"
                    changeEndDateDiv.innerHTML = `<div class="changeProp__div">
                                                    <div class="changeProp__div--header">
                                                        <h5>Change End Date</h5>
                                                        <img class="closeModal" src="./img/close.svg" alt="Close Window">
                                                    </div>
                                                    <div class="separator__small--orangeYellow"></div>
                                                    <div class="changeProp__div--body">
                                                        <input type="datetime-local" id="edit-project-new-endDate">
                                                    </div>
                                                    <div class="separator__small--orangeYellow-2"></div>
                                                    <div class="changeProp__div--footer">
                                                        <button class="cancel">Cancel</button>
                                                        <button class="accept">Accept</button>
                                                    </div>
                                                </div>`
                    document.body.prepend(changeEndDateDiv)
                    
                    cancelAndClose(changeEndDateDiv)
    
                    const endDateInput = changeEndDateDiv.querySelector("#edit-project-new-endDate")
    
                    const acceptModal = changeEndDateDiv.querySelector(".accept")
                    acceptModal.addEventListener("click", function(){
                        if(endDateInput.value == ""){
                            return
                        }
                        project.endDate = endDateInput.value
                        localStorage.setItem("Lista de Proyectos", JSON.stringify(projectList))
                        changeEndDateDiv.remove()
                        document.querySelector(".project__endDate").innerHTML = `${project.endDate.slice(0, 10)}`
                    })
                }
            }
            editProjectEndDate()
    
            function editProjectDescr(){
                const changeDescr = modalDiv.querySelector("#edit-project-descr")
                changeDescr.onclick = () => {
    
                    const changeDescrDiv = document.createElement("div")
                    changeDescrDiv.className = "change__project--prop"
                    changeDescrDiv.innerHTML = `<div class="changeProp__div">
                                                    <div class="changeProp__div--header">
                                                        <h5>New Description</h5>
                                                        <img class="closeModal" src="./img/close.svg" alt="Close Window">
                                                    </div>
                                                    <div class="separator__small--orangeYellow"></div>
                                                    <div class="changeProp__div--body">
                                                        <textarea placeholder="Insert New Project Description" id="edit-project-new-descr"></textarea>
                                                    </div>
                                                    <div class="separator__small--orangeYellow-2"></div>
                                                    <div class="changeProp__div--footer">
                                                        <button class="cancel">Cancel</button>
                                                        <button class="accept">Accept</button>
                                                    </div>
                                                </div>`
                    document.body.prepend(changeDescrDiv)
                    
                    cancelAndClose(changeDescrDiv)
    
                    const descrInput = changeDescrDiv.querySelector("#edit-project-new-descr")
    
                    const acceptModal = changeDescrDiv.querySelector(".accept")
                    acceptModal.addEventListener("click", function(){
                        if(descrInput.value == ""){
                            return
                        }
                        project.descr = descrInput.value
                        localStorage.setItem("Lista de Proyectos", JSON.stringify(projectList))
                        changeDescrDiv.remove()
                        document.querySelector(".project__descr").innerHTML = `${project.descr}`
                    })
                }
            }
            editProjectDescr()
        }
    }
    editProjectProperties()



    function projectModalIssues(){

        const issuesTable = document.querySelector("#project-modal-issues-table")
        function createIssuesList(){

            project.issues.forEach(issue => {

                const issueRow = document.createElement("div")
                issueRow.className = "project__issues--row"
                issueRow.id = `projectModal-issue-row-${issue.id}`
                issueRow.innerHTML = `<p class="issue__id">${issue.id}</p>
                                    <p class="issue__name">${issue.name}</p>
                                    <p class="issue__type">${issue.type}</p>
                                    <p class="issue__priority">${issue.priority}</p>
                                    <p>${issue.lastEntry}</p>
                                    <div></div>
                                    <button>View</button>`
                issuesTable.append(issueRow)
            })
        }
        createIssuesList()

        function openProjectIssueList(){

            const openList = document.querySelector("#open-project-issues-list")
            openList.onclick = () => createIssueList()

            function createIssueList(){

                const issueList = document.createElement("div")
                issueList.className = "modalIssues"
                issueList.innerHTML = `<div class="modalIssues__div">

                                            <div class="modal__div--header">
                                                <div class="modal__title">
                                                    <img src="./img/board_project_title.svg" alt="Project Icon">
                                                    <h2>Project</h2>
                                                </div>
                                                <img class="close__issues" src="./img/close.svg" alt="Close Window">
                                            </div>
                                
                                            <div class="separator__extraBig--orangeYellow"></div>
                                
                                            <div class="modal__body">
                                
                                                <div class="modal__body--title">
                                                    <h1>Project Issues</h1>
                                                    <h2>${project.title}</h2>
                                                </div>
                                
                                                <div class="project__issues">
                                                    <div class="project__issues--table">
                                                        <div class="project__issues--table--head">
                                                            <div class="project__issues--table--header">
                                                                <p class="issue__id">ID</p>
                                                                <p class="issue__name">TITLE</p>
                                                                <p class="issue__type">TYPE</p>
                                                                <p class="issue__priority">PRIORITY</p>
                                                                <p class="issue__author">AUTHOR</p>
                                                                <p class="issue__team">TEAM</p>
                                                                <p class="issue__lastEntry">LAST ENTRY</p>
                                                                <div class="issue__notif"></div>
                                                                <div class="issue__delete"></div>
                                                                <div class="issue__button"></div>
                                                            </div>
                                                            <div class="separator__big--pinkSalmon"></div>
                                                        </div>
                                                    </div>
                                                    <div class="project__issues--footer">
                                                        <button>New Issue</button>
                                                    </div>
                                                </div>
                                            
                                            </div>
                                
                                            <div class="separator__big--orangeYellow-2"></div>
                                
                                            <div class="modal__footer">
                                                <button class="delete">Delete<img src="./img/delete_white.svg" alt=""> </button>
                                                <p>ACTIVE ISSUES: ${project.issues.length}</p>
                                                <button class="close close__issues">Close <img src="./img/close_white.svg" alt="Close Window"></button>
                                            </div>
                                
                                        </div>`
                
                document.body.prepend(issueList)

                function createIssueRow(issue){
                    if(project.issues == false){
                        return
                    }

                    const issueRow = document.createElement("div")
                    issueRow.className = "project__issues--row"
                    issueRow.id = `project-issue-row-${issue.id}`
                    issueRow.innerHTML = `<p class="issue__id issue__id--vis">${issue.id}</p>
                                        <p class="issue__name issue__name--vis">${issue.name}</p>
                                        <p class="issue__type issue__type--vis">${issue.type}</p>
                                        <p class="issue__priority issue__priority--vis">${issue.priority}</p>
                                        <p class="issue__author issue__author--vis">${issue.author}</p>
                                        <p class="issue__team issue__team--vis">${issue.team}</p>
                                        <p class="issue__lastEntry">${issue.lastEntry}</p>
                                        <div class="issue__notif"></div>
                                        <img  class="issue__delete" src="./img/addMember_delete.svg" alt="Delete Issue">
                                        <button class="issue__button">View</button>`
                    issueList.append(issueRow)
                }
                createIssueRow()

                const closeButtons = issueList.querySelectorAll(".close__issues")
                closeButtons.forEach(button => button.onclick = () => closeWindow(issueList))
            }
        }
        openProjectIssueList()

    }
    projectModalIssues()



    function projectModalTeams(){

        const teamsTable = document.querySelector("#project-modal-teams-table")
        function createTableTeamList(){

            console.log(project.teams)

            teamsTable.innerHTML = ``

            project.teams.forEach(team => {

                const teamRow = document.createElement("div")
                teamRow.className = "project__teams--row"
                teamRow.id = `projectModal-team-row-${team.id}`
                teamRow.innerHTML = `<p class="team__id">${team.id}</p>
                                    <p class="team__name">${team.name}</p>
                                    <p class="team__type">${team.members.length} members</p>
                                    <p class="team__priority">${team.lead.firstName} ${team.lead.lastName}</p>
                                    <div></div>
                                    <button>View</button>`
                teamsTable.append(teamRow)
            })
        }
        createTableTeamList()

        function openProjectTeamList(){

            const openList = document.querySelector("#open-project-teams-list")
            openList.onclick = () => createTeamList()

            function createTeamList(){

                const teamTableList = document.createElement("div")
                teamTableList.className = "modalTeams"
                teamTableList.innerHTML = `<div class="modalTeams__div">

                                            <div class="modal__div--header">
                                                <div class="modal__title">
                                                    <img src="./img/board_project_title.svg" alt="Project Icon">
                                                    <h2>Project</h2>
                                                </div>
                                                <img class="close__teams" src="./img/close.svg" alt="Close Window">
                                            </div>
                                
                                            <div class="separator__extraBig--bluePurple-2"></div>
                                
                                            <div class="modal__body">
                                
                                                <div class="modal__body--title">
                                                    <h1>Project Teams</h1>
                                                    <h2>${project.title}</h2>
                                                </div>
                                
                                                <div class="project__issues">
                                                    <div class="project__issues--table" id="project-teams-table">
                                                        <div class="project__issues--table--head">
                                                            <div class="project__issues--table--header">
                                                                <p class="team__id">ID</p>
                                                                <p class="team__name">NAME</p>
                                                                <p class="team__lead">LEAD</p>
                                                                <p class="team__descr">DESCRIPTION</p>
                                                                <p class="team__members">MEMBERS</p>
                                                                <div class="team__notif"></div>
                                                                <div class="team__delete"></div>
                                                                <div class="team__button"></div>
                                                            </div>
                                                            <div class="separator__big--bluePurple-2"></div>
                                                        </div>
                                                    </div>
                                                    <div class="project__issues--footer">
                                                        <button>New Team</button>
                                                    </div>
                                                </div>
                                            
                                            </div>
                                
                                            <div class="separator__big--bluePurple-2"></div>
                                
                                            <div class="modal__footer">
                                                <button class="delete">Delete<img src="./img/delete_white.svg" alt=""> </button>
                                                <p>ACTIVE TEAMS: ${project.teams.length}</p>
                                                <button class="close close__teams">Close <img src="./img/close_white.svg" alt="Close Window"></button>
                                            </div>
                                
                                        </div>`
                
                document.body.prepend(teamTableList)

                function createTeamRow(team){
                    if(project.teams == false){
                        return
                    }
                    console.log("hey")
                    const teamRow = document.createElement("div")
                    teamRow.className = "project__issues--row"
                    teamRow.id = `project-team-row-${team.id}`
                    teamRow.innerHTML = `<p class="team__id team__id--vis">${team.id}</p>
                                        <p class="team__name team__name--vis">${team.name}</p>
                                        <p class="team__lead team__lead--vis">${team.lead.firstName} ${team.lead.lastName}</p>
                                        <p class="team__descr team__descr--vis">${team.descr}</p>
                                        <p class="team__members team__members--vis">${team.members.length}</p>
                                        <div class="team__notif"></div>
                                        <img class="team__delete" src="./img/addMember_delete.svg" alt="Delete Team">
                                        <button class="team__button">View</button>`
                    document.querySelector("#project-teams-table").append(teamRow)
                }
                console.log(project.teams)
                project.teams.forEach(team => createTeamRow(team))

                const closeButtons = teamTableList.querySelectorAll(".close__teams")
                closeButtons.forEach(button => button.onclick = () => {
                    closeWindow(teamTableList)
                    createTableTeamList()
                })

                function removeProjectTeams(){
                    const deleteTeamButtons = teamTableList.querySelectorAll(".team__delete")
                    deleteTeamButtons.forEach(button => button.onclick = ()=>{
                        const id = button.parentNode.id.match(/\d+/g)
                        foundTeam = project.teams.find(team => team.id == id)
                        project.teams.splice(project.teams.indexOf(foundTeam), 1)

                        foundInList = teamList.find(team => team.id == id)
                        teamList.splice(teamList.indexOf(foundInList), 1)

                        button.parentNode.remove()

                        localStorage.setItem("Lista de Proyectos", JSON.stringify(projectList))
                        localStorage.setItem("Lista de Equipos", JSON.stringify(teamList))
                    })
                }
                removeProjectTeams()
            }
        }
        openProjectTeamList()

    }
    projectModalTeams()



    function projectModalMembers(){

        function removeMember(button){
            if(isUserAdmin(project) != true){
                alert("You don´t have permission to do this")
                return
            }
            else{
                const matchId = button.parentNode.id.match(/\d+/g)
                const userToRemove = project.members.find(member => member.id == matchId)
                const userIndex = project.members.indexOf(userToRemove)
                project.members.splice(userIndex, 1)
                localStorage.setItem("Lista de Proyectos", JSON.stringify(projectList))
                button.parentNode.remove()
            }
        }

        const membersTable = document.querySelector("#project-modal-members-table")
        function createMemberTable(){

            membersTable.innerHTML = ``
            project.members.forEach(member => {

                const memberRow = document.createElement("div")
                memberRow.className = "project__members--row"
                memberRow.id = `projectModal-team-row-${member.id}`
                memberRow.innerHTML =   `<p class="member__id">${member.id}</p>
                                        <p class="member__nick">${member.nickname}</p>
                                        <p class="member__name">${member.firstName} ${member.lastName}</p>
                                        <p class="member__role">${member.role}</p>
                                        <div class="member__delete"><img src="./img/addMember_delete.svg" alt=""></div>
                                        <button class="member__view">View</button>`
                membersTable.append(memberRow)
                const deleteMemberBtn = membersTable.querySelectorAll(".member__delete")
                deleteMemberBtn.forEach(button => button.onclick = () => {removeMember(button)})
            })
        }
        createMemberTable()

        function openProjectMemberList(){

            const openList = document.querySelector("#open-project-members-list")
            openList.onclick = () => createMemberList()

            function createMemberList(){

                const memberList = document.createElement("div")
                memberList.className = "modalMembers"
                memberList.innerHTML = `<div class="modalMembers__div">

                                            <div class="modal__div--header">
                                                <div class="modal__title">
                                                    <img src="./img/board_project_title.svg" alt="Project Icon">
                                                    <h2>Project</h2>
                                                </div>
                                                <img src="./img/close.svg" alt="Close Window" class="close__members">
                                            </div>
                                
                                            <div class="separator__extraBig--orangeYellow"></div>
                                
                                            <div class="modal__body">
                                
                                                <div class="modal__body--admins">
                                                    <h3>PROJECT ADMINS</h3>
                                                    <div class="modal__body--admins--div">
                                                        <div class="modal__body--admins--table">
                                                        </div>
                                                    </div>
                                                </div>
                                
                                                <div class="modal__body--main">
                                                    <div class="modal__body--current">
                                                        <h3>CURRENT MEMBERS</h3>
                                                        <div class="modal__body--div">
                                                            <div class="modal__body--head">
                                                                <div class="modal__body--header">
                                                                    <div class="user__id">ID</div>
                                                                    <div class="user__img"></div>
                                                                    <div class="user__nick">NICKNAME</div>
                                                                    <div class="user__name">FULL NAME</div>
                                                                    <div class="user__email">EMAIL</div>
                                                                    <div class="user__role">ROLE</div>
                                                                    <div class="user__delete"></div>
                                                                    <div class="user__view"></div>
                                                                </div>
                                                                <div class="separator__big--purple"></div>
                                                            </div>
                                                            <div class="modal__body--table" id="current-user-table">
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="modal__body--add">
                                                        <h3>ADD MEMBERS</h3>
                                                        <div class="modal__body--div">
                                                            <div class="modal__body--mainData">
                                                                <div class="modal__body--head">
                                                                    <div class="modal__body--header">
                                                                        <div class="user__id">ID</div>
                                                                        <div class="user__img"></div>
                                                                        <div class="user__nick">NICKNAME</div>
                                                                        <div class="user__email">EMAIL</div>
                                                                        <div class="user__add"></div>
                                                                    </div>
                                                                    <div class="separator__big--purple-2"></div>
                                                                </div>
                                                                    <div class="modal__body--table" id="search-user-table">
                                                                </div>
                                                            </div>
                                                            
                                                            <div class="modal__body--add--footer">
                                                                <p>Search <span>User</span></p>
                                                                <input type="text">
                                                                <button>Search</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            
                                            </div>
                                
                                            <div class="separator__big--orangeYellow-2"></div>
                                
                                            <div class="modal__footer">
                                                <p id="show-current-members-number"></p>
                                                <button class="close close__members">Close <img src="./img/close_white.svg" alt="Close Window"></button>
                                            </div>
                                
                                        </div>`

                
                document.body.prepend(memberList)

                function projectAdmins(admin){
                    const adminUsers = project.members.filter(member => member.admin == true)
                    const adminList = memberList.querySelector(".modal__body--admins--table")
                    adminList.innerHTML = ``
                    function createAdminRow(admin){
                        if(project.members == false){
                            return
                        }
                        const adminRow = document.createElement("div")
                        adminRow.className = "admin"
                        adminRow.id = `project-admin-row-${admin.id}`
                        adminRow.innerHTML = `<p>${admin.id}</p>
                                            <p>${admin.firstName} ${admin.lastName}</p>
                                            <button>View</button>`
                        adminList.append(adminRow)
                    }
                    adminUsers.forEach(admin => createAdminRow(admin))
                }
                projectAdmins()
                

                function projectCurrentMembers(user){

                    const currentMembersList = memberList.querySelector("#current-user-table")
                    currentMembersList.innerHTML = ""
                
                    function currentUserRow(user){
                        if(project.members.length == 0){
                            return
                        }
                        const currentRow = document.createElement("div")
                        currentRow.className = "modal__body--row"
                        currentRow.id = `project-current-row-${user.id}`
                        currentRow.innerHTML = `<p class="user__id user__id--vis">${user.id}</p>
                                                <div class="user__img user__img--vis"><img src="./img/meme-10-guy-chico-drogado_400x400.jpg" alt=""></div>
                                                <p class="user__nick user__nick--vis">${user.nickname}</p>
                                                <p class="user__name user__name--vis">${user.firstName} ${user.lastName}</p>
                                                <p class="user__email user__email--vis">${user.email}</p>
                                                <select class="user__role user__role--vis" name="" id="">Assign
                                                    <option value="${user.role}">${user.role}</option>
                                                </select>
                                                <img class="user__delete" src="./img/addMember_delete.svg" alt="Delete Member">
                                                <button class="user__view">View</button>`

                        currentMembersList.append(currentRow)

                        function assignCurrentRoles(){
                            const userRole = currentRow.querySelector(".user__role")
                            userRole.addEventListener("mousedown",() => {
                                if (isUserAdmin(project) != true){
                                    alert("you don´t have permission to do this")
                                    return
                                }
                                else{
                                    userRole.innerHTML = ``
                                    project.roles.forEach(role => {
                                        userRole.innerHTML += `<option value="${role}">${role}</option>`
                                        userRole.onmouseleave = () => {
                                            user.role = ``
                                            user.role = userRole.value
                                            if(user.role != "ADMIN"){
                                                user.admin = false
                                                projectAdmins()
                                            }
                                            if(user.role == "ADMIN"){
                                                user.admin = true
                                                projectAdmins()
                                            }
                                            localStorage.setItem("Lista de Proyectos", JSON.stringify(projectList))
                                            
                                            console.log(user.role)
                                        }
                                    })
                                }   
                            })
                        }
                        assignCurrentRoles()

                        memberList.querySelector("#show-current-members-number").innerHTML=`ACTIVE MEMBERS: ${project.members.length}`

                        let removeCurrentMemberBtn = currentMembersList.querySelectorAll(".user__delete")
                        removeCurrentMemberBtn.forEach(button => button.onclick = () => {
                            removeMember(button)
                            projectSearchUser()
                        })
                    }

                    project.members.forEach(member => currentUserRow(member))

                    const closeButtons = memberList.querySelectorAll(".close__members")
                    closeButtons.forEach(button => button.onclick = () => {
                        closeWindow(memberList)
                        createMemberTable()
                    })
                }
                projectCurrentMembers()

                function projectSearchUser(user){

                    const searchUserList = memberList.querySelector("#search-user-table")
                    searchUserList.innerHTML = ``

                    function searchUserRow(user){
                        const searchRow = document.createElement("div")
                        searchRow.innerHTML =``
                        searchRow.className = "modal__body--row"
                        searchRow.id = `project-search-row-${user.id}`
                        searchRow.innerHTML = `<p class="user__id user__id--vis">${user.id}</p>
                                            <div class="user__img user__img--vis"><img src="./img/meme-10-guy-chico-drogado_400x400.jpg" alt=""></div>
                                            <p class="user__nick user__nick--vis">${user.nickname}</p>
                                            <p class="user__email user__email--vis">${user.email}</p>
                                            <button class="user__add">Add</button>`

                        searchUserList.append(searchRow)
                        memberList.querySelector("#show-current-members-number").innerHTML=`ACTIVE MEMBERS: ${project.members.length}`
                    }
                    let memberIds = []
                    project.members.forEach(member => {
                        memberIds.push(member.id)
                    })
                    let usersNotOnProject = userList.filter(user => !memberIds.includes(user.id))
                    usersNotOnProject.forEach(user => searchUserRow(user)) 
                    
                    function addNewMember(){
                        const addMemberBtn = searchUserList.querySelectorAll(".user__add")
                        function addUserToCurrent(button){
                            console.log("SHIT")
                            const userId = button.parentNode.id.match(/\d+/g)
                            const foundUser = userList.find(user => user.id == userId)
                            project.members.push(foundUser)
                            console.log(foundUser)
                            projectSearchUser()
                            projectCurrentMembers()
                            localStorage.setItem("Lista de Proyectos", JSON.stringify(projectList))
                        }
                        addMemberBtn.forEach(button => button.onclick = () => {
                            if (isUserAdmin(project) != true){
                                alert("you don´t have permission to do this")
                                return
                            }
                            else {
                                addUserToCurrent(button)
                            }
                        })
                    }
                    addNewMember()
                }
                projectSearchUser()
            }
        }
        openProjectMemberList()

    }
    projectModalMembers()


    
    
}
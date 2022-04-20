// DATA LOAD 📚

cargarDatosProyectos();

cargarDatosUsuarios();

cargarDatosEquipos();

cargarDatosIssues();

team = JSON.parse(localStorage.getItem("Equipo Activo"))

console.log(team)

console.log(team.project)

function openPreview(team){

    modalDiv = document.querySelector(".modal")
    console.log(modalDiv)
    const projectOfTeam = projectList.find(project => project.id == team.project)

    function closeWindow(element){
        element.remove()
    }

    function closeModal(){
        localStorage.removeItem('Equipo Activo');
        location.href= "./teams.html";
    }

    function closeTeamModal(){

        const closeButtons = modalDiv.querySelectorAll(".close__modal")
        closeButtons.forEach(button => button.onclick = ()=> closeModal())
    }
    closeTeamModal()



    function deleteTeam(){

        const deleteButton = modalDiv.querySelector("#delete-project")
        console.log(deleteButton)
        
        if(isUserAdmin(projectOfTeam) != true){
            deleteButton.innerText = "Leave Project"
            deleteButton.onclick = () => {
                userToRemove = team.members.find(user => user.id == USER_CURRENT.id)
                team.members.splice(team.members.indexOf(userToRemove), 1)
                localStorage.setItem("Lista de Equipos", JSON.stringify(teamList))
                closeModal()
            }
        }
        else {
            deleteButton.onclick = () => {
                teamToRemove = teamList.find(project => project == project)
                teamList.splice(teamList.indexOf(teamToRemove), 1)
                localStorage.setItem("Lista de Equipos", JSON.stringify(teamList))
                closeModal()
            }
        }
    }
    deleteTeam()



    function teamModalRepos(){

        const reposTable = document.querySelector("#project-modal-repos")
        console.log(team.repos)
        function createRepoList(){
            team.repos.forEach(repo => {

                const repoRow = document.createElement("div")
                repoRow.className = "repo__list--row"
                repoRow.id = `repo-row-${team.repos.length}`
                repoRow.innerHTML = `<p>${reposTable.childElementCount + 1}</p>
                                    <p id="repo-name-${team.repos.length}">${repo}</p>
                                    <a href="${repo}"><img src="./img/github.svg" alt="Github Repo Link"></a>
                                    <img class="modal__delete--repo" src="./img/addMember_delete.svg" alt="Delete Repo">`
                reposTable.append(repoRow)
            })
        }
        createRepoList()

        function removeRepo(element, classOne, classTwo){
            element.addEventListener("click", function (e) {
                if (e.target.classList.contains(classOne)|| e.target.closest(classTwo) !== null){
                    if(isUserAdmin(projectOfTeam) != true){
                        alert("You don´t have permission to do this")
                        return
                    }
                    else{
                        let getRow = e.target.parentNode
                        let rowId = e.target.parentNode.id.match(/\d+/g)
                        let repoName = getRow.querySelector(`#repo-name-${rowId}`).innerText
                        let foundRepo = team.repos.find(repo => repo == repoName)
                        let repoToRemove = team.repos.indexOf(foundRepo)
                        console.log(repoToRemove)
                        team.repos.splice((repoToRemove), 1)
                        e.target.parentNode.remove()
                        localStorage.setItem("Equipo Activo", JSON.stringify(team))
                        localStorage.setItem("Lista de Equipos", JSON.stringify(teamList))
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

                                            <div class="separator__extraBig--bluePurple"></div>

                                            <div class="modal__body">

                                                <div class="modal__body--title">
                                                    <h1>Team Repository/s</h1>
                                                    <h2>${team.name}</h2>
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

                                            <div class="separator__big--bluePurple-2"></div>

                                            <div class="modal__footer">
                                                <p>ACTIVE REPOS: ${team.repos.length}</p>
                                                <button class="close close__window">Close <img src="./img/close_white.svg" alt="Close Window"></button>
                                            </div>

                                        </div>`

                document.body.prepend(repoModal)

                function addRepoRow(repo){
                    const repoList = repoModal.querySelector("#modal-repo-table")
                    const repoRow = document.createElement("div")
                    repoRow.className = "modal__body--table--row"
                    repoRow.id = `repo-list-row-${team.repos.length}`
                    repoRow.innerHTML = `<p class="repo__number">${(team.repos.indexOf(repo))+1}</p>
                                        <a id="repo-name-${team.repos.length}" href="${repo}">${repo}</a>
                                        <a href=${repo}><img src="./img/github.svg" alt="Github Repo Link"></a>
                                        <img src="./img/addMember_delete.svg" alt="Delete Repo" class="delete__repo">`
                    repoList.append(repoRow)
                }

                removeRepo(repoModal, "delete__repo", '.delete__repo')
                
                team.repos.forEach(repo => addRepoRow(repo))

                function addNewRepo(){
                    const newRepoBtn = document.querySelector("#new-repo-btn")
                    const newRepoInput = document.querySelector("#new-repo-input")
                    
                    newRepoBtn.onclick = () => {
                        if(newRepoInput.value == ""){
                            return
                        }
                        else {
                            if (isUserAdmin(projectOfTeam) != true){
                                alert("you don´t have permission to do this")
                                return
                            }
                            else{
                                const newRepo = newRepoInput.value
                                team.repos.push(newRepo)
                                localStorage.setItem("Equipo Activo", JSON.stringify(team))
                                localStorage.setItem("Lista de Equipos", JSON.stringify(teamList))
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
                        window.location.reload();
                    })
                })

            }
        }
        viewRepoList()
    }
    teamModalRepos()



    function editTeamProperties(){

        const editButtons = modalDiv.querySelectorAll(".project__edit")
        if(isUserAdmin(projectOfTeam) != true){
            editButtons.forEach(button => button.remove())
        }
        else{
            function cancelAndClose(div){
                const closeModal = div.querySelector(".closeModal")
                closeModal.onclick = () => closeWindow(div)
    
                const cancelModal = div.querySelector(".cancel")
                cancelModal.onclick = () => closeWindow(div)
            }
    
            function editTeamName(){

                document.querySelector(".project__title").innerHTML = `${team.name}`
                const changeName = modalDiv.querySelector("#edit-project-name")
                changeName.onclick = () => {
    
                    const changeNameDiv = document.createElement("div")
                    changeNameDiv.className = "change__project--prop"
                    changeNameDiv.innerHTML = `<div class="changeProp__div">
                                                    <div class="changeProp__div--header">
                                                        <h5>Change Name</h5>
                                                        <img class="closeModal" src="./img/close.svg" alt="Close Window">
                                                    </div>
                                                    <div class="separator__small--bluePurple"></div>
                                                    <div class="changeProp__div--body">
                                                        <input type="text" placeholder="Insert New Team Name" id="edit-project-new-name">
                                                    </div>
                                                    <div class="separator__small--bluePurple-2"></div>
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
                        team.name = nameInput.value
                        localStorage.setItem("Equipo Activo", JSON.stringify(team))
                        localStorage.setItem("Lista de Equipos", JSON.stringify(teamList))
                        changeNameDiv.remove()
                        document.querySelector(".project__title").innerHTML = `${team.name}`
                        window.location.reload();
                    })
                }
            }
            editTeamName()
    
            function setTeamProject(){

                const projectName = document.querySelector("#project-name")
                projectName.innerText = projectOfTeam.title

                const projectImage = document.querySelector("#project-image")
                projectImage.src = projectOfTeam.image
            }
            setTeamProject()
    
            function editTeamLead(){
                const changeLead = modalDiv.querySelector("#edit-project-lead")

                document.querySelector(".team__lead").innerHTML = `${team.lead.firstName} ${team.lead.lastName}`

                changeLead.onclick = () => {
    
                    const changeLeadDiv = document.createElement("div")
                    changeLeadDiv.className = "change__project--prop"
                    changeLeadDiv.innerHTML = `<div class="changeProp__div">
                                                    <div class="changeProp__div--header">
                                                        <h5>Change Lead</h5>
                                                        <img class="closeModal" src="./img/close.svg" alt="Close Window">
                                                    </div>
                                                    <div class="separator__small--bluePurple"></div>
                                                    <div class="changeProp__div--body">
                                                        <input type="text" placeholder="Insert New Lead Name" id="edit-project-new-lead">
                                                    </div>
                                                    <div class="separator__small--bluePurple-2"></div>
                                                    <div class="changeProp__div--footer">
                                                        <button class="cancel">Cancel</button>
                                                        <button class="accept">Accept</button>
                                                    </div>
                                                </div>`
                    document.body.prepend(changeLeadDiv)
                    
                    cancelAndClose(changeLeadDiv)
    
                    const leadInput = changeLeadDiv.querySelector("#edit-project-new-lead")
    
                    const acceptModal = changeLeadDiv.querySelector(".accept")
                    acceptModal.addEventListener("click", function(){
                        if(leadInput.value == ""){
                            return
                        }
                        team.lead = leadInput.value
                        localStorage.setItem("Equipo Activo", JSON.stringify(team))
                        localStorage.setItem("Lista de Equipos", JSON.stringify(teamList))
                        changeLeadDiv.remove()
                        document.querySelector(".team__lead").innerHTML = `${team.lead.firstName} ${team.lead.lastName}`
                        window.location.reload();
                    })
                }
            }
            editTeamLead()
    
            function editTeamDescr(){
                const changeDescr = modalDiv.querySelector("#edit-project-descr")
                document.querySelector(".team__descr").innerHTML = `${team.descr}`
                changeDescr.onclick = () => {
    
                    const changeDescrDiv = document.createElement("div")
                    changeDescrDiv.className = "change__project--prop"
                    changeDescrDiv.innerHTML = `<div class="changeProp__div">
                                                    <div class="changeProp__div--header">
                                                        <h5>New Description</h5>
                                                        <img class="closeModal" src="./img/close.svg" alt="Close Window">
                                                    </div>
                                                    <div class="separator__small--bluePurple"></div>
                                                    <div class="changeProp__div--body">
                                                        <textarea placeholder="Insert New Team Description" id="edit-project-new-descr"></textarea>
                                                    </div>
                                                    <div class="separator__small--bluePurple-2"></div>
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
                        team.descr = descrInput.value
                        localStorage.setItem("Equipo Activo", JSON.stringify(teamList))
                        localStorage.setItem("Lista de Equipos", JSON.stringify(teamList))
                        changeDescrDiv.remove()
                        document.querySelector(".team__descr").innerHTML = `${team.descr}`
                    })
                }
            }
            editTeamDescr()
        }
    }
    editTeamProperties()



    function teamModalIssues(){

        const issuesTable = document.querySelector("#project-modal-issues-table")
        issuesTable.innerHTML = ``
        function createIssuesList(){
            
            team.issues.forEach(issue => {

                const issueRow = document.createElement("div")
                issueRow.className = "project__issues--row"
                issueRow.id = `projectModal-issue-row-${issue.id}`
                issueRow.innerHTML = `<p class="issue__id">${issue.id}</p>
                                    <p class="issue__name">${issue.title}</p>
                                    <p class="issue__type">${issue.type}</p>
                                    <p class="issue__priority">${issue.priority}</p>
                                    <p>Yesterday</p>
                                    <div></div>
                                    <button>View</button>`
                issuesTable.append(issueRow)
            })
        }
        createIssuesList()

        function openTeamIssueList(){

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
                                
                                            <div class="separator__extraBig--pinkSalmon"></div>
                                
                                            <div class="modal__body">
                                
                                                <div class="modal__body--title">
                                                    <h1>Team Issues</h1>
                                                    <h2>${team.name}</h2>
                                                </div>
                                
                                                <div class="project__issues">
                                                    <div class="project__issues--table" id="team-issues-table">
                                                        <div class="project__issues--table--head">
                                                            <div class="project__issues--table--header">
                                                                <p class="issue__id">ID</p>
                                                                <p class="issue__name">TITLE</p>
                                                                <p class="issue__type">TYPE</p>
                                                                <p class="issue__priority">PRIORITY</p>
                                                                <p class="issue__author">AUTHOR</p>
                                                                <p class="issue__name">DESCRIPTION</p>
                                                                <p class="issue__team">PROJECT</p>
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
                                
                                            <div class="separator__big--pinkSalmon"></div>
                                
                                            <div class="modal__footer">
                                                <p>ACTIVE ISSUES: ${team.issues.length}</p>
                                                <button class="close close__issues">Close <img src="./img/close_white.svg" alt="Close Window"></button>
                                            </div>
                                
                                        </div>`
                
                document.body.prepend(issueList)

                function createIssueRow(issue){
                    if(team.issues == false){
                        return
                    }
                    else {

                        const issueTable = document.querySelector("#team-issues-table")

                        console.log("SHIT")

                        const foundUser = userList.find(user =>user.id == issue.author)
                        const foundProject = projectList.find(project =>project.id == issue.project)

                        const issueRow = document.createElement("div")
                        issueRow.className = "project__issues--row"
                        issueRow.id = `project-issue-row-${issue.id}`
                        issueRow.innerHTML = `<p class="issue__id issue__id--vis">${issue.id}</p>
                                            <p class="issue__name issue__name--vis">${issue.title}</p>
                                            <p class="issue__type issue__type--vis">${issue.type}</p>
                                            <p class="issue__priority issue__priority--vis">${issue.priority}</p>
                                            <p class="issue__author issue__author--vis">${foundUser.firstName} ${foundUser.lastName}</p>
                                            <p class="issue__name">${issue.descr}</p>
                                            <p class="issue__team issue__team--vis">${foundProject.title}</p>
                                            <div class="issue__notif"></div>
                                            <img  class="issue__delete" src="./img/addMember_delete.svg" alt="Delete Issue">
                                            <button class="issue__button">View</button>`
                        issueTable.append(issueRow)
                    }
                }
                team.issues.forEach(issue => {
                    createIssueRow(issue)
                })

                const closeButtons = issueList.querySelectorAll(".close__issues")
                closeButtons.forEach(button => button.onclick = () => closeWindow(issueList))
            }
        }
        openTeamIssueList()

    }
    teamModalIssues()

    function teamModalMembers(){

        function removeMember(button){
            if(isUserAdmin(projectOfTeam) != true){
                alert("You don´t have permission to do this")
                return
            }
            else{
                const matchId = button.parentNode.id.match(/\d+/g)
                const userToRemove = team.members.find(member => member.id == matchId)
                const userIndex = team.members.indexOf(userToRemove)
                team.members.splice(userIndex, 1)
                localStorage.setItem("Equipo Activo", JSON.stringify(team))
                localStorage.setItem("Lista de Equipos", JSON.stringify(teamList))
                button.parentNode.remove()
            }
        }

        const membersTable = document.querySelector("#project-modal-members-table")
        function createMemberTable(){

            membersTable.innerHTML = ``
            team.members.forEach(member => {

                const memberRow = document.createElement("div")
                memberRow.className = "modal__body--row"
                memberRow.id = `teamModal-team-row-${member.id}`
                memberRow.innerHTML =   `
                                        <p class="user__id user__id--vis">${member.id}</p>
                                        <div class="user__img user__img--vis"><img src="./img/meme-10-guy-chico-drogado_400x400.jpg" alt=""></div>
                                        <p class="user__nick user__nick--vis">${member.nickname}</p>
                                        <p class="user__name user__name--vis">${member.firstName} ${member.lastName}</p>
                                        <p class="user__email user__email--vis">${member.email}</p>
                                        <img class="user__delete" src="./img/addMember_delete.svg" alt="Delete Member">
                                        <button class="user__view">View</button>`
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
                                                    <img src="./img/board_team_title.svg" alt="Project Icon">
                                                    <h2>Team</h2>
                                                </div>
                                                <img class="close__members" src="./img/close.svg" alt="Close Window">
                                            </div>
                                
                                            <div class="separator__extraBig--bluePurple"></div>
                                
                                            <div class="modal__body">
                                
                                                <div class="modal__body--main">
                                                    <div class="modal__body--current">
                                                        <h3>CURRENT MEMBERS</h3>
                                                        <div class="modal__body--div" style="height: 65vh;">
                                                            <div class="modal__body--head">
                                                                <div class="modal__body--header">
                                                                    <div class="user__id">ID</div>
                                                                    <div class="user__img"></div>
                                                                    <div class="user__nick">NICKNAME</div>
                                                                    <div class="user__name">FULL NAME</div>
                                                                    <div class="user__email">EMAIL</div>
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
                                                        <div class="modal__body--div" style="height: 65vh;">
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
                                
                                            <div class="separator__big--bluePurple-2"></div>
                                
                                            <div class="modal__footer">
                                                <p id="show-current-members-number">ACTIVE TEAMS: 3</p>
                                                <button class="close close__members">Close <img src="./img/close_white.svg" alt="Close Window"></button>
                                            </div>
                                
                                        </div>`

                
                document.body.prepend(memberList)

                function teamCurrentMembers(user){

                    const currentMembersList = memberList.querySelector("#current-user-table")
                    currentMembersList.innerHTML = ""
                
                    function currentUserRow(user){
                        if(team.members.length == 0){
                            return
                        }
                        const currentRow = document.createElement("div")
                        currentRow.className = "modal__body--row"
                        currentRow.id = `team-current-row-${user.id}`
                        currentRow.innerHTML = `<p class="user__id user__id--vis">${user.id}</p>
                                                <div class="user__img user__img--vis"><img src="./img/meme-10-guy-chico-drogado_400x400.jpg" alt=""></div>
                                                <p class="user__nick user__nick--vis">${user.nickname}</p>
                                                <p class="user__name user__name--vis">${user.firstName} ${user.lastName}</p>
                                                <p class="user__email user__email--vis">${user.email}</p>
                                                <img class="user__delete" src="./img/addMember_delete.svg" alt="Delete Member">
                                                <button class="user__view">View</button>`

                        currentMembersList.append(currentRow)

                        memberList.querySelector("#show-current-members-number").innerHTML=`ACTIVE MEMBERS: ${team.members.length}`

                        let removeCurrentMemberBtn = currentMembersList.querySelectorAll(".user__delete")
                        removeCurrentMemberBtn.forEach(button => button.onclick = () => {
                            removeMember(button)
                            teamSearchUser()
                        })
                    }

                    team.members.forEach(member => currentUserRow(member))

                    const closeButtons = memberList.querySelectorAll(".close__members")
                    closeButtons.forEach(button => button.onclick = () => {
                        closeWindow(memberList)
                        createMemberTable()
                    })
                }
                teamCurrentMembers()

                function teamSearchUser(user){

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
                        memberList.querySelector("#show-current-members-number").innerHTML=`ACTIVE MEMBERS: ${team.members.length}`
                    }
                    let memberIds = []
                    team.members.forEach(member => {
                        memberIds.push(member.id)
                    })
                    let usersNotOnTeam = projectOfTeam.members.filter(user => !memberIds.includes(user.id))
                    usersNotOnTeam.forEach(user => searchUserRow(user)) 
                    
                    function addNewMember(){
                        const addMemberBtn = searchUserList.querySelectorAll(".user__add")
                        function addUserToCurrent(button){
                            const userId = button.parentNode.id.match(/\d+/g)
                            const foundUser = projectOfTeam.members.find(user => user.id == userId)
                            team.members.push(foundUser)
                            console.log(foundUser)
                            teamSearchUser()
                            teamCurrentMembers()
                            localStorage.setItem("Equipo Activo", JSON.stringify(team))
                            localStorage.setItem("Lista de Equipos", JSON.stringify(teamList))
                        }
                        addMemberBtn.forEach(button => button.onclick = () => {
                            if (isUserAdmin(projectOfTeam) != true){
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
                teamSearchUser()
            }
        }
        openProjectMemberList()

    }
    teamModalMembers()


    
    
}

openPreview(team)

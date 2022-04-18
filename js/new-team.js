// CARGA DE DATOS 📚
cargarDatosProyectos();

cargarDatosUsuarios();

cargarDatosEquipos();

// FUNCION CONSTRUCTORA DE CLASE DE OBJETO "TEAM" /EQUIPOS:

function createTeam(){

    if(USER_CURRENT.projects.length === 0){
        alert("Before creating a team, you must first create a project")
        location.href= "./index.html";
    }

    // TEAM PROJECT: 

    let chosenProject

    function selectTeamProject(){

        const selectNode = document.querySelector("#select-team-project")
        let projectsToChoose = []
        USER_CURRENT.projects.forEach(project => {
            const user = project.members.find(user => user.id == USER_CURRENT.id)
            const isUserAdmin = user.admin
            if(isUserAdmin == true){
                projectsToChoose.push(project)
            }
        })
        
        function addProjectOption(){
            projectsToChoose.forEach(project => {
                selectNode.innerHTML+= `<option id="project-option-${project.id}" class="project__option" value="${project.title}">${project.title}</option>`
            })
        }
        addProjectOption()

        let searchList = document.querySelector("#searchList");

        function choseProject(){
            if(projectsToChoose.length == 1){
                console.log(projectsToChoose[0])
                addedProject(projectsToChoose[0])
            }
            selectNode.addEventListener("click", ()=> {
                const options = selectNode.querySelectorAll(".project__option")
                const optionsArray = Array.from(options);
                const chosenOption = optionsArray.find(option => (option.value == selectNode.value))
                const id = chosenOption.id.match(/\d+/g)
                const chosenProject = projectsToChoose.find(project => project.id == id)
                addedProject(chosenProject)
            })
            function addedProject(project){
                const showProject = document.querySelector("#chosen-team-project")
                showProject.innerHTML = `<h4>${project.title}</h4>
                                        <div class="newTeam__project--body--img">
                                            <img src="${project.image}" alt="Project Image">
                                        </div>`
                chosenProject = project
                teamProject = project
                searchUsers()
            }
        }
        choseProject()

        // TEAM MEMBERS: -----------------------------------------------------------

        let currentMembersTable = document.querySelector("#currentMembers-table")
            
        // SEARCH LIST:

        function searchUsers(){
            searchList.innerHTML = ``
            teamProject.members.forEach(user => {
                searchList.innerHTML += `<div class="row" id="searchUserRow-${user.id}">
                                            <div class="cell search__nick">${user.nickname}</div>
                                            <div class="cell search__name">${user.firstName} ${user.lastName}</div>
                                            <div class="cell search__email">${user.email}</div>
                                            <button class="add__member--btn" id="addUser${user.id}-btn" type="submit" value="add member">Add</button>
                                        </div>`
                    
            })
        }

        // ADD NEW MEMBER TO CURRENT LIST:

        function newTeamMember(){

            searchList.addEventListener("click", function(e) {
                if(e.target.classList.contains("add__member--btn")|| e.target.closest('.add__member--btn') !== null){
                    let button = e.target
                    console.log(e.target)
                    console.log(e.target.tagName)
                    addNewMember(button)
                }
            })
        }
        newTeamMember()
            
        function addNewMember(button){
            currentMembersTable.innerHTML = ``
            console.log("HEY")
            let numberId = button.id.match(/\d+/g);
            let userFound = teamProject.members.find(user => user.id == numberId)
            let eraseRow = document.querySelector(`#searchUserRow-${numberId}`);
            console.log(eraseRow)
            eraseRow.remove();

            console.log(teamMembers)

            teamMembers.push(userFound)

            let currentList = document.querySelector("#currentMembers-table")

            currentList.innerHTML = ``

            teamMembers.forEach(member => {
                currentList.innerHTML += 
                `<div class="row currentMembersRow" id="currentMember-${member.id}">
                    <div class="member__id">${member.id}</div>
                    <div class="member__nick">${member.nickname}</div>
                    <div class="member__name">${member.firstName} ${member.lastName}</div>
                    <img class="member__delete eraseCurrentMember" id="eraseCurrentMember-${member.id}" src="./img/addMember_delete.svg" alt="">
                </div>`
            })

            console.log(teamMembers)

  

            // FOOTER CURRENT MEMBERS
            let footerCurrent = document.querySelector("#footerCurrent")
            footerCurrent.innerText = `CURRENT MEMBERS: ${teamMembers.length}` 
        }
        
        // ERASE CURRENT MEMBER
        
        function eraseCurrentMember(){
            currentMembersTable.addEventListener("click", function(e) {
                if(e.target.classList.contains("eraseCurrentMember")|| e.target.closest('.eraseCurrentMember') !== null){
                    eraseMember(e.target)     
                }
            })
        }
        eraseCurrentMember()

        function eraseMember(button){
            let numberId = button.parentNode.id.match(/\d+/g);
            let removedUser = teamMembers.find(user => user.id == numberId)
            console.log(removedUser)
            button.parentNode.remove();
            
            searchList.innerHTML += `<div class="row" id="searchUserRow-${removedUser.id}">
                                        <div class="cell search__nick">${removedUser.nickname}</div>
                                        <div class="cell search__name">${removedUser.firstName} ${removedUser.lastName}</div>
                                        <div class="cell search__email">${removedUser.email}</div>
                                        <button class="add__member--btn" id="addUser${removedUser.id}-btn" type="submit" value="add member">Add</button>
                                    </div>`


            teamMembers.splice(teamMembers.indexOf(removedUser), 1)

            console.log(teamMembers)

            // FOOTER CURRENT MEMBERS
            let footerCurrent = document.querySelector("#footerCurrent")
            footerCurrent.innerText = `CURRENT MEMBERS: ${teamMembers.length}`
        }

        // SEARCH FOR USER

        // PROJECT SEARCH USERS BY SEARCH INPUT:

        function showSearchUsers(){

            let searchList = document.querySelector("#searchList");
            const searchInput = document.querySelector("#search-input")
            let searchTerm = ""
            searchInput.addEventListener("input", e => {
                searchTerm = e.target.value
                showUsers()
            })

            function showUsers(){
                searchList.innerHTML = ``
                let filteredUserList = teamProject.members.filter(user => !teamMembers.includes(user))
                filteredUserList
                    .filter(user => user.nickname.includes(searchTerm))
                    .forEach(user=>{

                    searchList.innerHTML += `<div class="row" id="searchUserRow-${user.id}">
                                            <div class="cell search__nick">${user.nickname}</div>
                                            <div class="cell search__name">${user.firstName} ${user.lastName}</div>
                                            <div class="cell search__email">${user.email}</div>
                                            <button class="add__member--btn" id="addUser${user.id}-btn" type="submit" value="add member">Add</button>
                                        </div>`
                })
            }
        }
        showSearchUsers()
    }   
    selectTeamProject()


    // SEARCH TEAM LEAD:

    function searchTeamLead(){
        let searchList = document.querySelector("#search-lead");
        const searchInput = document.querySelector("#input-lead")
        searchList.addEventListener("click", ()=> {
            showSearchLead()
        })
        searchList.addEventListener("change", ()=> {
            console.log(searchList.value)
            searchInput.innerText = searchList.value
            let newLead = teamProject.members.find(member => member.nickname == searchList.value)
            teamLead = newLead
        })
        function showSearchLead(){
            searchList.innerHTML = ``
            searchList.innerHTML += `<option class="lead__option" value=""></option>`
            teamProject.members.forEach(member => {
                searchList.innerHTML += `<option id="lead-option-${member.id}" class="lead__option" value="${member.nickname}">${member.firstName} ${member.lastName}</option>`
            })
        }
    }
    searchTeamLead()


    // TEAM REPOSITORIES: 

    function teamRepositories(){

        function addNewRepo(e){

            e.preventDefault();
            let newRepo = document.querySelector("#projectRepos").value;
            if (newRepo == "") {
                return;
            }
            teamRepos.push(newRepo);
            let createdReposList = document.getElementById("createdRepos-list");
            createdReposList.innerHTML = ``;
            let counter = 0;
            teamRepos.forEach(repo => {
                counter++;            
                createdReposList.innerHTML += `<li>Repo ${counter}: <a href="${repo}" target="_blank">${repo}</a><img class="deleteRepo" id="deleteRepo-${counter}" src="./img/addMember_delete.svg" alt="Delete Repo"></li>`;
            });
    
            document.getElementById("projectRepos").value = "";
    
        }
    
        let addRepo = document.querySelector("#addRepo").addEventListener("click", (e)=> addNewRepo(e));
    
        function eraseRepo(button){
            button.parentNode.remove()
            repoId = button.id
            let numberId = repoId.match(/\d+/g);
            teamRepos.splice((numberId-1), 1)
        }
    
        let removeRepo = document.querySelector("#createdRepos-list")
        removeRepo.addEventListener("click", function(e){
            if(e.target.classList.contains("deleteRepo")|| e.target.closest('.deleteRepo') !== null){
                let button = e.target
                eraseRepo(button)
            }
        })
    }
    teamRepositories()

    // SUBMIT NEW TEAM:

    function submitNewTeam(){

        let submitTeam = document.querySelector("#submitProject").addEventListener("click", (e)=>{

            e.preventDefault();
    
            teamId = teamList.length + 1;
        
            teamName = document.querySelector("#projectName").value;
    
            teamProject = chosenProject.id

            teamLead

            teamDescr = document.querySelector("#projectDescr").value
    
            teamRepos

            teamMembers
    


            teamNew = new Team(teamId, teamName, teamProject, teamLead, teamDescr, teamRepos, teamMembers, teamIssues);
    
            if (teamName == "" || teamProject == "" || teamDescr == ""||teamLead == ""|| teamMembers == ""){
    
                Swal.fire({
                    title: "Error!",
                    text: "Please complete all required fields.",
                    icon: "error",
                })
                return;
                
            }
    
            teamList.push(teamNew);

            foundProject = projectList.find(project => project.id == teamProject)
            foundProject.teams.push(teamNew)
            let foundUsers = []
            teamMembers.forEach(user => {
                let member = user;
                let userFound = userList.find(user => user.id == member.id)
                foundUsers.push(userFound)
            })
            foundUsers.forEach(user => user.teams.push(teamNew))
    
            Swal.fire({
                title: "Done!",
                text: "Team Created",
                imageUrl: "./img/project_created.svg",
                imageWidth: "250px",
                showConfirmButton: false,
            })
    
            console.log(teamList)

            localStorage.setItem("Lista de Equipos", JSON.stringify(teamList));
            localStorage.setItem("Lista de Usuarios", JSON.stringify(userList))
            localStorage.setItem("Lista de Proyectos", JSON.stringify(projectList))
            
    
    
            setTimeout(function(){
    
                location.href= "./index.html"; 
    
            }, 2000)
            
        });

    }
    submitNewTeam()
    
}
createTeam()
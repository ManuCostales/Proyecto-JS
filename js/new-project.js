// CARGA DE DATOS 📚
cargarDatosProyectos();

cargarDatosEquipos();

cargarDatosUsuarios();

desloguear();

sendToLogin()

// FUNCION CONSTRUCTORA DE CLASE DE OBJETO "PROJECT" /PROYECTOS:

Toastify({
    text: "By creating a project you bring a group of people together to work on different tasks. You can assign roles to members of the project. The role 'ADMIN' is special, because it allows to have total control of the project, keep that in mind",
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

function createProject(){

    // PROJECT DATES: 

    let trueProjectTime = ""

    function showProjectDate(time){

        let projectTime = currentTime(time)
        let projectCreationDate = `${projectTime.dayNumber} ${projectTime.month} ${projectTime.year}`
        let showProjectDate = document.querySelector("#projectCreationDate");
        showProjectDate.innerHTML= projectCreationDate;
    }

    const projectDate = () => {
        date.then((a) => {
            showProjectDate(a)
            trueProjectTime = a
        })
    }

    projectDate()

    // PROJECT CREATOR:

    function showProjectCreator(){
        showProjectCreator = document.querySelector("#projectCreator");
        showProjectCreator.innerHTML= `${USER_CURRENT.firstName} ${USER_CURRENT.lastName}`;
    }

    showProjectCreator()

    // PROJECT IMAGE:

    function setProjectImage(){
        let dropArea = document.querySelector("#droparea")
        const active = () => dropArea.classList.add("active")
        const inactive = () => dropArea.classList.remove("active")
        const prevent = (e) => e.preventDefault()
        let dropText = document.querySelector("#dropText")
        let uploadedImage = ""

        const eventsActive = ["dragenter", "dragover"]
        const eventsInactive = ["dragleave", "drop"]

        eventsActive.forEach(eName => {
            dropArea.addEventListener(eName, prevent)
            dropArea.addEventListener(eName, active)
        })

        eventsInactive.forEach(eName => {
            dropArea.addEventListener(eName, prevent)
            dropArea.addEventListener(eName, inactive)
        })

        dropArea.addEventListener("drop", (e)=>{
            const dt = e.dataTransfer
            const files = dt.files
            const reader = new FileReader()
            reader.addEventListener("loadend", ()=>{
                uploadedImage = reader.result
                projectImage = uploadedImage
                dropArea.innerHTML = `<img src="${uploadedImage}" alt="shit">`
            })
            reader.readAsDataURL(files[0])
        })
    }

    setProjectImage()

    // PROJECT REPOS

    function addNewRepo(e){

        e.preventDefault();

        // Se busca input value de Repo:
        let newRepo = document.querySelector("#projectRepos").value;

        // Si el input esta vacio, no ejecutar la función.
        if (newRepo == "") {
            return;
        }

        // Si el input tiene un valor, pushear ese valor a la lista de Roles:
        projectRepos.push(newRepo);

        // Seleccionar y limpiar la lista de Roles Creados:
        let createdReposList = document.getElementById("createdRepos-list");
        createdReposList.innerHTML = ``;

        // Contador para ID del repo:
        let counter = 0;

        // Por cada repo en la lista de Repos, agregar un elemento <li> al HTML.
        projectRepos.forEach(repo => {

            // Suma del Contador:
            counter++;            
            createdReposList.innerHTML += `<li>Repo ${counter}: <a href="${repo}" target="_blank">${repo}</a><img class="deleteRepo" id="deleteRepo-${counter}" src="./img/addMember_delete.svg" alt="Delete Repo"></li>`;

        });

        // Limpiar el input de Repo luego de agregar:
        document.getElementById("projectRepos").value = "";

    }

    let addRepo = document.querySelector("#addRepo").addEventListener("click", (e)=> addNewRepo(e));

    function eraseRepo(button){
        button.parentNode.remove()
        repoId = button.id
        let numberId = repoId.match(/\d+/g);
        projectRepos.splice((numberId-1), 1)
    }

    let removeRepo = document.querySelector("#createdRepos-list")
    removeRepo.addEventListener("click", function(e){
        if(e.target.classList.contains("deleteRepo")|| e.target.closest('.deleteRepo') !== null){
            let button = e.target
            eraseRepo(button)
        }
    })

    // PROJECT ROLES:

    function createRole (e){

        e.preventDefault();

        // Se busca value del input de Role:
        let newRole = (document.querySelector("#projectRoles").value).toUpperCase();

        // Si el input esta vacio, no ejecutar la función.
        if (newRole == "") {
            return;
        }

        // Si el input tiene un valor, pushear ese valor a la lista de Roles:
        projectRoles.push(newRole);

        // Seleccionar y limpiar la lista de Roles Creados:
        let createdRolesList = document.getElementById("createdRoles-list");
        createdRolesList.innerHTML = ``;

        // Por cada rol en la lista de Roles, agregar un elemento <li> al HTML.
        projectRoles.forEach(role => {
            
            if(role == "ADMIN"){
                return
            }
            createdRolesList.innerHTML += `<li><p>${role}</p><img class="deleteRole" src="./img/addMember_delete.svg" alt="Delete Role"></li>`;

        });

        // Limpiar el input de Rol luego de agregar:
        document.getElementById("projectRoles").value = "";

    }

    let addRole = document.querySelector("#addRole").addEventListener("click", (e)=>createRole(e))

    function eraseRole(button){
        button.parentNode.remove()
        roleId = button.id
        let numberId = roleId.match(/\d+/g);
        projectRoles.splice((numberId-1), 1)
    }

    let removeRole = document.querySelector("#createdRoles-list")
    removeRole.addEventListener("click", function(e){
        if(e.target.classList.contains("deleteRole")|| e.target.closest('.deleteRole') !== null){
            let button = e.target
            eraseRole(button)
        }
    })

    // PROJECT SEARCH USERS:

    function searchUsers(){

        // Seleccionar lista de busqueda:
        let searchList = document.querySelector("#searchList");

        // Limpiar lista de busqueda:
        searchList.innerHTML = ``

        // Por cada usuario en lista de usuarios, agregar una fila con datos del usuario:
        userList.forEach(user => {

            if(user.id == USER_CURRENT.id){
                return
            }

            searchList.innerHTML += `<div class="row" id="searchUserRow-${user.id}">
                                        <div class="cell search__nick">${user.nickname}</div>
                                        <div class="cell search__name">${user.firstName} ${user.lastName}</div>
                                        <div class="cell search__email">${user.email}</div>
                                        <button class="add__member--btn" id="addUser${user.id}-btn" type="submit" value="add member">Add</button>
                                    </div>`
                
        })
    }

    searchUsers();

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
            let filteredUserList = userList.filter(user => !projectMembers.includes(user))
            filteredUserList
                .filter(user => user.nickname.includes(searchTerm))
                .forEach(user=>{
                
                if(user.id == USER_CURRENT.id){
                    return
                }

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

    // ----

    let addButton = document.querySelectorAll(".add__member--btn")

    let currentList = document.querySelector("#searchList")

    currentList.addEventListener("click", function (e) {

        if(e.target.classList.contains("add__member--btn")|| e.target.closest('.add__member--btn') !== null) {

            let myButton = e.target

            addNewMember(myButton)
        }

    })

    // PROJECT ADD MEMBERS

    let currentMembersTable = document.querySelector("#currentMembers-table")

    function addNewMember(button){

        // Se borra al usuario de la lista de search para no confundir al (usuario de la app).
        let buttonId = button.id;
        let numberId = buttonId.match(/\d+/g);
        let userFound = userList.find(user => user.id == numberId)

        let eraseRow = document.querySelector(`#searchUserRow-${numberId}`);
        eraseRow.remove();

        projectMembers.push(userFound)

        currentList = document.querySelector("#currentMembers-table")

        currentList.innerHTML = ``

        projectMembers.forEach(member => {

            if(member.id == USER_CURRENT.id){
                return
            }

            currentList.innerHTML += 
            `<div class="row currentMembersRow" id="currentMember-${member.id}">
                <div class="member__id">${member.id}</div>
                <div class="member__nick">${member.nickname}</div>
                <div class="member__name">${member.firstName} ${member.lastName}</div>
                <div class="member__role"><select name="" class="memberRole"><option value=""></option></select></div>
                <img class="member__delete eraseCurrentMember" id="eraseCurrentMember-${member.id}" src="./img/addMember_delete.svg" alt="">
            </div>`
        })


        // FOOTER CURRENT MEMBERS
        let footerCurrent = document.querySelector("#footerCurrent")
        footerCurrent.innerText = `CURRENT MEMBERS: ${projectMembers.length}` 
    }

    function addMemberRole(select){
        select.innerHTML = `<option value="" default></option>`
        projectRoles.forEach(role => {
            let option = document.createElement("option")
            option.value = role
            option.text = role
            select.append(option)
        })
    }

    // ADD ROLE TO USER
    let chooseRole = document.querySelector("#currentMembers-table")
    chooseRole.addEventListener("mousedown", function (e){
        if (e.target.classList.contains("memberRole")|| e.target.closest('.memberRole') !== null){
            let select = e.target
            let selectId = select.parentNode.parentNode.id.match(/\d+/g)
            select.id = `select-${selectId}`
            addMemberRole(select)
        }
    })

    // BIND ROLE TO USER 
    chooseRole.addEventListener("change", function (e){
        if (e.target.classList.contains("memberRole")|| e.target.closest('.memberRole') !== null){
            let select = e.target
        }
    })

    // PROJECT ERASE MEMBER

    function eraseCurrentMember(button) {

            let parent = button.parentNode.id

            let numberId = parent.match(/\d+/g);

            let removedUser = userList.find(user => user.id == numberId)

            button.parentNode.remove();
            
            searchList.innerHTML += `<div class="row" id="searchUserRow-${removedUser.id}">
                                        <div class="cell search__nick">${removedUser.nickname}</div>
                                        <div class="cell search__name">${removedUser.firstName} ${removedUser.lastName}</div>
                                        <div class="cell search__email">${removedUser.email}</div>
                                        <button class="add__member--btn" id="addUser${removedUser.id}-btn" type="submit" value="add member">Add</button>
                                    </div>`

            projectMembers.splice(removedUser, 1)

            // FOOTER CURRENT MEMBERS
            let footerCurrent = document.querySelector("#footerCurrent")
            footerCurrent.innerText = `CURRENT MEMBERS: ${projectMembers.length}` 
    }

    currentMembersTable.addEventListener("click", function(e) {

        if(e.target.classList.contains("eraseCurrentMember")|| e.target.closest('.eraseCurrentMember') !== null){

            let button = e.target
            eraseCurrentMember(button)     
        }
    })


    let submitProject = document.querySelector("#submitProject").addEventListener("click", (e)=>{

        e.preventDefault();

        projectId = projectList.length + 1;
    
        projectName = document.querySelector("#projectName").value;

        projectHost = document.querySelector("#projectHost").value;

        projectCreator = USER_CURRENT.firstName + " " + USER_CURRENT.lastName;

        projectDescr = document.querySelector("#projectDescr").value;

        projectStartDate = new Date(trueProjectTime)
        
        let endDate = document.querySelector("#projectEndDate").value 
        projectEndDate = new Date(endDate)

        function defaultImage(){
            if(projectImage == "" || projectImage == false){
                projectImage = `./img/defaultproject.png`
            }
        }
        defaultImage()

        function submitMembersAndRoles(){
            projectUserRoles = projectMembers.forEach(member => {
                let selectNode = document.querySelector(`#select-${member.id}`)
                if (selectNode == null){
                    member.role = "NONE"
                    member.admin = false
                }
                else {
                    let selectValue = selectNode.value
                    if (selectValue == ""||selectValue == null){
                    member.role = "NONE"
                    member.admin = false
                    }
                    else if (selectValue == "ADMIN") {
                        member.role = selectValue
                        member.admin = true
                    }
                    else {
                    member.role = selectValue
                    member.admin = false
                    }
                }
            })
        }
        submitMembersAndRoles()

        function addCreatorAsMember(){
            projectMembers.unshift(USER_CURRENT)
            const foundCreator = projectMembers.find(user => user.id == USER_CURRENT.id)
            foundCreator.role = "ADMIN"
            foundCreator.admin = true
        }
        addCreatorAsMember()

        projectNew = new Project(projectId, projectName, projectHost, projectCreator, projectDescr, projectStartDate, projectEndDate, projectRepos, projectRoles, projectMembers, projectImage, projectTeams, projectIssues);

        if (projectName == "" || projectHost == "" || projectDescr == ""){

            Swal.fire({
                title: "Error!",
                text: "Please complete all required fields.",
                icon: "error",
            })
            return;
            
        }

        projectList.push(projectNew);

        Swal.fire({
            title: "Done!",
            text: "Project Created",
            imageUrl: "./img/project_created.svg",
            imageWidth: "250px",
            showConfirmButton: false,
        })


        const addProject = JSON.stringify(projectList);
        localStorage.setItem("Lista de Proyectos", addProject);


        setTimeout(function(){

            location.href= "./index.html"; 

        }, 2000)
        
    });

}

createProject();



    // let projectFormReset = document.querySelector("#projectReset");

    // projectFormReset.addEventListener("click", ()=>{
    //     document.querySelector("#projectForm").reset();
    // })






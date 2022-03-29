// CARGA DE DATOS 📚

cargarDatosUsuarios();

cargarDatosProyectos();


// FUNCION CONSTRUCTORA DE CLASE DE OBJETO "PROJECT" /PROYECTOS:

function createProject(){

    // PROJECT DATES: 

    projectCreationDate = `${dayDate} ${trueMonth} ${year}`

    let showProjectDate = document.querySelector("#projectCreationDate");
    showProjectDate.innerHTML= projectCreationDate;

    showProjectCreator = document.querySelector("#projectCreator");
    showProjectCreator.innerHTML= `${USER_CURRENT.firstName} ${USER_CURRENT.lastName}`;
    console.log(USER_CURRENT)

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
            
            createdReposList.innerHTML += `<li>Repo ${counter}: <a href="${repo}" target="_blank">${repo}</a></li>`;

        });

        // Limpiar el input de Repo luego de agregar:
        document.getElementById("projectRepos").value = "";


    }

    let addRepo = document.querySelector("#addRepo").addEventListener("click", (e)=> addNewRepo(e));

    function createRole (e){

        e.preventDefault();

        projectRoles.length == 10 && alert("You have added 10 Roles");
        const maxRoles = (projectRoles.length > 20) ? true : false;

        maxRoles ? alert("You have reached the limit of roles") : alert(`You can still add ${19 - projectRoles.length} Roles`)

        // Se busca value del input de Role:
        let newRole = document.querySelector("#projectRoles").value;

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
            
            createdRolesList.innerHTML += `<li>${role}</li>`;

        });

        // Limpiar el input de Rol luego de agregar:
        document.getElementById("projectRoles").value = "";

    }

    

    

    let addRole = document.querySelector("#addRole").addEventListener("click", (e)=>createRole(e))

    let searchList = document.querySelector("#searchList");

    function searchUsers(){

        // Seleccionar lista de busqueda:
        let searchList = document.querySelector("#searchList");

        // Limpiar lista de busqueda:
        searchList.innerHTML = ``;

        // Por cada usuario en lista de usuarios, agregar una fila con datos del usuario:
        userList.forEach(user => {

            searchList.innerHTML += `<div class="row" id="searchUserRow-${user.id}">
                                        <div class="cell search__nick">${user.nickname}</div>
                                        <div class="cell search__name">${user.firstName} ${user.lastName}</div>
                                        <div class="cell search__email">${user.email}</div>
                                        <button class="add__member--btn" id="addUser${user.id}-btn" type="submit" value="add member">Add</button>
                                    </div>`
                
        console.log(user.id)

        })
    }

    searchUsers();

    

    function addUsers(){

        // Seleccionar a todos los botones de Add creados con la funcion searchUsers()
        let addButton = document.querySelectorAll(".add__member--btn");

        console.log(addButton);

        // Transformar el conjunto de nodos a un array:
        let buttonsArray = Array.from(addButton);
    
        console.log(buttonsArray);

        console.log(addButton);

        
        

        /* Por cada boton, establecer un id con el valor del contador, el cual usa el valor posicional de dicho
        boton dentro del array sumado a 1, para que los id´s comiencen en 1 y no en 0*/
        addButton.forEach(button => addNewMember(button))


        // addNewMember()
        // eraseCurrentMember()
            
        function addNewMember(button){

            let contador =  buttonsArray.indexOf(button) + 1;
        
            button.id = `addUser${contador}-btn`;


            // A cada boton agregar un evento cuya funcion sera agregar al usuario como miembro del proyecto.
            button.addEventListener("click", (e) =>{

            e.preventDefault();

            // Seleccionar la lista de current members.
            let currentMembersTable = document.querySelector("#currentMembers-table");

            console.log(buttonsArray.indexOf(button));

            console.log("CONTADOR ES IGUAL A:" + contador);
            
            /* Se busca al usuario dentro de la lista de usuarios, comparando el valor del contador con
            el del id del propio usuario*/
            let userFound = userList.find(user => user.id == contador);
            console.log(userFound?.id|| "el usuario no existe");

            // Con los datos del usuario encontrado se establece una nueva row en la tabla de current members.
            currentMembersTable.innerHTML += `
                                    <div class="row currentMembersRow" id="currentMember-${userFound.id}">
                                        <div class="cell">${userFound.id}</div>
                                        <div class="cell">${userFound.nickname}</div>
                                        <div class="cell">${userFound.firstName} ${userFound.lastName}</div>
                                        <div class="cell"><select name="" id=""></select></div>
                                        <button class="cell eraseCurrentMember" id="eraseCurrentMember-${userFound.id}"><img src="./img/addMember_delete.svg" alt=""></button>
                                    </div>
            `

            // Se borra al usuario de la lista de search para no confundir al (usuario de la app).
            let eraseRow = document.querySelector(`#searchUserRow-${userFound.id}`);
            eraseRow.remove();

            })
        }

        function eraseCurrentMember() {

            let currentMembersTable = document.querySelector("#currentMembers-table");
            currentMembersTable.addEventListener('click',function(e){
                if(e.target.classList.contains("eraseCurrentMember")|| e.target.closest('.eraseCurrentMember') !== null){

                let buttonId = e.target.parentNode.id;

                let numberId = buttonId.match(/\d+/g);

                console.log(numberId)

                let user = userList[numberId - 1];
                
                console.log(user)

                searchList.innerHTML += `<div class="row" id="searchUserRow-${user.id}">
                                        <div class="cell search__nick">${user.nickname}</div>
                                        <div class="cell search__name">${user.firstName} ${user.lastName}</div>
                                        <div class="cell search__email">${user.email}</div>
                                        <button class="add__member--btn" id="addUser${user.id}-btn" type="submit" value="add member">Add</button>
                                    </div>`
                
                e.target.parentNode.parentNode.remove()

                
                searchList.addEventListener('click', function(e) {
                    if(e.target.classList.contains("add__member--btn")|| e.target.closest('.add__member--btn') !== null){
                        let buttonId = e.target.id;

                        let numberId = buttonId.match(/\d+/g);

                        let user = userList[numberId - 1]

                        currentMembersTable.innerHTML += `
                                    <div class="row currentMembersRow" id="currentMember-${user.id}">
                                        <div class="cell">${user.id}</div>
                                        <div class="cell">${user.nickname}</div>
                                        <div class="cell">${user.firstName} ${user.lastName}</div>
                                        <div class="cell"><select name="" id=""></select></div>
                                        <button class="cell eraseCurrentMember" id="eraseCurrentMember-${user.id}"><img src="./img/addMember_delete.svg" alt=""></button>
                                    </div>
                                    `
                            let eraseRow = document.querySelector(`#searchUserRow-${user.id}`);
                            eraseRow.remove();
                    }
                })
                

                // let searchList = document.querySelector("#searchList");
                }
            })
            eraseButtons = document.querySelectorAll(".currentMembersRow");



            // console.log(eraseButtons)

            // eraseButtons.forEach(btn=>{

            //     btn.addEventListener("click", ()=>{

            //         console.log("hey")

            //     })

            // })
        }

        eraseCurrentMember();

    }

    
            

                // boton = document.querySelectorAll(`.eraseCurrentMember`);

                // console.log(boton);

                // boton.forEach(btn=>{

                //     btn.addEventListener("click", (e)=>{

                //         e.preventDefault();

                //         console.log("HI");
                //         btn.parentNode.parentNode.remove()

                //         let newRow = document.createElement("div")

                //         newRow.id = `searchUserRow-${userFound.id}`

                //         newRow.className = `row`

                //         newRow.innerHTML = `<div class="cell search__nick">${userFound.nickname}</div>
                //         <div class="cell search__name">${userFound.firstName} ${userFound.lastName}</div>
                //         <div class="cell search__email">${userFound.email}</div>
                //         <button class="add__member--btn" id="addUser${userFound.id}-btn" type="submit" value="add member">Add</button>`

                //         document.querySelector("#searchList").appendChild(newRow)

                //         newButtons = document.querySelectorAll(".add__member--btn")
                //         newButtonsArray = Array.from(newButtons);

                //         newButtonsArray.forEach(button => {



                //         })
                        



                        // searchList.innerHTML += `<div class="row" id="searchUserRow-${userFound.id}">
                        //                 <div class="cell search__nick">${userFound.nickname}</div>
                        //                 <div class="cell search__name">${userFound.firstName} ${userFound.lastName}</div>
                        //                 <div class="cell search__email">${userFound.email}</div>
                        //                 <button class="add__member--btn" id="addUser${userFound.id}-btn" type="submit" value="add member">Add</button>
                        //             </div>`

                //     })

                // })

                // boton.addEventListener("click", (e)=>{

                //     e.preventDefault();

                //     console.log("HI");
                //     boton.parentNode.parentNode.remove()
                //     // row = document.querySelector(`#currentMember-${userFound.id}`);
                //     // console.log(row);
                //     // row.remove()

                // })

                // function eraseCurrentMember(button){

                //     button = d.parentNode.parentNode;
                //     console.log(parent);
            
                //     }


            



    
    


    addUsers();

    // BORRAR CURRENT MEMBER:

    

    

    
    // .addEventListener("click", ()=>{

    //     

    // })

    // let showProject = document.querySelector("#showProjects");

    let submitProject = document.querySelector("#submitProject").addEventListener("click", (e)=>{

        e.preventDefault();

        console.log(projectList)
        console.log(projectList.length)

        projectId = projectList.length + 1;
        console.log(projectId)
    
        projectName = document.querySelector("#projectName").value;
        console.log(projectName)
    
        projectHost = document.querySelector("#projectHost").value;
        console.log(projectHost)

        projectDescr = document.querySelector("#projectDescr").value;
        console.log(projectDescr);

        projectEndDate = document.querySelector("#projectEndDate").value;
        console.log(projectEndDate);
        
        projectRoles = document.querySelector("#projectRoles").value;
        console.log(projectRoles);

        projectCreator = USER_CURRENT.firstName + " " + USER_CURRENT.lastName;
    
        projectNew = new PROJECT(projectId, projectName, projectHost, projectCreator, projectDescr, projectCreationDate, projectEndDate, projectRepos, projectRoles, projectMembers);

        if (projectName == "" || projectHost == "" || projectDescr == ""){

            Swal.fire({
                title: "Error!",
                text: "Please complete all required fields.",
                icon: "error",
            })
            return;
            
        }

        console.log(projectNew);

        projectList.push(projectNew);

        

        Swal.fire({
            title: "Done!",
            text: "Project Created",
            imageUrl: "./img/project_created.svg",
            imageWidth: "250px",
            showConfirmButton: false,
        })

        

    

        console.log(projectList);

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






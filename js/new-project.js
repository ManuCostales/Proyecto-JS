// FUNCION CONSTRUCTORA DE CLASE DE OBJETO "PROJECT" /PROYECTOS:

function createProject(){

    projectCreationDate = `${dayDate} ${trueMonth} ${year}`

    let showProjectDate = document.querySelector("#projectCreationDate");
        showProjectDate.innerHTML= projectCreationDate;

    projectCreator = document.querySelector("#projectCreator");
    projectCreator.innerHTML= `${USER_CURRENT.firstName} ${USER_CURRENT.lastName}`;
    console.log(USER_CURRENT)

    let addRepo = document.querySelector("#addRepo").addEventListener("click", (e)=>{
        e.preventDefault();

         let newRepo = document.querySelector("#projectRepos").value;

         projectRepos.push(newRepo);

        console.log(projectRepos);

    })

    // let addRole = document.querySelector("#addRole").addEventListener("click", (e)=>{
    //     e.preventDefault();

    //      let newRole = document.querySelector("#projectRoles").value;

    //      projectRoles.push(newRole);

    //     console.log(projectRoles);

    //     createdRolesList = document.querySelector("#createdRolesList");

    //     projectRoles.forEach(role => {
    //         console.log(projectRoles);
    //         let listItem = document.createElement("li");
    //         console.log(listItem)
    //         listItem.innerHTML = `${role}`;
    //         console.log(listItem);
    //         createdRolesList.append(listItem)
    //     });

    // })

    // let searchList = document.querySelector("#searchList");

    // userList.forEach(user => {
        
    //     let row = document.createElement("div");



    // });

    // let showProject = document.querySelector("#showProjects");

    let submitProject = document.querySelector("#submitProject").addEventListener("click", (e)=>{

        e.preventDefault();

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
    
        projectNew = new PROJECT(projectId, projectName, projectHost, projectCreator, projectDescr, projectCreationDate, projectEndDate, projectRepos, projectRoles, projectMembers);

        console.log(projectNew);

        projectList.push(projectNew);

        alert("Project Created!");

        console.log(projectList)

        const addProject = JSON.stringify(projectList);
        localStorage.setItem("Lista de Proyectos", addProject);

        location.href= "./index.html";

    
    });

}

createProject();



    // let projectFormReset = document.querySelector("#projectReset");

    // projectFormReset.addEventListener("click", ()=>{
    //     document.querySelector("#projectForm").reset();
    // })






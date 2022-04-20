// ARCHIVO JS DE MANEJO DE DATOS/DATA:📚

// 1-------------------------GUARDAR DATOS: 

// 1.1 GUARDAR USUARIO: 

function guardarUsuario(userNew){

    userList.push(userNew);
    const saveUserList = JSON.stringify(userList);
    localStorage.setItem("Lista de Usuarios", saveUserList);

}

// 1.2 GUARDAR USUARIO ACTIVO:

function guardarUsuarioActivo(currentUser) {

    let saveUserCurrent = JSON.stringify(currentUser);
    localStorage.setItem("Usuario Activo", saveUserCurrent);

}


// 1.3 GUARDAR PROYECTO:

function guardarProyecto(projectNew){

    projectList.push(projectNew);
    const saveProjectList = JSON.stringify(projectList);
    localStorage.setItem("Lista de Proyectos", saveProjectList);

}

// 1.4 GUARDAR EQUIPO:

function guardarEquipo(teamNew){
    teamList.push(teamNew)
    const saveTeamList = JSON.stringify(teamList);
    localStorage.setItem("Lista de Equipos", saveTeamList)
}

// 2-------------------------CARGAR DATOS: 

// 2.1 CARGAR DATOS DE USUARIOS:

function cargarDatosUsuarios(){

    userList = JSON.parse(localStorage.getItem("Lista de Usuarios"));

    if (userList == null){
        userList = []
    }

    userList.forEach(user => {

        function loadUserProjects(){
            if(projectList == null || projectList == undefined){
                console.log("%cNO PROJECT STORED", "color: white; background-color: red; padding: 0.5rem 1rem; border: 5px double white; border-radius: 15px;")
                projectList = []
            }
            else {
            }
        }
        loadUserProjects()
        function loadUserTeams(){
            if(teamList == null || teamList == undefined){
                console.log("%cNO PROJECT STORED", "color: white; background-color: red; padding: 0.5rem 1rem; border: 5px double white; border-radius: 15px;")
                teamList = []
            }
            else {
            user.teams = teamList.filter(team => team.members.find(member => member.id == user.id))
            }
        }
        loadUserTeams()
        user.issues = []
    })

    USER_CURRENT = JSON.parse(localStorage.getItem("Usuario activo"));
    
    

    try {

        USER_CURRENT.teams = teamList.filter(team => team.members.find(member => member.id == USER_CURRENT.id))
        USER_CURRENT.projects = projectList.filter(project => project.members.find(member => member.id == USER_CURRENT.id))
        USER_CURRENT.issues = []


        function mostrarDatosUsuario(){
            navCurrentUser = document.querySelector("#nav-current-user");
            usernick = USER_CURRENT.nickname;
            navCurrentUser.innerHTML = usernick;
        }
        mostrarDatosUsuario();
    } catch (error) {
        
    }

    console.log("%cUSER DATA LOADED", "color: white; background-color: limegreen; padding: 0.5rem 1rem; border: 5px double white; border-radius: 15px;")    

}

// 2.2 CARGAR DATOS DE PROYECTOS:

function cargarDatosProyectos(){

    issuesList = JSON.parse(localStorage.getItem("Lista de Tareas"))

    projectList = JSON.parse(localStorage.getItem("Lista de Proyectos"))

    console.log("%cPROJECT DATA LOADED", "color: white; background-color: limegreen; padding: 0.5rem 1rem; border: 5px double white; border-radius: 15px;")
}

// 2.3 CARGAR DATOS DE EQUIPOS

function cargarDatosEquipos(){

    teamList = JSON.parse(localStorage.getItem("Lista de Equipos"))

    if (teamList == null){
        teamList = []
    }

    console.log("%cTEAM DATA LOADED", "color: white; background-color: limegreen; padding: 0.5rem 1rem; border: 5px double white; border-radius: 15px;")
}

// 2.4 CARGAR DATOS DE ISSUES

function cargarDatosIssues(){

    issueList = JSON.parse(localStorage.getItem("Lista de Tareas"))

    if (issueList == null){
        issueList = []
    }

    console.log("%cISSUE DATA LOADED", "color: white; background-color: limegreen; padding: 0.5rem 1rem; border: 5px double white; border-radius: 15px;")
}



// 3. COMPROBAR SI EL CURRENT USER ES ADMIN DEL PROYECTO: 

function isUserAdmin(project){
    const findCurrentUser = project.members.find(member => member.id == USER_CURRENT.id)
    let isUserAdmin = findCurrentUser.admin
    return isUserAdmin
}


// 4. DESLOGUEAR

try {
    function desloguear() {

        const logOff = document.querySelector("#log-off");
    
        logOff.addEventListener("click", ()=>{
    
            localStorage.removeItem("Usuario Activo");
    
            location.href= "./user_login.html";
    
        })
    
    }
    
    // desloguear();
} catch (error) {
    
}


// 5 ENVIAR A LOG

function sendToLogin(){

    if(USER_CURRENT == null || USER_CURRENT == ""){
        location.href= "./user_login.html"
    }
    else {
        return
    }
}




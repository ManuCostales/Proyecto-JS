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


// 2-------------------------CARGAR DATOS: 

// 2.1 CARGAR DATOS DE USUARIOS:

function cargarDatosUsuarios(){

    userList = JSON.parse(localStorage.getItem("Lista de Usuarios"));
    console.log(userList);

    userList.forEach(user => {
        if(projectList == null){
            console.log("%cNO PROJECT STORED", "color: white; background-color: red; padding: 0.5rem 1rem; border: 5px double white; border-radius: 15px;")
            projectList = []
        }
        else {
        user.projects = projectList.filter(project => project.members.find(member => member.id == user.id))
        }
        user.teams = []
        user.issues = []
    })

    USER_CURRENT = JSON.parse(localStorage.getItem("Usuario activo"));
    console.log(USER_CURRENT);

    USER_CURRENT.projects = projectList.filter(project => project.members.find(member => member.id == USER_CURRENT.id))
    USER_CURRENT.teams = []
    USER_CURRENT.issues = []

    function mostrarDatosUsuario(){
        navCurrentUser = document.querySelector("#nav-current-user");
        usernick = USER_CURRENT.nickname;
        navCurrentUser.innerHTML = usernick;
    }

    mostrarDatosUsuario();

    console.log("%cUSER DATA LOADED", "color: white; background-color: limegreen; padding: 0.5rem 1rem; border: 5px double white; border-radius: 15px;")    

}

// 2.2 CARGAR DATOS DE PROYECTOS:

function cargarDatosProyectos(){

    projectList = JSON.parse(localStorage.getItem("Lista de Proyectos"));
    console.log(projectList);

    console.log("%cPROJECT DATA LOADED", "color: white; background-color: limegreen; padding: 0.5rem 1rem; border: 5px double white; border-radius: 15px;")

}




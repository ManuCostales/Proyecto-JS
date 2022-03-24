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

    USER_CURRENT = JSON.parse(localStorage.getItem("Usuario activo"));
    console.log(USER_CURRENT);

    userList = JSON.parse(localStorage.getItem("Lista de Usuarios"));
    console.log(userList);

}

// 2.2 CARGAR DATOS DE PROYECTOS:

function cargarDatosProyectos(){

    projectList = JSON.parse(localStorage.getItem("Lista de Proyectos"));
    console.log(projectList);

}




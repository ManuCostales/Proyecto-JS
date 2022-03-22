
function init(){};

// ISSUE TRACKER:

// FUNCION CONSTRUCTORA DE CLASE DE OBJETO "USER" /USUARIOS:

// class user {
//     constructor(nickname, firstName, lastName, role, email, phone, password) {
//         this.nickname = nickname;
//         this.firstName = firstName;
//         this.lastName = lastName;
//         this.role = role;
//         this.email = email;
//         this.phone = phone;
//         this.password = password;
//         }
//     info() {
//         return `<br>
//         Nickname: ${this.nickname}<br>
//         Usuario: ${this.firstName} ${this.lastName}.<br>
//         Rol: ${this.role}.<br>
//         Email: ${this.email}<br>
//         Telefono: ${this.phone}`
//     }
// }

// let userList = []

// // FUNCION CREADORA DE OBJETOS DE CLASE "USER":

// function register() {

//     let usuario;

//     let nickname = prompt("Introduce tu nickname");

//     let nombre = prompt("Introduce tu nombre:");

//     while (!isNaN(nombre) || nombre === "") {
//         alert("Por favor, introduce solo letras.");
//         nombre = prompt("Introduce tu nombre:");
//     }

//     let apellido = prompt("Introduce tu apellido")

//     while (!isNaN(apellido) || apellido === "") {
//         alert("Por favor, introduce solo letras.");
//         apellido = prompt("Introduce tu apellido");
//     }
    
//     let rol = prompt("Introduce tu rol (Admin / Dev / Demo)");
    
//     while (!isNaN(rol) || rol === "") {
//         alert("Por favor, introduce solo letras.");
//         rol = prompt("Introduce tu rol");
//     }
    
//     let mail = prompt("Introduce tu email");

//     while (mail === "") {
//         alert("Por favor, introduce tu email");
//         mail = prompt("Introduce tu email");
//     }
    
//     let tel = parseInt(prompt("Introduce tu telefono:"));

//     while (isNaN(tel) || tel === "") {
//         alert("Por favor, introduce solo numeros.");
//         tel = prompt("Introduce tu telefono:");
//     }

//     let contraseña = prompt("Introduce una contraseña");

//     let contraconfirm = prompt("Confirma la contraseña");

//     while (contraseña === "" || contraconfirm !== contraseña) {
//         alert("Las contraseñas no coinciden")
//         contraseña = prompt("Vuelve a introducir una contraseña");
//         contraconfirm = prompt("Confirma la contraseña")
//     }

//     usuario = new user(nickname, nombre, apellido, rol, mail, tel, contraseña);
//     userList.push(usuario);
//     alert("Has sido registrado!\n" + nickname + "\n" + nombre + " " + apellido + "\n" + rol + "\n" + mail + "\n" + tel);
//     document.write(`<br><b>Usuario Activo:</b>` + usuario.info());
//     console.log(userList);
// }

// register();




// // USO DE OBJETO .Date PARA FECHAS:

            let today = new Date();
            let year = today.getFullYear();
            let month = today.getMonth();
            let monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            let trueMonth = monthList[month];
            let day = today.getDay();
            let daylist = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            let trueDay = daylist[day];
            let dayDate = today.getDate();
            let hour = today.getHours();
            let minutes = today.getMinutes();
            let seconds = today.getSeconds();

            let clock = document.querySelector("#showDate__text");
        clock.innerHTML= `${trueDay}, ${trueMonth}, ${year}<br>
        ${hour}:${minutes}:${seconds}`;


// CLOCK:

    function currentTime(){

        today = new Date();
        year = today.getFullYear();
        month = today.getMonth();
        monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        trueMonth = monthList[month];
        day = today.getDay();
        daylist = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        trueDay = daylist[day];
        dayDate = today.getDate();
        hour = today.getHours();
        minutes = today.getMinutes();
        seconds = today.getSeconds();

        hour = (hour < 10) ? "0" + hour : hour;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        clock = document.querySelector("#showDate__text");
        clock.innerHTML= `${trueDay}, ${trueMonth}, ${year}<br>
        ${hour}:${minutes}:${seconds}`;    
    }

   setInterval(currentTime, 1000)

   

   





// // FUNCION CONSTRUCTORA DE CLASE DE OBJETO "PROJECT" /PROYECTOS:

// class project {
//     constructor(id, title, lead, descr, members, date) {
//         this.title = title;
//         this.lead = lead;
//         this.descr = descr;
//         this.members = members;
//         this.date = date;
//         this.id = id;
//         }
//     info() {
//         return `<br>
//         Nombre: ${this.title}.<br>
//         Lider: ${this.lead}<br>
//         Descripcion: ${this.descr}<br>
//         Equipo: ${this.members} miembros<br>
//         Fecha de Creacion: ${this.date}`
//     }
// }

// let projectList = [];

// // FUNCION CREADORA DE OBJETOS DE CLASE "PROJECT":

// function projectCreator() {

//     let projectCounter = 0;
//     projectCounter++;

//     let projectCreation = prompt("Bienvenido a la creacion de proyectos. Si no quieres agregar ningun proyecto, escribe 'TERMINAR'. De lo contrario, pulsa ENTER.")

//         while (projectCreation != "TERMINAR") {

//             let projectContador = projectCounter++;

//             projectName = prompt("Introduce el nombre del proyecto:");
    
//             while (!isNaN(projectName) || projectName === "") {
//                 alert("Por favor, introduce un nombre.");
//                 projectName = prompt("Introduce el nombre del proyecto:");
//             }
    
//             projectLead = prompt("Introduce el nombre del encargado del proyecto")
    
//             while (!isNaN(projectLead) || projectLead === "") {
//                 alert("Por favor, introduce solo letras.");
//                 projectLead = prompt("Introduce el nombre del encargado del proyecto");
//             }
            
//             projectDescr = prompt("Introduce una descripcion del proyecto:");
            
//             while (!isNaN(projectDescr) || projectDescr === "") {
//                 alert("Por favor, introduce una descripcion.");
//                 projectDescr = prompt("Introduce una descripcion del proyecto:");
//             }
            
//             projectMembers = parseInt(prompt("Introduce la cantidad de miembros inicial del proyecto"));
    
//             while (isNaN(projectMembers) || projectMembers === "") {
//                 alert("Por favor, introduce solo numeros");
//                 projectMembers = parseInt(prompt("Introduce la cantidad de miembros inicial del proyecto"));
//             }
            
            

//             projecto = new project (projectContador, projectName, projectLead, projectDescr, projectMembers, projectDate);

//             projectList.push(projecto);

//             projectNumber = projectList.indexOf(projecto) + 1;

//             document.write(`<br>` + `<br><b>Proyecto ${projectNumber}</b>` + projecto.info())

//             alert("Projecto Creado!");
    
//             projectCreation = prompt("Bienvenido a la creacion de proyectos. Si no quieres agregar ningun proyecto, escribe 'TERMINAR'. De lo contrario, pulsa ENTER.")
//     }

//     if (projectCreation == "TERMINAR"){
//         alert("No has registrado este proyecto");
//     }

// }

// projectCreator();

// console.log(projectList);

// // CREACION DE NUEVO ARRAY A PARTIR DEL ARRAY PROJECTLIST CON EL METODO ".MAP()"

// let projectsNameAndNumber = projectList.map(a => a.id + " " + a.title);

// console.log(projectsNameAndNumber);





// // FUNCION CONSTRUCTORA DE CLASE DE OBJETO "TEAM" /EQUIPOS:

// class team{
//     constructor(id, teamname, members, membernumber, date) {
//         this.id = id;
//         this.teamname = teamname;
//         this.members = members;
//         this.membernumber = membernumber;
//         this.date = date;
//     }
//     info(){
//         return `<br>
//         ID: ${this.id}<br>
//         Nombre:${this.teamname}<br>
//         Miembros: ${this.members}<br>
//         Total de miembros: ${this.membernumber}<br>
//         Fecha de creación: ${this.date}`
//     }
// }

// let teamList = [];

// // FUNCION CREADORA DE OBJETOS DE CLASE "TEAM":

// function teamCreator() {

//     let teamMembers;

//     let teamCreator = prompt("Crea uno o mas equipos para asignarlos al proyecto. Presiona ENTER para continuar. Escribe 'TERMINAR' si ya has terminado.");

//     contador = 0;
//     contador++;

//     while(teamCreator != "TERMINAR"){

        
//         counter = contador++;

//         let teamName = prompt("Elige un nombre para el Equipo " + counter + ":");
//         while(teamName == ""){
//             alert("Por favor introduce un nombre.")
//             teamName = prompt("Elige un nombre para el Equipo " + counter + ":");
//         }

//         let memberNumber = prompt("Ingresa el numero de miembros del equipo");
//         while(isNaN(memberNumber)|| memberNumber == ""){
//             alert ("Por favor introduce solo numeros");
//             memberNumber = prompt("Ingresa el numero de miembros del equipo");
//         }

//         teamMembers = []

//         for (let i = 1; i <= memberNumber; i++) {

//             let teamMember = prompt("Ingresa el nickname del integrante n°"+ i);
//             while (teamMember == "" || teamMember == " ") {

//                 alert("Por favor introduce solo letras");
//                 teamMember = prompt("Ingresa el nickname del integrante n°"+ i);
//             }
//             teamMembers.push(teamMember);
//         }

//         teamDate = `${trueDay} ${dayDate} de ${trueMonth} de ${year}, a las ${hour}hs.`;
        
//         newTeam = new team (counter, teamName, teamMembers, memberNumber, teamDate);

//         teamList.push(newTeam);

//         document.write(`<br>` + `<br><b>Equipo ${counter}</b>` + newTeam.info() + `</br>`);

//         alert ("Equipo Creado!")

//         teamCreator = prompt("Crea uno o mas equipos para asignarlos al proyecto. Presiona ENTER para continuar. Escribe 'TERMINAR' si ya has terminado.");

//     }

//     console.log(teamMembers);

// }

// teamCreator();
// console.log(teamList);
// console.log(teamList.members);


// // CREACION DE NUEVO ARRAY A PARTIR DEL ARRAY TEAMLIST CON EL METODO ".MAP()"

// let teamsNameId = teamList.map(a => a.id + " " + (a.teamname));

// console.log(teamsNameId);





// // FUNCION DE ASIGNACION DE EQUIPOS A PROYECTOS:

// function asignation(){

//     document.write(`<br><b>EQUIPOS ASIGNADOS:</b><br>`)

//     let asignar = prompt("Bienvenido a la asignacion de equipos. Presiona ENTER para continuar. Escribe 'TERMINAR' para cancelar la operación.")

//     while(asignar != "TERMINAR") {
//         let projectChosen = parseInt(prompt("Elige un Proyecto al que quieras asignar un equipo(Ingresar el Numero):\n" + projectsNameAndNumber.join("\n"))) - 1;

//         console.log(projectChosen)

//         let teamChosen = parseInt(prompt("Elije un equipo para asignar (Ingresar el Numero):\n" + teamsNameId.join("\n"))) - 1

//         console.log(teamChosen)

//         let asignacion = alert("Se ha asignado el equipo " + teamsNameId[teamChosen] + " al proyecto N°"  + projectsNameAndNumber[projectChosen])

//         document.write(teamsNameId[teamChosen] +  " - " + projectsNameAndNumber[projectChosen] + `<br>`)

//         asignar = prompt("Bienvenido a la asignacion de equipos. Presiona ENTER para continuar. Escribe 'TERMINAR' para cancelar la operación.")
//     }

// }

// asignation();


// FIN (...HASTA EL MOMENTO.)

// let taskInput = document.querySelector("#task");

// let submitButton = document.querySelector("#submit");

// let taskArray = [];

// let contador = 1;
// let contador2 = contador++;
// let counter;



// submitButton.addEventListener("click", ()=>{

//     counter = contador2++;

//     taskArray.push(taskInput.value);
//     console.log(taskArray);
    
//     let issue = document.createElement("p");

//     issue.innerHTML = `<br><p id="p-${counter} class="parrafo">${counter}:${taskInput.value}</p>`;

//     document.body.append(issue);

// })



// let eraseButton = document.getElementById("delete");

// let parrafo = document.getElementsByClassName("p-2");

// eraseButton.addEventListener("click", ()=>{

//     parrafo.remove();

// }
// )



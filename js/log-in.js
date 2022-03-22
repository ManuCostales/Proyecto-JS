

// Ingreso de usuario/validacion de datos:

let userNameEmail;
let userLoginPassword;

const userLogin = document.querySelector("#user-login").addEventListener("click",(e)=>{

    e.preventDefault();

    userNameEmail = document.querySelector("#user-login-nameEmail").value;
    console.log(userNameEmail);

    userLoginPassword = document.querySelector("#user-login-password").value;
    console.log(userLoginPassword);

    // 1 VALIDACION DE DATOS:
    // 1.2 VALIDACION DE NOMBRE/EMAIL:

    // Carga de datos de la lista de usuarios
    
    cargarDatosUsuarios();

    // Creacion de maps con datos especificos (nickname e email)

    let userNickList = userList.map(a=>a.nickname);
    console.log(userNickList);

    let userEmailList = userList.map(a=>a.email);
    console.log(userEmailList);

    // Variables booleanas

    let userValidateNick = userNickList.includes(userNameEmail);
    console.log(userValidateNick);
    let userValidateEmail = userEmailList.includes(userNameEmail);
    console.log(userValidateEmail);

    // Condicional

    if(userValidateNick == true){

        // Si el nickname es encontrado, a continuacion se busca ese nickname en la lista de usuarios y se trae al usuario que coincida con ese nickname:
        let userFound = userList.find((userList)=>
            userList.nickname == userNameEmail
        )
        console.log(userFound);

        // Luego, de este usuario se extrae la contraseña para la validacion.
        userFoundPassword = userFound.password;
        console.log(userFoundPassword);

        // VALIDACION DE CONTRASEÑA:
        if (userLoginPassword == userFoundPassword) {

            USER_CURRENT = userFound;

            let saveUser = JSON.stringify(USER_CURRENT);
            localStorage.setItem("Usuario activo", saveUser);

            location.href= "./index.html";

        }
        else {
            alert("Wrong password. Please try again.")
        }
        

    }
    else if(userValidateEmail == true){

        // Si el nickname es encontrado, a continuacion se busca ese nickname en la lista de usuarios y se trae al usuario que coincida con ese nickname:
        let userFound = userList.find((userList)=>
            userList.email == userNameEmail
        )
        console.log(userFound);

        // Luego, de este usuario se extrae la contraseña para la validacion.
        userFoundPassword = userFound.password;
        console.log(userFoundPassword);

        // VALIDACION DE CONTRASEÑA:
        if (userLoginPassword == userFoundPassword) {

            USER_CURRENT = userFound;

            let saveUser = JSON.stringify(USER_CURRENT);
            localStorage.setItem("Usuario activo", saveUser);

            location.href= "./index.html";

        }
        else {
            alert("Wrong password. Please try again.")
        }

    }
    else {
        alert("User not found. Please try again or sign up");
    }


});





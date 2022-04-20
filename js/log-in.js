// DATA LOAD: 📚

cargarDatosProyectos();

cargarDatosUsuarios();

cargarDatosEquipos();

cargarDatosIssues();

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

            Swal.fire({
                title: "Good!",
                text: "Correct Login",
                imageUrl: "./img/login_good.svg",
                imageWidth: "250px",
                showConfirmButton: false,
                icon: "success",
            })

            setTimeout(function(){

                location.href= "./index.html"; 
    
            }, 2000)

        }
        else {
            Swal.fire({
                title: "Error!",
                text: "Wrong password. Please try again or register",
                icon: "error",
            })
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

            Swal.fire({
                title: "Good!",
                text: "Correct Login",
                imageUrl: "./img/login_good.svg",
                imageWidth: "250px",
                showConfirmButton: false,
                icon: "success",
            })
            
            alert("nice")

            setTimeout(function(){

                location.href= "./index.html"; 
    
            }, 2000)

        }
        else {
            Swal.fire({
                title: "Error!",
                text: "Wrong password. Please try again",
                icon: "error",
            })
            
        }

    }
    else {
        Swal.fire({
            title: "Error!",
            text: "User not found. Plase try again or sign up",
            icon: "error",
        })
    }


});





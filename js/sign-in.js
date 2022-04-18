// DATA LOAD: 📚

cargarDatosProyectos();

cargarDatosUsuarios();

// FUNCION CONSTRUCTORA DE CLASE DE OBJETO "USER" /USUARIOS:

console.log("USER_CURRENT")

console.log("userList")

function crearUsuario () {

    let submitUserLogin = document.querySelector("#registerUser").addEventListener("click", (e)=>{

        e.preventDefault();

        userId = userList.length + 1;
        console.log(userId)
    
        userName = document.querySelector("#userName").value;
        console.log(userName)
    
        userLastName = document.querySelector("#userLastName").value;
        console.log(userLastName)
    
        userNickName = document.querySelector("#userNickname").value;
        console.log(userNickName)
    
        userEmail = document.querySelector("#userEmail").value;
        console.log(userEmail)

        userPhone = document.querySelector("#userPhone").value;
        console.log(userPhone)

        userFirstPassword = document.querySelector("#userPassword").value;
        // console.log(userPassword)

        userSecondPassword = document.querySelector("#userConfirmPassword").value;
        // console.log(userSecondPassword)

        let userProjects = []
        let userTeams = []
        let userIssues = []

        if (userName == "" || userLastName == "" || userNickName == "" || userEmail == ""  || userPhone == ""){

            Swal.fire({
                title: "Error!",
                text: "Some fields are empty. Please complete them.",
                icon: "error",
            })
            return;

        }

        if (userSecondPassword !== userFirstPassword || (userFirstPassword == "" && userSecondPassword == "")) {

            Swal.fire({
                title: "Error!",
                text: "Passwords don´t match. Plase enter a new password.",
                icon: "error",
            })
            return;

        }

        userPassword = userSecondPassword;
        console.log(userPassword)

        userNew = new User(userId, userName, userLastName, userNickName, userEmail, userPhone, userPassword, userProjects, userTeams, userIssues)

        userList.push(userNew);

        Swal.fire({
            title: "Good!",
            text: "Correct Login",
            imageUrl: "./img/signIn_success.svg",
            imageWidth: "250px",
            showConfirmButton: false,
            icon: "success",
        })

        console.log(userList);

        const addUser = JSON.stringify(userList);
        localStorage.setItem("Lista de Usuarios", addUser);

        USER_CURRENT = userNew;

        console.log(USER_CURRENT);

        let saveUser = JSON.stringify(USER_CURRENT);
        localStorage.setItem("Usuario activo", saveUser);


        setTimeout(function(){

            location.href= "./index.html"; 

        }, 2000)

    });

}

crearUsuario();
    

console.log(USER_CURRENT)


console.log(userList)




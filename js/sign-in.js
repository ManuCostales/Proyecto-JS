// DATA LOAD: 📚

cargarDatosProyectos();

cargarDatosUsuarios();

cargarDatosEquipos();

cargarDatosIssues();

// FUNCION CONSTRUCTORA DE CLASE DE OBJETO "USER" /USUARIOS:

console.log("USER_CURRENT")

console.log("userList")

function crearUsuario () {

    let submitUserLogin = document.querySelector("#registerUser").addEventListener("click", (e)=>{

        e.preventDefault();

        userId = userList.length + 1;
    
        userName = document.querySelector("#userName").value;
    
        userLastName = document.querySelector("#userLastName").value;
    
        userNickName = document.querySelector("#userNickname").value;
    
        userEmail = document.querySelector("#userEmail").value;

        userPhone = document.querySelector("#userPhone").value;

        userFirstPassword = document.querySelector("#userPassword").value;

        userSecondPassword = document.querySelector("#userConfirmPassword").value;

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


        const addUser = JSON.stringify(userList);
        localStorage.setItem("Lista de Usuarios", addUser);

        USER_CURRENT = userNew;


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




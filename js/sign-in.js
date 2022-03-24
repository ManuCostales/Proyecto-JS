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

        if (userSecondPassword !== userFirstPassword || (userFirstPassword == "" && userSecondPassword == "")) {

            alert("Passwords don´t match. Plase enter a new password.")
            return;

        }

        

        if (userName == "" || userLastName == "" || userNickName == "" || userEmail == ""  || userPhone == ""){

            alert("Some fields are empty. Please complete them.")
            return;

        }

        userPassword = userSecondPassword;
        console.log(userPassword)
    
        userDate = `${trueDay} ${dayDate} de ${trueMonth} de ${year}, a las ${hour}hs.`;
        console.log(userDate)

        userNew = new USER(userId, userName, userLastName, userNickName, userEmail, userPhone, userPassword)

        userList.push(userNew);

        alert("User Created!")

        console.log(userList);

        const addUser = JSON.stringify(userList);
        localStorage.setItem("Lista de Usuarios", addUser);

        USER_CURRENT = userNew;

        console.log(USER_CURRENT);

        let saveUser = JSON.stringify(USER_CURRENT);
        localStorage.setItem("Usuario activo", saveUser);


        location.href= "./index.html";

    });


    // let userFormReset = document.querySelector("#userReset");

    // userFormReset.addEventListener("click", ()=>{
    //     document.querySelector("#userForm").reset();
    // })

}

crearUsuario();
    

console.log(USER_CURRENT)


console.log(userList)




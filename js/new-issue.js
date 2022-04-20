// CARGA DE DATOS 📚
cargarDatosProyectos();

cargarDatosUsuarios();

cargarDatosEquipos();

cargarDatosIssues()

desloguear();

sendToLogin()

// FUNCION CONSTRUCTORA DE CLASE DE OBJETO "ISSUE" /TAREAS:

Toastify({
    text: "You can create a new issue if a certain task needs to be done. The issue can have different priorities and be of different types. You can also assign a whole team to complete it.",
    duration: 5000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00D0DD, #8D83FF)",
    },
    onClick: function(){} // Callback after click
  }).showToast();

function createIssue(){

    if(USER_CURRENT.projects.length === 0){
        alert("Before creating an Issue, you must first create a project or be part of one")
        location.href= "./index.html";
    }

    // ISSUE PROJECT: 

    let chosenProject

    function selectIssueProject(){

        const selectNode = document.querySelector("#select-issue-project")
        let projectsToChoose = []
        USER_CURRENT.projects.forEach(project => {
            const user = project.members.find(user => user.id == USER_CURRENT.id)
            const isUserAdmin = user.admin
            if(isUserAdmin == true){
                projectsToChoose.push(project)
            }
        })
        
        function addProjectOption(){
            projectsToChoose.forEach(project => {
                selectNode.innerHTML+= `<option id="project-option-${project.id}" class="project__option" value="${project.title}">${project.title}</option>`
            })
        }
        addProjectOption()

        let searchList = document.querySelector("#searchList");

        function choseProject(){
            if(projectsToChoose.length == 1){
                addedProject(projectsToChoose[0])
            }
            selectNode.addEventListener("click", ()=> {
                const options = selectNode.querySelectorAll(".project__option")
                const optionsArray = Array.from(options);
                const chosenOption = optionsArray.find(option => (option.value == selectNode.value))
                const id = chosenOption.id.match(/\d+/g)
                const chosenProject = projectsToChoose.find(project => project.id == id)
                addedProject(chosenProject)
            })
            function addedProject(project){
                const showProject = document.querySelector("#chosen-team-project")
                showProject.innerHTML = `<h4>${project.title}</h4>
                                        <div class="newTeam__project--body--img">
                                            <img src="${project.image}" alt="Project Image">
                                        </div>`
                chosenProject = project
                teamProject = project

                function addTeamOption(){
                    const selectTeam = document.querySelector("#issueTeam")
                    selectTeam.innerHTML = `<option value=""></option>`
                    chosenProject.teams.forEach(team => {

                        selectTeam.innerHTML += `<option value="${team.id} ${team.name}">${team.id} ${team.name}</option>`

                    })
                }
                addTeamOption()
            }
        }
        choseProject()
    }   
    selectIssueProject()


    // ISSUE AUTHOR:

    function setIssueAuthor(){
           
        issueAuthor = USER_CURRENT
        const setAuthor = document.querySelector("#issue-author")
        setAuthor.innerText = `${USER_CURRENT.firstName} ${USER_CURRENT.lastName}`
    }
    setIssueAuthor()

    // ISSUE CREATION DATE:

    function issueCreateDate(){
        let trueIssueTime = ""

        function showIssueDate(time){

            let issueTime = currentTime(time)
            let issueCreationDate = `${issueTime.dayNumber} ${issueTime.month} ${issueTime.year}`
            let showIssueDate = document.querySelector("#issue-creation-date");
            showIssueDate.innerHTML= issueCreationDate;
            issueStartDate = issueTime
        }
        const issueDate = () => {
            date.then((a) => {
                showIssueDate(a)
                trueProjectTime = a
            })
        }
        issueDate()
    }

    issueCreateDate()
    
    // SUBMIT NEW ISSUE:

    function submitNewIssue(){

        let submitIssue = document.querySelector("#submitProject").addEventListener("click", (e)=>{

            e.preventDefault();
    
            issueId = issueList.length + 1;
        
            issueTitle = document.querySelector("#projectName").value;
    
            issueProject = chosenProject.id

            issueAuthor = USER_CURRENT.id 

            issueDescr = document.querySelector("#projectDescr").value
    
            issueType = document.querySelector("#issue-type").value

            function setIssueTeam(){
                let findTeam = document.querySelector("#issueTeam").value.match(/\d+/g)
                if(findTeam == null || findTeam == []){
                    issueTeam = ""
                    return
                }
                else {
                    let foundTeam = teamList.find(team => team.id == findTeam)
                    issueTeam = foundTeam.id
                    foundTeam.members.forEach(member =>{
                        issueUsers.push(member.id)
                    })
                }
            }
            setIssueTeam()

            issuePriority = document.querySelector("#issue-priority").value

            issueEndDate = document.querySelector("#issue-end-date").value

            issueEstimated = document.querySelector("#issue-estimated").value

            issueNew = new Issue(issueId, issueTitle, issueProject, issueAuthor, issueDescr, issueStartDate,  issueEndDate ,issueType, issuePriority, issueUsers, issueEstimated, issueTeam, issueComments);
    
            if (issueTitle == "" || issueProject == "" || issueDescr == ""){
    
                Swal.fire({
                    title: "Error!",
                    text: "Please complete all required fields.",
                    icon: "error",
                })
                return;
                
            }
    
            issueList.push(issueNew);

            foundProject = projectList.find(project => project.id == issueProject)
            foundProject.issues.push(issueNew)

            function sendIssueTeam(){
                if(issueTeam == ""){
                    return
                }
                else{
                    foundTeam = teamList.find(team => team.id == issueTeam)
                    foundTeam.issues.push(issueNew)
                }
            }
            sendIssueTeam()
            
    
            Swal.fire({
                title: "Done!",
                text: "Issue Created",
                imageUrl: "./img/project_created.svg",
                imageWidth: "250px",
                showConfirmButton: false,
            })
    

            localStorage.setItem("Lista de Tareas", JSON.stringify(issueList));
            localStorage.setItem("Lista de Equipos", JSON.stringify(teamList));
            localStorage.setItem("Lista de Proyectos", JSON.stringify(projectList))
    
            setTimeout(function(){
    
                location.href= "./index.html"; 
    
            }, 2000)
            
        });

    }
    submitNewIssue()
    
}
createIssue()
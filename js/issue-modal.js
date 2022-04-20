// DATA LOAD 📚

cargarDatosProyectos();

cargarDatosUsuarios();

cargarDatosEquipos();

cargarDatosIssues();

console.log(issueList)

let commentsList  = []

JSON.parse(localStorage.getItem("Lista de Comentarios")) == null ? commentsList = [] : commentsList = JSON.parse(localStorage.getItem("Lista de Comentarios"))

console.log(commentsList)

issue = JSON.parse(localStorage.getItem("Issue Activo"))

console.log(issue)

function openPreview(issue){

    let issueCommentsList = []
    let allIssueComments = issue.comments.forEach(comment => {

        console.log(comment)

        if(commentsList == false){
            issueCommentsList = []
            return
        }
        else {
            const foundComment = commentsList.find(findcomment => findcomment.id == comment)
            issueCommentsList.push(foundComment)
        }
        
    })

    console.log(issueCommentsList)

    let issueMembersList = []
    let allIssueMembers = issue.users.forEach(member => {

        if(issue.members == false){
            issueMembersList = []
            return
        }
        else {
            const foundUser = userList.find(finduser => finduser.id == member)
            issueMembersList.push(foundUser)
            console.log(issueMembersList)
        }
    })

    // ISSUE DATES: 

    let trueIssueTime = ""

    function showIssueDate(time){
        let issueTime = currentTime(time)
    }

    const issueDate = () => {
        date.then((a) => {
            showIssueDate(a)
            trueIssueTime = a
        })
    }

    issueDate()

    modalDiv = document.querySelector(".modal")
    console.log(modalDiv)
    const projectOfIssue = projectList.find(project => project.id == issue.project)
    let teamOfIssue = teamList.find(team => team.id == issue.team)
    if(teamOfIssue == undefined){
        teamOfIssue = {
            name: "None"
        }
    }
    const authorOfIssue = userList.find(user => user.id == issue.author)

    function closeWindow(element){
        element.remove()
    }

    function closeModal(){
        localStorage.removeItem('Issue Activo');
        location.href= "./issues.html";
    }

    function closeIssueModal(){

        const closeButtons = modalDiv.querySelectorAll(".close__modal")
        closeButtons.forEach(button => button.onclick = ()=> closeModal())
    }
    closeIssueModal()



    function deleteIssue(){

        const deleteButton = modalDiv.querySelector("#delete-issue")
        console.log(deleteButton)
        deleteButton.addEventListener("click", ()=>{
            if(isUserAdmin(projectOfIssue) != true){
                alert("You dont have permission to do this")
                return
            }
            else {
                deleteButton.onclick = () => {
                    issueList.splice(issueList.indexOf(issue), 1)
                    issueCommentsList.forEach(comment => {
                        console.log(comment)
                        commentsList.splice(commentsList.indexOf(comment), 1)
                        console.log(commentsList)
                    })
                    projectOfIssue.issues.splice(projectOfIssue.issues.indexOf(issue), 1)
                    teamOfIssue.issues.splice(teamOfIssue.issues.indexOf(issue), 1)
    
                    localStorage.setItem("Lista de Proyectos", JSON.stringify(projectList))
                    localStorage.setItem("Lista de Equipos", JSON.stringify(teamList))
                    localStorage.setItem("Lista de Tareas", JSON.stringify(issueList))
                    localStorage.setItem("Lista de Comentarios", JSON.stringify(commentsList))
                    localStorage.setItem("Lista de Usuarios", JSON.stringify(userList))
                    localStorage.setItem("Issue Activo", JSON.stringify(issue))
                    localStorage.setItem("Usuario Activo", JSON.stringify(USER_CURRENT))
    
                    alert("Issue deleted")
    
                    closeModal()
                }
            }
        })
    }
    deleteIssue()

    function issueProperties(){

        function setIssueName(){
            const issueName = document.querySelector("#issue-title")
            issueName.innerText = issue.title
            const issueDate = document.querySelector("#issue-creation-date")
            issueDate.innerText = `${issue.creationDate.dayNumber} ${issue.creationDate.month} ${issue.creationDate.year}`
        }
        setIssueName()
    
        function setIssueProject(){

            const projectName = document.querySelector("#project-name")
            projectName.innerText = projectOfIssue.title

            const projectImage = document.querySelector("#project-image")
            projectImage.src = projectOfIssue.image
        }
        setIssueProject()

        function setIssueTeam(){
            const issueName = document.querySelector("#issue-team")
            issueName.innerText = teamOfIssue.name
        }
        setIssueTeam()

        function setIssueAuthor(){
            const issueAuthor = document.querySelector("#issue-author")
            issueAuthor.innerText = `${authorOfIssue.firstName} ${authorOfIssue.lastName}`
        }
        setIssueAuthor()

        function setIssueTypePriority(){
            const issueType = document.querySelector("#issue-type")
            issueType.innerText = issue.type
            const issuePriority = document.querySelector("#issue-priority")
            issuePriority.innerText = issue.priority
        }
        setIssueTypePriority()

        function setIssueDescr(){
            const issueDescr = document.querySelector("#issue-descr")
            issueDescr.innerText = issue.descr
        }
        setIssueDescr()
    }
    issueProperties()


    function issueComments(){

        const issueCommentsTable = document.querySelector(".comments__table")
        

        function setComments(){
            issueCommentsTable.innerHTML = ``
            console.log(issueCommentsList)
            if(issueCommentsList == [] || issueCommentsList == false){
                return
            }
            else {
                console.log(issueCommentsList)
                issueCommentsList.forEach(comment => {

                    commentBox = document.createElement("div")
                    commentBox.className = "comment__div"
                    commentBox.id = `issue-comment-${comment.id}`
                    commentDate = currentTime(comment.date)
                    trueCommentDate = `${commentDate.hour}:${commentDate.minutes} ${commentDate.month} ${commentDate.dayNumber}` 
                    console.log(trueCommentDate)
                    commentBox.innerHTML = `<div class="comment__header">
                                            <p class="author">${comment.author.firstName} ${comment.author.lastName}</p>
                                            <p class="date">${trueCommentDate}</p>
                                        </div>
                                        <div class="comment__body">
                                            <p>${comment.content}</p>
                                        </div>`
    
                    issueCommentsTable.append(commentBox)
    
                })
            }
        }
        setComments()

        function addComment(){

            const commentInput = document.querySelector("#comment__input")
            const addCommentBtn = document.querySelector("#comment__add")

            addCommentBtn.onclick = () => {

                if(issue.users.includes(USER_CURRENT.id) == false){
                    alert("You have to first be assigned to the issue to comment")
                    return
                }
                else {
                    let newComment = {
                        id : commentsList.length+1,
                        author: USER_CURRENT,
                        date: trueIssueTime,
                        content: commentInput.value
                    }
                    console.log(newComment)
    
                    commentsList.push(newComment)
                    issue.comments.push(newComment.id)
                    issueCommentsList.push(newComment)
                    issueList.splice(issueList.indexOf(issue), 1)
                    issueList.push(issue)
                    projectOfIssue.issues.splice(projectOfIssue.issues.indexOf(issue), 1)
                    projectOfIssue.issues.push(issue)
    
                    localStorage.setItem("Lista de Tareas", JSON.stringify(issueList))
                    localStorage.setItem("Lista de Comentarios", JSON.stringify(commentsList))
                    localStorage.setItem("Lista de Usuarios", JSON.stringify(userList))
                    localStorage.setItem("Lista de Proyectos", JSON.stringify(projectList))
                    localStorage.setItem("Issue Activo", JSON.stringify(issue))
                    localStorage.setItem("Usuario Activo", JSON.stringify(USER_CURRENT))
                    commentInput.value = ""
                    setComments()
                }
            }

        }
        addComment()
    }
    issueComments()


    function issueModalMembers(){

        function removeMember(button){
            if(isUserAdmin(projectOfIssue) != true){
                alert("You don´t have permission to do this")
                return
            }
            else{
                const matchId = button.parentNode.id.match(/\d+/g)
                const userToRemove = issue.users.find(user => user.id == matchId)
                const userIndex = issue.users.indexOf(userToRemove)
                issue.users.splice(userIndex, 1)
                localStorage.setItem("Issue Activo", JSON.stringify(issue))
                localStorage.setItem("Lista de Tareas", JSON.stringify(issueList))
                button.parentNode.remove()
            }
        }

        const membersTable = document.querySelector("#project-modal-members-table")
        function createMemberTable(){
            console.log(issue.users)
            membersTable.innerHTML = ``
            issue.users.forEach(member => {
                console.log(issue.users)
                const foundUser = userList.find(user => user.id == member)
                const memberRow = document.createElement("div")
                memberRow.className = "modal__body--row"
                memberRow.id = `issueModal-issue-row-${foundUser.id}`
                memberRow.innerHTML =   `
                                        <p class="user__id user__id--vis">${foundUser.id}</p>
                                        <div class="user__img user__img--vis"><img src="./img/meme-10-guy-chico-drogado_400x400.jpg" alt=""></div>
                                        <p class="user__nick user__nick--vis">${foundUser.nickname}</p>
                                        <p class="user__name user__name--vis">${foundUser.firstName} ${foundUser.lastName}</p>
                                        <p class="user__email user__email--vis">${foundUser.email}</p>
                                        <img class="user__delete" src="./img/addMember_delete.svg" alt="Delete Member">
                                        <button class="user__view">View</button>`
                membersTable.append(memberRow)
                const deleteMemberBtn = membersTable.querySelectorAll(".user__delete")
                deleteMemberBtn.forEach(button => button.onclick = () => {removeMember(button)})
            })
        }
        createMemberTable()

        function addUserToIssue(){

            const foundUser = userList.find(user => user.id == USER_CURRENT.id)

            function addNewUser(){
                const assignIssue = document.querySelector("#issue-add-user")
                assignIssue.addEventListener("click" , assignUser)

                if(issue.users.includes(USER_CURRENT.id)){
                    assignIssue.innerText = "Leave Issue"
                    assignIssue.id = "issue-remove-user"
                    removeUser()
                }

                function assignUser(){
                    if(issue.users.includes(USER_CURRENT.id)){
                        // alert("You are already assigned to this issue")
                        return
                    }
                    else {
                        issue.users.push(USER_CURRENT.id)
                    
                        foundUser.issues.push(issue)
                        USER_CURRENT.issues.push(issue)
                        issueList.splice(issueList.indexOf(issue), 1)
                        issueList.push(issue)

                        localStorage.setItem("Lista de Tareas", JSON.stringify(issueList))
                        localStorage.setItem("Lista de Usuarios", JSON.stringify(userList))
                        localStorage.setItem("Issue Activo", JSON.stringify(issue))
                        localStorage.setItem("Usuario Activo", JSON.stringify(USER_CURRENT))
                        createMemberTable()
                        assignIssue.innerText = "Leave Issue"
                        assignIssue.id = "issue-remove-user"
                        removeUser()
                    }
                }
            }
            addNewUser()
            
            function removeUser(){

                const removeIssue = document.querySelector("#issue-remove-user")
                removeIssue.addEventListener("click", deAssignUser)

                function deAssignUser(){
                    issue.users.splice(issue.users.indexOf(USER_CURRENT.id), 1)
                    foundUser.issues.splice(foundUser.issues.indexOf(issue), 1)
                    USER_CURRENT.issues.splice(USER_CURRENT.issues.indexOf(issue), 1)
                    console.log(issue.users)

                    issueList.splice(issueList.indexOf(issue), 1)
                    issueList.push(issue)

                    localStorage.setItem("Issue Activo", JSON.stringify(issue))
                    localStorage.setItem("Lista de Tareas", JSON.stringify(issueList))
                    localStorage.setItem("Lista de Usuarios", JSON.stringify(userList))
                    localStorage.setItem("Usuario Activo", JSON.stringify(USER_CURRENT))
                    createMemberTable()
                    removeIssue.innerText = "Join Issue"
                    removeIssue.id = "issue-add-user"
                    addNewUser()
                }
            }
        }
        addUserToIssue()

    }
    issueModalMembers()


    function issueSolved(){

        const solvedButton = document.querySelector("#mark-as-solved")
        solvedButton.addEventListener("click", markAsSolved)

        function markAsSolved(){

            issueList.splice(issueList.indexOf(issue), 1)
            console.log(issueCommentsList)
            issueCommentsList.forEach(comment => {
                console.log(comment)
                commentsList.splice(commentsList.indexOf(comment), 1)
                console.log(commentsList)
            })
            projectOfIssue.issues.splice(projectOfIssue.issues.indexOf(issue), 1)
            teamOfIssue.issues.splice(teamOfIssue.issues.indexOf(issue), 1)

            localStorage.setItem("Lista de Proyectos", JSON.stringify(projectList))
            localStorage.setItem("Lista de Equipos", JSON.stringify(teamList))
            localStorage.setItem("Lista de Tareas", JSON.stringify(issueList))
            localStorage.setItem("Lista de Comentarios", JSON.stringify(commentsList))
            localStorage.setItem("Lista de Usuarios", JSON.stringify(userList))
            localStorage.setItem("Issue Activo", JSON.stringify(issue))
            localStorage.setItem("Usuario Activo", JSON.stringify(USER_CURRENT))

            alert("Well Done!")

            closeModal()

        }
    }
    
    issueSolved()
    
}
openPreview(issue)


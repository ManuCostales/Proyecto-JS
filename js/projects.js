// FUNCION CONSTRUCTORA DE CLASE DE OBJETO "PROJECT" /PROYECTOS:

class Project {
    constructor(id, title, host, creator, descr, creationDate, endDate, repos, roles, members, image) {
        this.id = id;
        this.title = title;
        this.host = host;
        this.creator = creator;
        this.descr = descr;
        this.creationDate = creationDate;
        this.endDate = endDate;
        this.repos = repos;
        this.roles = roles;
        this.members = members; 
        this.image = image
        }

    info() {
        return `<br>
        Name: ${this.title}.<br>
        Host: ${this.lead}<br>
        Description: ${this.descr}<br>
        Number of Members: ${this.members} miembros<br>
        Creation Date: ${this.date}`
    }
}

let projectList = [];

let projectName
let projectHost
let projectCreator
let projectDescr
let projectStartDate
let projectEndDate
let projectRepos = [];
let projectRoles = ["ADMIN"];
let projectMembers = [];
let projectImage = "";







    




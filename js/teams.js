// FUNCION CONSTRUCTORA DE CLASE DE OBJETO "PROJECT" /PROYECTOS:

class Team {
    constructor(id, name, project, lead, descr, repos, members, issues) {
        this.id = id;
        this.name = name;
        this.project = project;
        this.lead = lead;
        this.descr = descr;
        this.repos = repos;
        this.members = members; 
        this.issues = issues;
        }

    info() {
        return `<br>
        Name: ${this.title}.<br>
        Host: ${this.lead}<br>
        Description: ${this.descr}<br>
        Number of Members: ${this.members} miembros<br>
        Creation Date: ${this.creationDate}`
    }
}

let teamList = [];
let teamId
let teamName
let teamProject = ""
let teamLead = ""
let teamDescr
let teamRepos = [];
let teamMembers = [];
let teamIssues = []







    




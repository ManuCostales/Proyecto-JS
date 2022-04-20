// FUNCION CONSTRUCTORA DE CLASE DE OBJETO "ISSUE" /TAREA:

class Issue {
    constructor(id, title, project, author, descr, creationDate, endDate, type, priority, users, estimated, team, comments) {
        this.id = id;
        this.title = title;
        this.project = project;
        this.author = author;
        this.descr = descr;
        this.creationDate = creationDate;
        this.endDate = endDate;
        this.type = type;
        this.priority = priority;
        this.users = users; 
        this.estimated = estimated;
        this.team = team;
        this.comments = comments;
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

let issueList = [];

let issueId
let issueTitle
let issueProject
let issueAuthor
let issueDescr
let issueStartDate
let issueEndDate = ""
let issueType
let issuePriority
let issueUsers = [];
let issueEstimated 
let issueTeam = ""
let issueComments = []







    




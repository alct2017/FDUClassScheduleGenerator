const nav = document.getElementsByClassName("nav")[0];
let semesters = {};
for (const child of nav.children) {
    semesters[child.id] = child.firstElementChild.innerHTML;
}

//todo: choose semester
let semester = "nav-2020202101";
const navReg = /^nav-(\d*)$/;
let semesterId = "";
if (navReg.test(semester)) semesterId = RegExp.$1;
let listId = "list-" + semesterId;
class ClassTimeAndPlace {
    constructor(classroom, time, weeks) {
        this.classroom = classroom;
        this.time = time;
        this.weeks = weeks;
    }
}
class Class {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.timeAndPlace = [];
    }
    AddTimeAndPlace(classroom, time, weeks) {
        this.timeAndPlace.push(new ClassTimeAndPlace(classroom, time, weeks));
    }
}
function getClasses(listId) {
    let list = document.getElementById(listId), table = list.getElementsByTagName("table")[0].getElementsByTagName("tbody")[0], rowSpan = 0, currentClass, Classes = [];
    for (const record of table.children) {
        if (rowSpan <= 0) {
            rowSpan = record.children[0].rowSpan;
            currentClass = new Class(record.children[0].innerHTML, record.children[1].innerHTML);
            currentClass.AddTimeAndPlace(record.children[2].innerHTML, record.children[3].innerHTML, record.children[4].innerHTML);
        }
        else {
            currentClass.AddTimeAndPlace(record.children[0].innerHTML, record.children[1].innerHTML, record.children[2].innerHTML);
        }
        rowSpan--;
        if (rowSpan <= 0) {
            Classes.push(currentClass);
        }
    }
    return Classes;
}
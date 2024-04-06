"use strict"
//Deklarera interfacet 
interface CourseInfo {
    code: string,
    name: string,
    progression: string,
    syllabus: string 
}

//Div där kurserna visas
let courseDiv = document.getElementById("courseDiv") as HTMLDivElement;

//Vid sidoladdning
window.onload = () =>{
    const storage = localStorage.getItem("key");
    if(storage !== null && storage !== ""){
        const courses: CourseInfo[] = JSON.parse(storage); //Läs in sparade kurser från localstorage
        printCourse(courses); //och skicka dem med printCourse funktion för utskrivning i DOM
    }
};

//Skapa kurs knappen
const submitBtn = document.getElementById("submitCourse") as HTMLButtonElement;
submitBtn.addEventListener("click", submit);

//Läser data från form och skapar kurs
function submit(){
    //Formens 4 fält
    const courseCode = document.getElementById("courseCode") as HTMLInputElement;
    const courseName = document.getElementById("courseName") as HTMLInputElement;
    const courseProgression = document.querySelector('input[name="progression"]:checked') as HTMLInputElement;
    const courseSyllabus = document.getElementById("syllabus") as HTMLInputElement;
    //Kontroll som hindrar att spara kurskod dubletter
    const storedCourses = localStorage.getItem("key");
    if (storedCourses !== null) {
        const courses: CourseInfo[] = JSON.parse(storedCourses);
        const existingCourse = courses.some(course => course.code === courseCode.value);
        if (existingCourse) {
            const errorMsg = document.getElementById("error") as HTMLDivElement;
            alert("Det finns redan en kurs med samma kod, vänligen välj en annan kurskod.");
            return;
        }
    }
    //Lagrar formens fälts värde i object enligt interfacet
    const newCourse: CourseInfo = {
        code: courseCode.value,
        name: courseName.value,
        progression: courseProgression.value,
        syllabus: courseSyllabus.value
    }

    let courses: CourseInfo[] = [];
    if (storedCourses !== null) {
        courses = JSON.parse(storedCourses);
    }

    //Pushar den nya kursen i kurs array
    courses.push(newCourse);
    localStorage.setItem("key", JSON.stringify(courses)); //Sparar i localStorage

}

//Funktion som skriver ut de sparade kurserna till DOM
function printCourse(courses: CourseInfo[]){
    
    courseDiv.innerHTML = "";

    for(let course of courses){
    courseDiv.innerHTML +=`
    <span class="createdCourse">
    <p><strong>Namn:</strong> <span>${course.name}</span> </p>
    <p><strong>Kod:</strong> <span>${course.code}</span> </p>
    <p><strong>Progression:</strong> <span>${course.progression}</span> </p>
    <p><strong>Url:</strong> <span>${course.syllabus}</span> </p>
    <button id="delete">Radera</button>
    <button id="edit">Ändra</button>
    </span>
    `
    }
}

//Tömm lokalstorage dvs radera alla kurser
const clear = document.getElementById("clear") as HTMLButtonElement;
clear.addEventListener("click", ()=>{
    localStorage.clear();
    location.reload();
});

//Radera en specifik kurs
function deleteItem(button: HTMLButtonElement) {
    
    const span = button.parentNode as HTMLSpanElement;
    const parentElement = span.parentElement;
    if(parentElement){
        const courseIndex = Array.from(parentElement.children).indexOf(span);
        const storedCourses = localStorage.getItem("key");
    if (storedCourses !== null) {
        let courses: CourseInfo[] = JSON.parse(storedCourses);
        courses.splice(courseIndex, 1); 
        localStorage.setItem("key", JSON.stringify(courses));
        location.reload(); 
    }
    }
}


//Redigera kurs
function editItem(button: HTMLButtonElement){
    const span = button.parentNode as HTMLSpanElement;
    const parentElement = span.parentElement;
    if(parentElement){
    const courseIndex = Array.from(span.parentElement.children).indexOf(span);
    const courseCode = document.getElementById("courseCode") as HTMLInputElement;
    const courseName = document.getElementById("courseName") as HTMLInputElement;
    const courseSyllabus = document.getElementById("syllabus") as HTMLInputElement;
    const storedCourses = localStorage.getItem("key");

    if (storedCourses !== null) {
        let courses: CourseInfo[] = JSON.parse(storedCourses);
        courseCode.value = courses[courseIndex].code;
        courseName.value = courses[courseIndex].name;
        courseSyllabus.value = courses[courseIndex].syllabus;
    }
    const saveBtn = document.getElementById("save") as HTMLButtonElement;
    saveBtn.addEventListener("click", ()=>{
        const storedCourses = localStorage.getItem("key");

    if (storedCourses !== null) {
        let courses: CourseInfo[] = JSON.parse(storedCourses);
        courses.splice(courseIndex, 1); 
        localStorage.setItem("key", JSON.stringify(courses));
        submit();
        location.reload(); 
    }
    });
    }
}

//Event delegation för radera och redigera knappar i o m att Parcel inte är kompatible med inline event handler
const printDiv = document.getElementById("courseDiv") as HTMLDivElement;
printDiv.addEventListener("click", (event) => {
    const target = event.target as HTMLButtonElement;
    if (target.matches("#edit")) {
        editItem(target);
    } else if (target.matches("#delete")) {
        deleteItem(target);
    }
});
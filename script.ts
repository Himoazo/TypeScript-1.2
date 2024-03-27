"use strict"

interface CourseInfo {
    code: string,
    name: string,
    progression: string,
    syllabus: string 
}

//Div där kurserna visas
let courseDiv = document.getElementById("courseDiv") as HTMLDivElement;

window.onload = () =>{
    const storage = localStorage.getItem("key");
    if(storage !== null && storage !== ""){
        const courses: CourseInfo[] = JSON.parse(storage);
        printCourse(courses);
    }
};

const submitBtn = document.getElementById("submitCourse") as HTMLButtonElement;

submitBtn.addEventListener("click", () => {
    const courseCode = document.getElementById("courseCode") as HTMLInputElement;
    const courseName = document.getElementById("courseName") as HTMLInputElement;
    const courseProgression = document.querySelector('input[name="progression"]:checked') as HTMLInputElement;
    const courseSyllabus = document.getElementById("syllabus") as HTMLInputElement;

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

    courses.push(newCourse);
    localStorage.setItem("key", JSON.stringify(courses));

});

function printCourse(courses: CourseInfo[]){
    
    courseDiv.innerHTML = "";

    for(let course of courses){
    courseDiv.innerHTML +=`
    <span class="createdCourse">
    <p><strong>Namn:</strong> <span contenteditable="true">${course.name}</span> </p>
    <p><strong>Kod:</strong> <span contenteditable="true">${course.code}</span> </p>
    <p><strong>Progression:</strong> <span contenteditable="true">${course.progression}</span> </p>
    <p><strong>Url:</strong> <span contenteditable="true">${course.syllabus}</span> </p>
    <button onclick="deleteItem(this)" id="delete">Radera</button>
    <button onclick="editItem(this)" id="edit">redigera</button>
    </span>
    `
    }
}

const clear = document.getElementById("clear") as HTMLButtonElement;
clear.addEventListener("click", ()=>{
    localStorage.clear();
    location.reload();
});


function deleteItem(button: HTMLButtonElement) {
    /* const span = button.parentNode as HTMLSpanElement;
    const index = courses.indexOf.call(courseDiv.children, span); // returnera index av span
    courses.splice(index, 1); */
    /* const span = button.parentNode as HTMLSpanElement;
    span.remove();
    localStorage.setItem("key", JSON.stringify(courses)); */
    /* span.remove();
    localStorage.setItem("key", courseDiv.innerHTML); */
}

function editItem(button: HTMLButtonElement){
    const span = button.parentNode as HTMLSpanElement;
    localStorage.setItem("key", courseDiv.innerHTML);
    /* const span = button.parentNode as HTMLSpanElement;
    const courseIndex = Array.from(courseDiv.children).indexOf(span); // Get the index of the course in the DOM
    const storedCourses = localStorage.getItem("key");
    if (storedCourses !== null) {
        const courses: CourseInfo[] = JSON.parse(storedCourses);
        localStorage.setItem("key", JSON.stringify(courses));
    } */
}
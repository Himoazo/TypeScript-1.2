"use strict"
//Kursform
interface CourseInfo {
    code: string,
    name: string,
    progression: string,
    syllabus: string 
}

//Fältvärden
const courseCode = document.getElementById("courseCode") as HTMLInputElement;
const courseName = document.getElementById("courseName") as HTMLInputElement;
const courseSyllabus = document.getElementById("syllabus") as HTMLInputElement;
const printDiv = document.getElementById("courseDiv") as HTMLDivElement;
const submitBtn = document.getElementById("submitCourse") as HTMLButtonElement;

//Sparakurs 
submitBtn.addEventListener("click", () => {
    const courseProgression = document.querySelector('input[name="progression"]:checked') as HTMLInputElement;
    const newCourse: CourseInfo = {
        code: courseCode.value,
        name: courseName.value,
        progression: courseProgression.value,
        syllabus: courseSyllabus.value
    }

        // Kontroll om det finns en redan sparad kurs med samma kurskod 
        const savedCourses = document.getElementsByClassName("createdCourse");
        let identicalCode = false;
        for (let course of savedCourses) {
            const codeEl = course.querySelector('p:first-child span') as HTMLSpanElement;
            if (codeEl.textContent === newCourse.code) {
                identicalCode = true;
                break;
            }
        }
    
        if (!identicalCode) {
            printCourse(newCourse);
        } else {
            alert("Det fins redan en sparad kurs med samma kurskod.");
        }

});

//Skriver skapad kurs till DOM och sparar den i localstorage
function printCourse(newCourse: CourseInfo):void{

    printDiv.innerHTML +=`
    <span class="createdCourse">
    <p><strong>Kod:</strong> <span contenteditable="true">${newCourse.code}</span> </p>
    <p><strong>Namn:</strong> <span contenteditable="true">${newCourse.name}</span> </p>
    <p><strong>Progression:</strong> <span contenteditable="true">${newCourse.progression}</span> </p>
    <p><strong>Url:</strong> <span contenteditable="true">${newCourse.syllabus}</span> </p>
    <button onclick="deleteItem(this)" id="delete">Radera</button>
    <button onclick="editItem(this)" id="edit">Redigera</button>
    </span>
    `
    localStorage.setItem("key", printDiv.innerHTML); 
}


// Visar sparade kurser i DOM
loadCourses();
function loadCourses():void{  
    const storedCourses = localStorage.getItem("key");
    if (storedCourses !== null && storedCourses !== "") {
        printDiv.innerHTML = storedCourses;
    }
}

//Rensa knappen
const clear = document.getElementById("clear") as HTMLButtonElement;
clear.addEventListener("click", ()=>{
    localStorage.clear();
    location.reload();
});

//Ta bort enskild kurs
function deleteItem(button: HTMLButtonElement) {
    const span = button.parentNode as HTMLSpanElement;
    span.remove();
    localStorage.setItem("key", printDiv.innerHTML); 
}

//Redigera knappen
function editItem(button: HTMLButtonElement){
    const span = button.parentNode as HTMLSpanElement;
    localStorage.setItem("key", printDiv.innerHTML);
}
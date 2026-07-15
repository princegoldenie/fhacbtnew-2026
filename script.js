// =======================================================
// FHA CBT 2026
// FIRST HARVARD ACADEMY
// CBT ENGINE
// PART 1
// =======================================================



// =======================================================
// SUBJECT LISTS
// =======================================================

const seniorSubjects = [

"Physics",
"Commerce",
"Government",
"Chemistry",
"Accounting",
"Literature",
"Digital Technologies",
"CHS",
"CRS",
"Biology",
"Economics",
"Marketing",
"Agriculture",
"Mathematics",
"English Language"

];



const juniorSubjects = [

"Intermediate Science",
"Home Economics",
"SCS",
"Digital Technology",
"CRS",
"PHE",
"Business Studies",
"Coding",
"Agric Science",
"Nigerian History",
"CCA",
"Mathematics",
"English Studies"

];



const primary4to6Subjects = [

"Basic Science & Tech",
"Pre-Vocational Studies",
"Social & Citizenship Studies",
"Basic Digital Literacy",
"CRS",
"PHE",
"Cultural & Creative Arts",
"Nigerian History",
"Mathematics",
"English Studies"

];



const primary1to3Subjects = [

"Basic Science",
"Hand Writing",
"SCS",
"Social Studies",
"CRS",
"PHE",
"Cultural & Creative Arts",
"Nigerian History",
"Mathematics",
"English Studies"

];



// =======================================================
// GLOBAL VARIABLES
// =======================================================

let examQuestions = [];

let currentQuestion = 0;

let studentAnswers = [];

let timer;

let timeLeft = 2400; // 40 Minutes

let examFinished = false;



// =======================================================
// LOAD SUBJECTS
// =======================================================

function loadSubjects(){


let selectedClass =
document.getElementById("studentClass").value;


let subjectBox =
document.getElementById("subject");


subjectBox.innerHTML =
"<option value=''>Select Subject</option>";


let list = [];



if(selectedClass.startsWith("JSS")){

list = juniorSubjects;

}

else if(selectedClass.startsWith("SS")){

list = seniorSubjects;

}

else if(

selectedClass=="Primary 1" ||
selectedClass=="Primary 2" ||
selectedClass=="Primary 3"

){

list = primary1to3Subjects;

}

else if(

selectedClass=="Primary 4" ||
selectedClass=="Primary 5" ||
selectedClass=="Primary 6"

){

list = primary4to6Subjects;

}



list.forEach(function(subject){

let option =
document.createElement("option");

option.value = subject;

option.textContent = subject;

subjectBox.appendChild(option);

});


}



// =======================================================
// START EXAM
// =======================================================

function startExam(){


let name =
document.getElementById("studentName").value.trim();


let studentClass =
document.getElementById("studentClass").value;


let subject =
document.getElementById("subject").value;



if(name===""){

alert("Please enter student's name.");

return;

}



if(studentClass===""){

alert("Please select a class.");

return;

}



if(subject===""){

alert("Please select a subject.");

return;

}



// Save Details

localStorage.setItem("name",name);

localStorage.setItem("class",studentClass);

localStorage.setItem("subject",subject);



// Success Tick

let success =
document.getElementById("success");

if(success){

success.style.display="block";

}



// Redirect

setTimeout(function(){

window.location.href="exam.html";

},800);


}
// =======================================================
// PART 2
// LOAD EXAM
// =======================================================

function loadExam(){


document.getElementById("studentName").textContent =
localStorage.getItem("name") || "";


document.getElementById("studentClass").textContent =
localStorage.getItem("class") || "";


document.getElementById("studentSubject").textContent =
localStorage.getItem("subject") || "";



let studentClass =
localStorage.getItem("class");


let subject =
localStorage.getItem("subject");



// Get questions from Question Bank

let bank = questionBank.filter(function(q){

return q.class === studentClass &&
q.subject === subject;

});

console.log(studentClass);
console.log(subject);
console.log(bank);



// No Question Found

if(bank.length===0){

alert(
"No questions have been added for this subject yet."
);

window.location.href="index.html";

return;

}



// Shuffle Questions

bank.sort(function(){

return Math.random()-0.5;

});



// Pick Maximum 50 Questions

examQuestions =
bank.slice(0,Math.min(50,bank.length));



// Reset Answers

studentAnswers =
new Array(examQuestions.length).fill("");



// Prepare Exam

prepareQuestions();

createNumbers();

showQuestion();

startTimer();

}



// =======================================================
// PREPARE QUESTIONS
// Shuffle Options Once Only
// =======================================================

function prepareQuestions(){


examQuestions.forEach(function(q){


q.options=[

{
letter:"a",
text:q.a
},

{
letter:"b",
text:q.b
},

{
letter:"c",
text:q.c
},

{
letter:"d",
text:q.d
}

];



q.options.sort(function(){

return Math.random()-0.5;

});


});


}



// =======================================================
// CREATE QUESTION NUMBERS
// =======================================================

function createNumbers(){


let box =
document.getElementById("numbers");


if(!box) return;


box.innerHTML="";



examQuestions.forEach(function(q,index){


let btn =
document.createElement("button");


btn.textContent =
index+1;


btn.className =
"number";


btn.onclick=function(){

currentQuestion=index;

showQuestion();

};



box.appendChild(btn);


});



updateNumbers();

}



// =======================================================
// UPDATE QUESTION NUMBER COLOURS
// =======================================================

function updateNumbers(){


let buttons =
document.querySelectorAll(".number");



buttons.forEach(function(btn,index){


btn.classList.remove(
"current",
"answered"
);



if(index===currentQuestion){

btn.classList.add("current");

}

else if(studentAnswers[index]!=""){

btn.classList.add("answered");

}


});


}
// =======================================================
// PART 3
// DISPLAY QUESTION
// =======================================================

function showQuestion(){

if(examQuestions.length===0){
return;}
let q = examQuestions[currentQuestion];
if(!q){
return;
}

let box = document.getElementById("questionBox");

let html = "";

html += "<h2>Question "
+(currentQuestion+1)
+" of "
+examQuestions.length+
"</h2>";

html += "<h3>"+q.question+"</h3>";



q.options.forEach(function(option){

let checked="";

if(studentAnswers[currentQuestion]===option.letter){

checked="checked";

}

html += `

<label class="option">

<input
type="radio"
name="answer"
value="${option.letter}"
${checked}
onclick="saveAnswer('${option.letter}')">

<b>${option.letter.toUpperCase()}.</b>

${option.text}

</label>

`;

});


box.innerHTML = html;

updateNumbers();

updateNavigation();

}




// =======================================================
// SAVE ANSWER
// =======================================================

function saveAnswer(answer){

studentAnswers[currentQuestion]=answer;

updateNumbers();

}




// =======================================================
// NEXT QUESTION
// =======================================================

function nextQuestion(){

if(currentQuestion < examQuestions.length-1){

currentQuestion++;

showQuestion();

}

else{

reviewExam();

}

}




// =======================================================
// PREVIOUS QUESTION
// =======================================================

function previousQuestion(){

if(currentQuestion>0){

currentQuestion--;

showQuestion();

}

}




// =======================================================
// ENABLE/DISABLE BUTTONS
// =======================================================

function updateNavigation(){

let previous =
document.getElementById("previousBtn");

let next =
document.getElementById("nextBtn");

if(previous){

previous.disabled =
(currentQuestion===0);

}

if(next){

if(currentQuestion===examQuestions.length-1){

next.textContent="REVIEW EXAM";

}else{

next.textContent="NEXT QUESTION";

}

}

}




// =======================================================
// TIMER
// =======================================================

function startTimer(){

clearInterval(timer);

timer=setInterval(function(){

timeLeft--;

let minutes =
Math.floor(timeLeft/60);

let seconds =
timeLeft%60;

document.getElementById("timer").textContent=

"Time Left : "

+

minutes

+

":"

+

(seconds<10?"0":"")+

seconds;



if(timeLeft<=0){

clearInterval(timer);

alert("Time Up! Your examination will now be submitted.");

finishExam();

}


},1000);

}




// =======================================================
// REVIEW PAGE
// =======================================================

function reviewExam(){

let answered=0;

studentAnswers.forEach(function(answer){

if(answer!=""){

answered++;

}

});

let unanswered=
examQuestions.length-answered;

let submit =
confirm(

"Review Examination\n\n"

+

"Answered: "

+

answered

+

"\n"

+

"Unanswered: "

+

unanswered

+

"\n\n"

+

"Press OK to Submit\n"

+

"Press Cancel to Continue Reviewing."

);

if(submit){

finishExam();

}

}
// =======================================================
// PART 4
// FINISH EXAM
// =======================================================

function finishExam(){

if(examFinished){

return;

}

examFinished = true;

clearInterval(timer);

let score = 0;



examQuestions.forEach(function(q,index){

let answer = studentAnswers[index];

if(answer===q.correct){

score++;

}

});



let percentage =
Math.round((score/examQuestions.length)*100);



let status =
percentage>=50 ? "PASS" : "FAIL";



// Save for Result Page

localStorage.setItem("score",score);

localStorage.setItem("total",examQuestions.length);

localStorage.setItem("percentage",percentage);

localStorage.setItem("status",status);



// Ready for Google Sheet later



const WEB_APP_URL =
"https://script.google.com/macros/s/AKfycbxUiGptkqLbzW6g40RknBsYzUqlmAGroxvmyGSDTkEIdYby8AHaWl0RBud0PXM5O8Is/exec";

fetch(WEB_APP_URL,{

method:"POST",

body:JSON.stringify({

name:localStorage.getItem("name"),

class:localStorage.getItem("class"),

subject:localStorage.getItem("subject"),

score:score,

total:examQuestions.length,

percentage:percentage,

status:status

})

})
.catch(function(error){

console.log(error);

});

saveResult();
window.location.href="result.html"
; }





// =======================================================
// RESULT PAGE
// =======================================================

function loadResult(){

let name =
localStorage.getItem("name");

let studentClass =
localStorage.getItem("class");

let subject =
localStorage.getItem("subject");

let score =
localStorage.getItem("score");

let total =
localStorage.getItem("total");

let percentage =
localStorage.getItem("percentage");

let status =
localStorage.getItem("status");



if(document.getElementById("resultName")){

document.getElementById("resultName").textContent=name;

}



if(document.getElementById("resultClass")){

document.getElementById("resultClass").textContent=studentClass;

}



if(document.getElementById("resultSubject")){

document.getElementById("resultSubject").textContent=subject;

}



if(document.getElementById("resultScore")){

document.getElementById("resultScore").textContent=

score+" / "+total;

}



if(document.getElementById("resultPercentage")){

document.getElementById("resultPercentage").textContent=

percentage+"%";

}



if(document.getElementById("resultStatus")){

document.getElementById("resultStatus").textContent=status;



if(status==="PASS"){

document.getElementById("resultStatus").style.color="green";

}else{

document.getElementById("resultStatus").style.color="red";

}

}

}





// =======================================================
// START NEXT EXAM
// =======================================================

function newExam(){

window.location.href="index.html";

}





// =======================================================
// TYPEWRITER EFFECT
// =======================================================

let typingText =
"FIRST HARVARD ACADEMY CBT 2026 • THIRD TERM EXAMINATION";

let typingIndex = 0;

function typeWriter(){

let display =
document.getElementById("typing");

if(!display){

return;

}

if(typingIndex < typingText.length){

display.innerHTML +=

typingText.charAt(typingIndex);

typingIndex++;

setTimeout(typeWriter,60);

}

}





// =======================================================
// AUTO RUN
// =======================================================

window.addEventListener("load",function(){

if(document.getElementById("typing")){
typeWriter();
}

if(window.location.pathname.includes("exam.html")){
loadExam();
}

if(window.location.pathname.includes("result.html")){
loadResult();
} 
});


// ==========================
// ADMIN LOGIN
// ==========================

const adminPassword = "FHA2026";

function adminLogin(){

let password =
document.getElementById("adminPassword").value;

if(password===adminPassword){

document.getElementById("loginBox").style.display="none";

document.getElementById("dashboard").style.display="block";

loadAdmin();

}
else{

alert("Incorrect Password");

}

}



// ==========================
// LOAD ADMIN
// ==========================

function loadAdmin(){

let table =
document.getElementById("resultTable");

if(!table) return;

table.innerHTML="";

let results =
JSON.parse(localStorage.getItem("results")) || [];

document.getElementById("totalStudents").textContent =
results.length;

results.forEach(function(item){

table.innerHTML += `

<tr>

<td>${item.name}</td>

<td>${item.class}</td>

<td>${item.subject}</td>

<td>${item.score}/${item.total}</td>

<td>${item.percentage}%</td>

<td>${item.status}</td>

</tr>

`;

});

}



// ==========================
// SAVE RESULT
// ==========================

function saveResult(){

let results =
JSON.parse(localStorage.getItem("results")) || [];

results.push({

name:localStorage.getItem("name"),

class:localStorage.getItem("class"),

subject:localStorage.getItem("subject"),

score:localStorage.getItem("score"),

total:localStorage.getItem("total"),

percentage:localStorage.getItem("percentage"),

status:localStorage.getItem("status")

});

localStorage.setItem(

"results",

JSON.stringify(results)

);

}



// ==========================
// CLEAR RESULTS
// ==========================

function clearResults(){

if(confirm("Delete all saved results?")){

localStorage.removeItem("results");

loadAdmin();

}

}

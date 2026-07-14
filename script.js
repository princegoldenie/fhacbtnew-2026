// ===========================
// SUBJECT LIST
// ===========================


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



// ===========================
// LOAD SUBJECTS
// ===========================


function loadSubjects(){

let selectedClass =
document.getElementById("studentClass").value;


let subjectBox =
document.getElementById("subject");


subjectBox.innerHTML =
"<option>Select Subject</option>";


let list = [];


if(selectedClass.includes("SS")){

list = seniorSubjects;

}
else if(selectedClass.includes("JSS")){

list = juniorSubjects;

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




// ===========================
// EXAM VARIABLES
// ===========================


let examQuestions = [];

let currentQuestion = 0;

let studentAnswers = [];

let timer;

let timeLeft = 2400;





// ===========================
// START EXAM
// ===========================


function startExam(){


let name =
document.getElementById("studentName").value;


let studentClass =
document.getElementById("studentClass").value;


let subject =
document.getElementById("subject").value;



if(name=="" || studentClass=="" || subject=="Select Subject"){

alert("Please complete your details");

return;

}



localStorage.setItem("name",name);

localStorage.setItem("class",studentClass);

localStorage.setItem("subject",subject);



document.getElementById("success").style.display="block";


setTimeout(function(){

window.location="exam.html";

},800);


}






// ===========================
// LOAD EXAM
// ===========================


function loadExam(){


document.getElementById("studentName").textContent =
localStorage.getItem("name");


document.getElementById("studentClass").textContent =
localStorage.getItem("class");


document.getElementById("studentSubject").textContent =
localStorage.getItem("subject");



let studentClass =
localStorage.getItem("class");


let subject =
localStorage.getItem("subject");



let bank = questions.filter(function(q){

return q.class==studentClass &&
q.subject==subject;

});



bank.sort(function(){

return Math.random()-0.5;

});



examQuestions =
bank.slice(0,50);



studentAnswers =
new Array(examQuestions.length).fill("");



prepareQuestions();


createNumbers();

showQuestion();

startTimer();


}




// ===========================
// SHUFFLE OPTIONS ONCE
// ===========================


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






// ===========================
// QUESTION NUMBERS
// ===========================


function createNumbers(){


let box =
document.getElementById("numbers");


box.innerHTML="";


examQuestions.forEach(function(q,index){


let button =
document.createElement("button");


button.textContent=index+1;


button.className="number";


button.onclick=function(){

currentQuestion=index;

showQuestion();

};


box.appendChild(button);


});


}







// ===========================
// SHOW QUESTION
// ===========================


function showQuestion(){


let q =
examQuestions[currentQuestion];


let box =
document.getElementById("questionBox");



let html = "";


html += "<h2>Question "
+(currentQuestion+1)
+" of "
+examQuestions.length+
"</h2>";



html += "<h3>"+q.question+"</h3>";



q.options.forEach(function(option){


let checked="";


if(studentAnswers[currentQuestion]==option.text){

checked="checked";

}



html += `

<label>

<input type="radio"
name="answer"
value="${option.text}"
${checked}
onclick="saveAnswer('${option.text}')">

${option.letter.toUpperCase()}.
${option.text}

</label>

<br>

`;

});


box.innerHTML=html;


updateNumbers();


}






function saveAnswer(answer){

studentAnswers[currentQuestion]=answer;

updateNumbers();

}





// ===========================
// NAVIGATION
// ===========================


function nextQuestion(){


if(currentQuestion < examQuestions.length-1){

currentQuestion++;

showQuestion();

}

else{

finishExam();

}


}



function previousQuestion(){


if(currentQuestion>0){

currentQuestion--;

showQuestion();

}


}






// ===========================
// NUMBER COLOUR
// ===========================


function updateNumbers(){


let buttons =
document.querySelectorAll(".number");


buttons.forEach(function(btn,index){


if(index==currentQuestion){

btn.style.background="#4b2608";

btn.style.color="white";

}
else if(studentAnswers[index]!=""){

btn.style.background="#c79a32";

}
else{

btn.style.background="white";

}


});


}






// ===========================
// TIMER
// ===========================


function startTimer(){


timer=setInterval(function(){


timeLeft--;


let minutes =
Math.floor(timeLeft/60);


let seconds =
timeLeft%60;



document.getElementById("timer").textContent =
minutes+
":"+
(seconds<10?"0":"")
+
seconds;



if(timeLeft<=0){

finishExam();

}


},1000);


}







// ===========================
// SUBMIT
// ===========================


function finishExam(){


clearInterval(timer);


let score=0;



examQuestions.forEach(function(q,index){



let answer =
studentAnswers[index];


let correctAnswer =
q[q.correct];



let chosen =
q.options.find(function(option){

return option.text==answer;

});



if(chosen && chosen.letter==q.correct && answer==correctAnswer){

score++;

}


});



localStorage.setItem("score",score);

localStorage.setItem("total",examQuestions.length);



window.location="result.html";


}





// ===========================
// RESULT
// ===========================


function loadResult(){


let score =
localStorage.getItem("score");


let total =
localStorage.getItem("total");



document.getElementById("resultName").textContent =
localStorage.getItem("name");


document.getElementById("resultScore").textContent =
score+" / "+total;



}





function newExam(){

window.location="index.html";

}





// AUTO RUN

if(window.location.pathname.includes("exam.html")){

window.onload=loadExam;

}


if(window.location.pathname.includes("result.html")){

window.onload=loadResult;

}
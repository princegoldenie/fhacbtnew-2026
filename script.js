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

function loadSubjects(){


let selectedClass =
document.getElementById("studentClass").value;


let subjectBox =
document.getElementById("subject");


subjectBox.innerHTML =
"<option>Select Subject</option>";



let subjects=[];



if(selectedClass.includes("SS")){


subjects = seniorSubjects;


}


else if(selectedClass.includes("JSS")){


subjects = juniorSubjects;


}


else if(

selectedClass=="Primary 1" ||
selectedClass=="Primary 2" ||
selectedClass=="Primary 3"

){


subjects = primary1to3Subjects;


}


else if(

selectedClass=="Primary 4" ||
selectedClass=="Primary 5" ||
selectedClass=="Primary 6"

){


subjects = primary4to6Subjects;


}




subjects.forEach(function(item){


let option =
document.createElement("option");


option.value=item;

option.textContent=item;


subjectBox.appendChild(option);


});


}


let currentQuestion = 0;

let score = 0;

let examQuestions=[];

let timeLeft = 2400; //40 minutes

let timer;



// ==========================
// HOMEPAGE
// ==========================


function startExam(){


let name =
document.getElementById("studentName").value;


let studentClass =
document.getElementById("studentClass").value;


let subject =
document.getElementById("subject").value;



if(
name=="" ||
studentClass=="" ||
subject=="Select Subject"
){

alert(
"Please complete your details"
);

return;

}



localStorage.setItem(
"name",
name
);


localStorage.setItem(
"class",
studentClass
);


localStorage.setItem(
"subject",
subject
);



document.getElementById("success").style.display="block";


setTimeout(()=>{


location.href="exam.html";


},800);



}





// ==========================
// LOAD EXAM
// ==========================


function loadExam(){



document.getElementById(
"studentName"
).innerHTML=
localStorage.getItem("name");



document.getElementById(
"studentClass"
).innerHTML=
localStorage.getItem("class");



document.getElementById(
"studentSubject"
).innerHTML=
localStorage.getItem("subject");




let studentClass =
localStorage.getItem("class");


let subject =
localStorage.getItem("subject");




examQuestions =
questions.filter(q=>

q.class==studentClass &&
q.subject==subject

);



// randomize questions


examQuestions.sort(
()=>Math.random()-0.5
);



// take maximum 50


examQuestions =
examQuestions.slice(0,50);



showQuestion();


startTimer();


}






// ==========================
// DISPLAY QUESTION
// ==========================



function showQuestion(){


let q =
examQuestions[currentQuestion];



let box =
document.getElementById(
"questionBox"
);



box.innerHTML=`


<h2>

Question ${currentQuestion+1}
of ${examQuestions.length}

</h2>


<h3>

${q.question}

</h3>



<label>

<input type="radio" name="answer" value="a">

${q.a}

</label>
<br>


<label>

<input type="radio" name="answer" value="b">

${q.b}

</label>
<br>


<label>

<input type="radio" name="answer" value="c">

${q.c}

</label>

<br>


<label>

<input type="radio" name="answer" value="d">

${q.d}

</label>



`;



}





// ==========================
// NEXT QUESTION
// ==========================


function nextQuestion(){



let selected =
document.querySelector(
'input[name="answer"]:checked'
);



if(selected){


if(
selected.value ==
examQuestions[currentQuestion].answer
){

score++;

}


}




currentQuestion++;



if(
currentQuestion >= examQuestions.length
){


finishExam();


}

else{


showQuestion();


}



}







// ==========================
// TIMER
// ==========================


function startTimer(){



timer=setInterval(()=>{


timeLeft--;



let minutes =
Math.floor(timeLeft/60);


let seconds =
timeLeft%60;



document.getElementById(
"timer"
).innerHTML=

"Time Left: "
+
minutes+
":"
+
(seconds<10?"0":"")
+
seconds;



if(timeLeft<=0){


clearInterval(timer);

finishExam();


}



},1000);



}






// ==========================
// FINISH EXAM
// ==========================


function finishExam(){



localStorage.setItem(
"score",
score
);


localStorage.setItem(
"total",
examQuestions.length
);



location.href="result.html";



}







// ==========================
// RESULT PAGE
// ==========================



function loadResult(){


let score =
localStorage.getItem("score");


let total =
localStorage.getItem("total");


let name =
localStorage.getItem("name");



document.getElementById(
"resultName"
).innerHTML=
name;



document.getElementById(
"resultScore"
).innerHTML=

score+
" / "
+
total;



let percent =
(score/total)*100;



if(percent>=50){

document.getElementById(
"resultMessage"
).innerHTML=
"Congratulations!";

}

else{


document.getElementById(
"resultMessage"
).innerHTML=
"Keep Practising!";


}



}




function newExam(){

location.href="index.html";

}






// AUTO RUN


if(
location.pathname.includes("exam.html")
){

window.onload=loadExam;

}



if(
location.pathname.includes("result.html")
){

window.onload=loadResult;

}
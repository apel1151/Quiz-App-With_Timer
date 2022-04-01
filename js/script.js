const myBtn = document.querySelector('.myBtn button');
const rulesBox = document.querySelector('.rulesBox');
const exitBtn = document.querySelector('.exitBtn');
const contBtn = document.querySelector('.contBtn');

const timeCount = document.querySelector('.timeCount .seconds');
const timeLine = document.querySelector(".question .timeLine");;

myBtn.onclick = () =>{
   rulesBox.classList.add('activeInfo');
   document.querySelector('.myQuizApp').style.display = "none";
}

exitBtn.onclick = () =>{
    rulesBox.classList.remove('activeInfo');
    document.querySelector('.myQuizApp').style.display = "block";
}

contBtn.onclick = () =>{
    rulesBox.classList.remove('activeInfo');
    document.querySelector('.question').style.display = "block";
    showQuestions(0);
    startTimer(15);
    startTimerLine(0);
}


// nextBtn clicked function start

const nextBtn = document.querySelector('.nextBtn');

const resultBox = document.querySelector('.resultBox');
const restartQuiz = document.querySelector('.completeButtons .restart1');
const quitQuiz = document.querySelector('.completeButtons .quit');

quitQuiz.onclick = () =>{
    window.location.reload();
}

restartQuiz.onclick = () =>{
       document.querySelector('.resultBox').style.display = "none";
       document.querySelector('.question').style.display = "block";
       window.location.reload();
       
}

let que_count = 0;
let counter;
let timeValue = 15;
let counterLine;
let widthValue = 0;
let userScore = 0;
nextBtn.onclick = () =>{
    if(que_count<questions.length -1){
        que_count++
        showQuestions(que_count);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        nextBtn.style.display = "none";
               
    
    }else{
        console.log("You have completed your task.");
        showResultBox();
    }
}

// nextBtn clicked function end


function showQuestions(index){
    const que_text = document.querySelector(".queTitle");
    let option_list = document.querySelector('.myOptions');
    let option_tag =    '<div class = "option"> <span>' +questions[index].options[0] + '</span></div>'
                      + '<div class = "option"> <span>' +questions[index].options[1] + '</span></div>' 
                      + '<div class = "option"> <span>' +questions[index].options[2] + '</span></div>' 
                      + '<div class = "option"> <span>' +questions[index].options[3] + '</span></div>' 
    option_list.innerHTML = option_tag;
    console.log(option_list);

    let que_tag = "<span>"+ questions[index].num + '.' + questions[index].question + "</span>";
    que_text.innerHTML = que_tag;

    const total_que = document.querySelector('.totalQuestion');
    let total_queTag = '<p>'+ questions[index].num +' of 5</p>';
    total_que.innerHTML = total_queTag;



    const option = option_list.querySelectorAll(".option");
    for(let i=0; i<option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}



let tickIcon = '<div class="tickIcon"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="crossIcon"><i class="fas fa-times"></i></div>';

function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.innerText;
    let correctAns = questions[que_count].answer;
    let allOptions = document.querySelector('.myOptions').children.length;
    let option_list = document.querySelector('.myOptions');
    if(userAns === correctAns){
        userScore +=1;
        console.log(userScore);
        answer.classList.add("correct");
        console.log("Correct")
        answer.insertAdjacentHTML("beforeend", tickIcon);
    }else{
        answer.classList.add("incorrect");
        console.log("wrong")
        answer.insertAdjacentHTML("beforeend", crossIcon);
        for(let i=0; i<allOptions; i++){
            if(option_list.children[i].innerText === correctAns){
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        }
    }

    for(let i=0; i<allOptions; i++){
        option_list.children[i].classList.add("disabled");
    }

    nextBtn.style.display = "block";

   
}



function showResultBox(){
    rulesBox.classList.remove('activeInfo');
    document.querySelector('.question').style.display = "none";
    document.querySelector('.resultBox').style.display = "block";
    const scoreText = document.querySelector('.scoreText');
    if(userScore>3){
       let scoreTag = `<span>Congratulations.. You got <p>${userScore}</p> out of <p>${questions.length}</p></span>`;
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore>1){
       let scoreTag = `<span>Caryy on.. You got <p>${userScore}</p> out of <p>${questions.length}</p></span>`;
        scoreText.innerHTML = scoreTag;
    }
    else{
       let scoreTag = `<span>So sorry.. You got only <p>${userScore}</p> out of <p>${questions.length}</p></span>`;
        scoreText.innerHTML = scoreTag;
    }

}


function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.innerText = time;
        time--;
        if(time<9){
            let addZero = timeCount.innerText;
            timeCount.innerText = "0" + addZero;
        }
        if(time<0){
            timeCount.innerText = "00";
            
        }
    }
}


function startTimerLine(time){
      counterLine = setInterval(timer, 40)
          function timer(){
              time += 1;
              timeLine.style.width = time + "px";
              if(time>400){
                clearInterval(counterLine);
              }
          }
      }








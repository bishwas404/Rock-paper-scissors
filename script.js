let userScore=0;
let computerScore=0;
let soundEnable=localStorage.getItem('sound')==='on';

const SELECTION=[
  {
    name:'rock',
    emoji:'✊🏻',
    beats:'scissors'
  },
  {
    name:'paper',
    emoji:'🖐🏻',
    beats:'rock'
  },
  {
    name:'scissors',
    emoji:'✌🏻',
    beats:'paper'
  }
]

const userscore_span=document.getElementById('user-score');
const computerscore_span=document.getElementById('computer-score');

const userSelected_div=document.getElementById('user-selected');
const computerSelected_div=document.getElementById('computer-selected');

const resultMsg = document.querySelector('.result-message');

const rock_div=document.getElementById('rock');
const paper_div=document.getElementById('paper');
const scissors_div=document.getElementById('scissors');

const soundButton=document.getElementById('sound-toggle')

soundButton.innerHTML= soundEnable ? 'Sound on': 'Sound off';

soundButton.addEventListener('click',()=>{
  soundEnable = !soundEnable;
  soundButton.innerHTML= soundEnable ? 'Sound on': 'Sound off';

})

localStorage.setItem('sound', soundEnable?'on':'off');

function userSelection(userObj){
  userSelected_div.innerHTML=userObj.emoji;
}

function compSelection(compObj){
  computerSelected_div.innerHTML=compObj.emoji;
}

function userSelected(){
  rock_div.addEventListener('click',()=>{
    playRound(SELECTION[0])
  });
  paper_div.addEventListener('click',()=>{
    playRound(SELECTION[1])
  });
  scissors_div.addEventListener('click',()=>{
    playRound(SELECTION[2])
  });


  document.addEventListener('keydown',(e)=>{
    if(e.key === 'ArrowLeft'){
      playRound(SELECTION[0])
    }
    else if(e.key === 'ArrowDown'|| e.key ==='ArrowUp'){
      playRound(SELECTION[1])
    }
    else if(e.key === 'ArrowRight'){
      playRound(SELECTION[2])
    }
  });

}
userSelected();

function playRound(userChoice){
  const computerChoice=randomSelection();
  userSelection(userChoice);
  compSelection(computerChoice);
  decideWinner(userChoice, computerChoice);
}

function randomSelection(){
  const selectionNum=Math.floor(Math.random()*SELECTION.length);
  return SELECTION[selectionNum];
}

function decideWinner(user, computer){
  if(user.beats === computer.name){
    updateScore('user');
    showMessage('YOU WIN!');
    speakMessage('YOU WIN!');
  }
  else if(computer.beats === user.name){
    updateScore('computer');
    showMessage('YOU LOOSE!');
    speakMessage('YOU LOOSE!');
  }
  else{
    updateScore('draw');
    showMessage('DRAW!');
    speakMessage('DRAW');
  }
}

function updateScore(winner){
  if(winner==='user'){
    userScore +=1;
    userscore_span.innerHTML=userScore;

  }
  else if(winner==='computer'){
    computerScore +=1;
    computerscore_span.innerHTML=computerScore;
  }

}

function showMessage(message){
  resultMsg.innerHTML= message;
  resultMsg.style.display='block';
  setTimeout(()=>{
    resultMsg.style.opacity=1;
  },10)

  setTimeout(() => {
    resultMsg.style.opacity=0;
    setTimeout(()=>{
      resultMsg.style.display='none';
    },500);
  },1000);
}

function speakMessage(message){
  if (!soundEnable) return;

  const utterance = new SpeechSynthesisUtterance(message);
  const voices = speechSynthesis.getVoices();
  utterance.voice = voices.find(voice => voice.name === 'Google UK English Male');
  utterance.pitch=1;
  utterance.rate=1;
  utterance.volume=1;

  speechSynthesis.speak(utterance);

}
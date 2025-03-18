let gameseq = [];
let userseq = [];
let started = false;
let level = 0;
let btns = ["red", "yellow", "green", "purple"];
let highscore = localStorage.getItem("highscore") || 0;
let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");
h3.innerText = `Your HighScore is : ${highscore}`;

document.addEventListener("keypress", function(){
    if(started == false){
        console.log("game started");
        started = true;
        levelup();
    }
});

function gameflash(btn){
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}
function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 250);
}
function levelup(){
    userseq = [];
    level ++;
    h2.innerText = `level ${level}`;

    let randIdx = Math.floor(Math.random()*3);
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);
    gameseq.push(randColor);
    console.log(gameseq);
    gameflash(randbtn);
}

function checkAns(idx){
    console.log("Curr level :", level);

    if(userseq[idx] === gameseq[idx]){
        if(userseq.length == gameseq.length){
            setTimeout(() => {
                levelup();
            }, 1000);
        }
    }else{
        if(level>highscore){
            highscore = level
            localStorage.setItem("highscore", highscore);
            h3.innerText = `Your Highscore is :  ${highscore}`
        }
            h2.innerHTML = `Game Over! Your Scor Was ${level} press any key to start game`;
            document.querySelector("body").style.backgroundColor = "red";
            setTimeout(() => {
                document.querySelector("body").style.backgroundColor = "white";
            }, 150);
            reset();
        }
}

function btnpress(btn){
    btn = this;
    userflash(this);
    usercolor =  btn.getAttribute("id");
    console.log(usercolor);
    userseq.push(usercolor);
    checkAns(userseq.length - 1)
}
let allBtns = document.querySelectorAll(".btn");
for (const btn of allBtns) {
    btn.addEventListener("click", btnpress);
}

function reset(){
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}
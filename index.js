let gameseq = [];
let userseq = [];

let btns = ["yellow", "green", "red", "purple"];
let started = false;
let level = 0;
let highScore = 0; 

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("game is started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;

    h3.innerText = `Your Highest Score is: ${highScore}`;

    let randidx = Math.floor(Math.random() * btns.length); 
    let randcolor = btns[randidx];
    let randBtn = document.querySelector(`.${randcolor}`);

    gameseq.push(randcolor);
    gameFlash(randBtn);
}

function checkAns(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length == gameseq.length) {
            setTimeout(levelUp, 1000); 
        }
    } else {
        if (level > highScore) {
            highScore = level;
        }

        h2.innerHTML = `Game Over! Your Score is <b>${level}</b> <br>Press any Key to Start...`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);

        reset();
    }
}

function btnpress() {
    let btn = this;
    userFlash(btn);
    let usercolor = btn.getAttribute("id");
    userseq.push(usercolor);
    checkAns(userseq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (btn of allbtns) {
    btn.addEventListener("click", btnpress);
}

function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}

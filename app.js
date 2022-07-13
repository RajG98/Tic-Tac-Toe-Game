const cellEvent = [...document.querySelectorAll(".cell")];
const board = document.querySelector(".board");
const body = document.querySelector("body");
const btn = document.querySelector("button");
let clickNum = 0;
let xNum = [];
let oNum = [];
let flag = 1;
let touchScreen = false;
let winnerDeclared = false;
board.addEventListener("touchstart", () => {
    touchScreen = true;
    cell.classList.remove("hoverX")
})
board.addEventListener("click", (e) => {
    if (e.target.nodeName === "SPAN") {
        clickNum += 1;
        if (clickNum % 2 == 0) {
            e.target.innerText = "O";
            e.target.style.color = "#ff0000";
            oNum.push(e.target.id);
            if (!touchScreen) {
                for (let cell of cellEvent) {
                    cell.classList.add("hoverX");
                    cell.classList.remove("hoverO");
                }
            }
            if (rowwise(oNum) || colwise(oNum) || diagonal(oNum)) {
                body.classList.add("o-wins");
                btn.style.display = "block";
                winnerDeclared = true;
            }

        }
        else if (clickNum % 2 == 1) {
            e.target.innerText = "X";
            e.target.style.color = "#0b06b2";
            xNum.push(e.target.id);
            if (!touchScreen) {
                for (let cell of cellEvent) {
                    cell.classList.add("hoverO");
                    cell.classList.remove("hoverX");
                }
            }
            if (rowwise(xNum) || colwise(xNum) || diagonal(xNum)) {
                body.classList.add("x-wins")
                btn.style.display = "block";
                winnerDeclared = true;
            }


        }
        for (let events of cellEvent) {
            if (!(events.innerHTML) || winnerDeclared) {
                flag = 0;
                if (winnerDeclared) {
                    for (let evt of cellEvent) {
                        evt.classList.add("avoid-clicks");
                    }
                }
                break;
            }
            else {
                flag = 1;
            }
        }
        if (flag === 1) {
            body.classList.add("draw"); 
            btn.style.display = "block";
        }
        e.target.classList.add("avoid-clicks");
    }
})

btn.addEventListener("click", () => {
    for (let events of cellEvent) {
        events.innerHTML = "";
        events.classList.remove("avoid-clicks","hoverO");
        events.classList.add("hoverX");
    }
    body.classList.remove("x-wins", "o-wins", "draw");
    btn.style.display = "none";
    winnerDeclared = false;
    clickNum = 0;
    flag = 0;
    xNum = [];
    oNum = [];
})


function rowwise(arr) {
    if (arr.includes('7') && arr.includes('8')
        && arr.includes('9')) {
        return true;
    }
    else if (arr.includes('4') && arr.includes('5')
        && arr.includes('6')) {
        return true;
    }
    else if (arr.includes('1') && arr.includes('2')
        && arr.includes('3')) {
        return true;
    }
}

function colwise(arr) {
    if (arr.includes('1') && arr.includes('4')
        && arr.includes('7')) {
        return true;
    }
    else if (arr.includes('2') && arr.includes('5')
        && arr.includes('8')) {
        return true;
    }
    else if (arr.includes('3') && arr.includes('6')
        && arr.includes('9')) {
        return true;
    }
}
function diagonal(arr) {
    if (arr.includes('1') && arr.includes('5')
        && arr.includes('9')) {
        return true;
    }
    else if (arr.includes('3') && arr.includes('5')
        && arr.includes('7')) {
        return true;
    }
}
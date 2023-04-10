const cells = document.querySelectorAll('.cell')
const statusText = document.querySelector('#status_text')
const restartBtn = document.querySelector('#restart_btn')
const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
]

let options = ["", "", "", "", "", "", "", "", ""]
let currentPlayer = "X"
let isFlag = false

initGame()

function initGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked))
    restartBtn.addEventListener('click', restartGame)
    statusText.textContent = `${currentPlayer} ходит`   
    isFlag = true
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex")
    if(options[cellIndex] != "" || !isFlag){
        return
    }
    updateCell(this, cellIndex)
    checkWinner()
}

function updateCell(cell, index) {
    options[index] = currentPlayer
    cell.textContent = currentPlayer
}

function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X"
    statusText.textContent = `"${currentPlayer}" ходит`
}

function checkWinner() {
    let roundWon = false
    for (let i = 0; i < winCondition.length; i++) {
        const condition = winCondition[i];
        const cellA = options[condition[0]]
        const cellB = options[condition[1]]
        const cellC = options[condition[2]]
        
        if(cellA === "" || cellB === "" || cellC === ""){
            continue
        }
        if(cellA === cellB && cellB === cellC){
            roundWon = true
            break
        }
    }

    if(roundWon){
        statusText.textContent = `"${currentPlayer}" Выиграл!!!`
        isFlag = false
    }
    else if(!options.includes("")){
        statusText.textContent = 'Ничья увы('
        isFlag = false
    }
    else{
        changePlayer()
    }
}

function restartGame() {
    currentPlayer = "X"
    options = ["", "", "", "", "", "", "", "", ""]
    statusText.textContent = `"${currentPlayer}" ходит`
    cells.forEach(cell => cell.textContent = '')
    isFlag = true

}




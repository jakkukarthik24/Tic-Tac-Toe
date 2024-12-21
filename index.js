const cells =document.querySelectorAll(".cell");
const reset=document.getElementById("reset-btn");
const statusText=document.getElementById("status");
let currentPlayer='X';
let board=['','','','','','','','',''];
let gameStatus=true;
const winningCombinations=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
function updateStatus(message){
    statusText.textContent=message;
}
function handleClick(event){
    const cell=event.target;
    const index=cell.getAttribute('data-index');
    if(board[index]!=='' || !gameStatus) return;
    board[index]=currentPlayer;
    cell.textContent=currentPlayer;
    if(checkWin()){
        updateStatus(`Player ${currentPlayer} wins`);
        gameStatus=false;
    }
    else if(board.every(cell=> cell!=='')){
        updateStatus("Its a tie");
        gameStatus=false;
    }
    else{
        currentPlayer=currentPlayer==='X'? 'O':'X';
        updateStatus(`Player ${currentPlayer}'s turn`)
    }
}
function checkWin(){
    return winningCombinations.some(combination=>{
        const [a,b,c]=combination;
        return board[a] && board[a]===board[b] && board[a]===board[c];
    });
}
function resetGame(){
    board=['','','','','','','','',''];
    gameStatus=true;
    currentPlayer='X';
    cells.forEach(cell=>(cell.textContent=''));
    updateStatus(`Player ${currentPlayer}'s turn`);
}
cells.forEach(cell=> cell.addEventListener('click',handleClick));
reset.addEventListener('click',resetGame);
updateStatus(`Player ${currentPlayer}'s turn`);
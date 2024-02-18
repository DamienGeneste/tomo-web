const canvas = document.getElementById('chessboardCanvas');
const ctx = canvas.getContext('2d');
const numRows = 16; // Number of rows
const numCols = 26; // Number of columns
const boxSize = canvas.width / numCols;
let chessboard = initializeChessboard();

// Track the number of times each box is clicked
let clickCounts = Array(numRows).fill().map(() => Array(numCols).fill(0));

function initializeChessboard() {
    let board = Array(numRows).fill().map(() => Array(numCols).fill(false));
    
    // Initialize a regular chessboard pattern
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            //board[row][col] = (row + col) % 2 === 0; // Alternating black and white squares
            board[row][col] = 0; // Alternating black and white squares

        }
    }
    return board;
}

function drawChessboard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            if (clickCounts[row][col] % 3 === 1) {
                ctx.fillStyle = 'black'; // First click, cross the box (red color)
            } else if (clickCounts[row][col] % 3 === 2) {
                ctx.fillStyle = 'red'; // Second click, cross the box (blue color)
            } else {
                ctx.fillStyle = 'white'; // Third click, revert to original color
            }
            ctx.fillRect(col * boxSize, row * boxSize, boxSize, boxSize);
        }
    }
    // Draw vertical lines on top of the chessboard
    for (let row = 0; row <= numRows; row++) {
        ctx.beginPath();
        ctx.moveTo(0, row * boxSize);
        ctx.lineTo(canvas.width, row * boxSize);
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }

    // Draw vertical lines on top of the chessboard
    for (let col = 0; col <= numCols; col++) {
        ctx.beginPath();
        ctx.moveTo(col * boxSize, 0);
        ctx.lineTo(col * boxSize, canvas.height);
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }
}

function drawInitChessboard() {
	printRowBlackEx()
        printColumnBlackEx()
}

function calculateCounts() {
    const rowCounts = chessboard.map(row => row.reduce((acc, val) => acc + (val ? 1 : 0), 0));
    const colCounts = Array(numCols).fill(0);
    
    for (let col = 0; col < numCols; col++) {
        for (let row = 0; row < numRows; row++) {
            if (chessboard[row][col]) {
                colCounts[col]++;
            }
        }
    }

    const rowCountsDiv = document.getElementById('rowCounts');
    const colCountsDiv = document.getElementById('colCounts');
    
    rowCountsDiv.innerHTML = '';
    colCountsDiv.innerHTML = '';

    
}

// Function to print the corresponding number of black boxes for each row to the right
//function printRowBlackCounts() {
//    const rowCounts = chessboard.map(row => row.reduce((acc, val) => acc + (val ? 1 : 0), 0));
//    
//    for (let row = 0; row < numRows; row++) {
//        const xLocation = canvas.width + 100;
//        printNumberAtLocation2(rowCounts[row], xLocation, row + 3);
//	
//    }
//
//}

function printRowBlackCounts() {
    const rowCounts = Array(numRows).fill(0);

    for (let col = 0; col < numCols; col++) {
        for (let row = 0; row < numRows; row++) {
            if (clickCounts[row][col] % 3 === 1) {
                rowCounts[row]++;
            }
    }
    }
    for (let row = 0; row < numRows; row++) {
        const xLocation = canvas.width + 92;
        printNumberAtLocation2(rowCounts[row], xLocation, row + 2.65);
	
    }

}

// Function to print the corresponding number of black boxes for each column below
function printColumnBlackCounts() {
    const colCounts = Array(numCols).fill(0);

    for (let col = 0; col < numCols; col++) {
        for (let row = 0; row < numRows; row++) {
            if (clickCounts[row][col] % 3 === 1) {
                colCounts[col]++;
            }
        }
        const yLocation = canvas.height + 86;
        printNumberAtLocation(colCounts[col], col * boxSize + 75, yLocation);
	
    }
}

function printRowBlackEx() {
    const rowCounts = chessboard.map(row => row.reduce((acc, val) => acc + (val ? 1 : 0), 0));
    const arr_col1 = new Array("1", "3", "4", "16", "15", "17", "11", "3", "2", "2", "1", "1", "1", "1", "1", "3");
    const arr_col2 = new Array("3", "5", "10", "1", "1", " ", "3", "1", "1", " ", " ", " ", " ", " ", " "," ");
    const arr_col3 = new Array(" ", " ", " ", " ", " ", " ", " ", "1", "1", " ", " ", " ", " ", " ", " "," ");
    for (let row = 0; row < numRows; row++) {
        const xLocation = 5;
        printNumberAtLocationLeft(arr_col1[row], xLocation + 47, row + 3.6);
        printNumberAtLocationLeft(arr_col2[row], xLocation + 20, row + 3.6);
        printNumberAtLocationLeft(arr_col3[row], xLocation , row + 3.6);
	
    }

}
    
function printColumnBlackEx() {
    const rowCounts = chessboard.map(row => row.reduce((acc, val) => acc + (val ? 1 : 0), 0));
    const arr_row1 = new Array(" "," "," "," "," "," "," "," ","5"," "," "," "," "," "," "," "," ", " "," "," "," "," "," "," "," "," ");
    const arr_row2 = new Array(" ","  "," ","1"," "," ","3"," ","1","5","6","10"," "," "," "," ", " "," "," "," "," "," "," "," "," "," ");
    const arr_row3 = new Array("1","2","3","1","2","3","1","5","1","1","2","2","12","8","6","4","4", "4","2","2","2","2","2","2","2","2");

    for (let col = 0; col < numCols; col++) {
	const yLocation = 0;
        printNumberAtLocationTop(arr_row1[col], col * boxSize + 81, yLocation);
        printNumberAtLocationTop(arr_row2[col], col * boxSize + 81, yLocation+25);
        printNumberAtLocationTop(arr_row3[col], col * boxSize + 81, yLocation+50);	
    }

}

function printNumberAtLocation(number, x, row) {
    const rowCountsDiv = document.getElementById('rowCounts');
    const numberElement = document.createElement('div');
    numberElement.textContent = number;
    numberElement.style.position = 'absolute';
    numberElement.style.left = `${x+ boxSize/2}px`;
    numberElement.style.top = `${row}px`;
    rowCountsDiv.appendChild(numberElement);
}

function printNumberAtLocation2(number, x, row) {
    const rowCountsDiv = document.getElementById('rowCounts');
    const numberElement = document.createElement('div');
    numberElement.textContent = number;
    numberElement.style.position = 'absolute';
    numberElement.style.left = `${x}px`;
    numberElement.style.top = `${row * boxSize + boxSize/2}px`;
    rowCountsDiv.appendChild(numberElement);
}

function printNumberAtLocationLeft(number, x, row) {
    const rowCountsDiv = document.getElementById('rowMentionned');
    const numberElement = document.createElement('div');
    numberElement.textContent = number;
    numberElement.style.position = 'absolute';
    numberElement.style.left = `${x}px`;
    numberElement.style.top = `${row * boxSize - boxSize/2}px`;
    rowCountsDiv.appendChild(numberElement);
}

function printNumberAtLocationTop(number, x, row) {
    const rowCountsDiv = document.getElementById('columMentionned');
    const numberElement = document.createElement('div');
    numberElement.textContent = number;
    numberElement.style.position = 'absolute';
    numberElement.style.left = `${x+ boxSize/2}px`;
    numberElement.style.top = `${row}px`;
    rowCountsDiv.appendChild(numberElement);
}

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const clickedRow = Math.floor(mouseY / boxSize);
    const clickedCol = Math.floor(mouseX / boxSize);

    clickCounts[clickedRow][clickedCol]++; // Increment click count 
    chessboard[clickedRow][clickedCol] = !chessboard[clickedRow][clickedCol];
    drawChessboard();
    calculateCounts();
    printRowBlackCounts();
    printColumnBlackCounts();
});


function resetChessboard() {
    chessboard = initializeChessboard();
    clickCounts = Array(numRows).fill().map(() => Array(numCols).fill(0));
    drawChessboard();
    calculateCounts();
    printRowBlackCounts();
    printColumnBlackCounts();
}

const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetChessboard);

drawInitChessboard();
drawChessboard();
calculateCounts();
printRowBlackCounts();
printColumnBlackCounts();


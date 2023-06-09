/* ==========================================================================
   Global variables
   ========================================================================== */
/**
 * 1. Array with fields (flex-direction row)
 * 1.1. All fields = null -> nothing in it.
 * 1.2. Fields can be filled with 'circle' or 'cross' (images)
 * 
 * 2. Variable for the current player
 */

let fields = [
    null,       // 0
    null,       // 1 
    null,       // 2      
    null,       // 3
    null,       // 4
    null,       // 5
    null,       // 6
    null,       // 7
    null        // 8
];


let currentPlayer = 'circle';


const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
    [0, 4, 8], [2, 4, 6], // diagonal
];


/* ==========================================================================
   Initialisation function
   ========================================================================== */
/**
 * 1. The 'init()' function is always executed
 * 1.1. Function 'render()' gets executed
 */

function init() {
    render();
}


/* ==========================================================================
   Render function
   ========================================================================== */
/**
 * 1. Select the element 'container' - save it in const variable 'container'
 * 2. 'let tableHtml' opens table (and closes it after for loop)
 * 
 * 3. 'for' loop to iterate through the first 3 rows
 * 3.1. One '<tr>' get generated for each iteration (= 3 table rows)
 * 3.2. 'tableHtml' adds '<tr>'
 * 
 * 4. Next 'for' loop generates 3 fields (in each row)
 * 4.1. Const 'index' caluclates the index (e.g. in row 1 -> 1 * 3 + 0 = 4 -> field number 4)
 * 4.2. 'let symbols' is empty
 * 4.3. If/else statement - calculated index === 'circle' or 'cross' than 'generateCircleSVG()' or 'x'
 * 4.4. 'onclick' function to add circle or cross into the field -> inserted with the following 'tableHtml += `<td onclick="handleClick(this, ${index})">${symbol}</td>`
 */

function render() {
    const container = document.getElementById('container');
    
    let tableHtml = '<table>';
    for (let i = 0; i < 3; i++) {
        tableHtml += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            let symbol = '';
            if (fields[index] === 'circle') {
                symbol = generateCircleSVG();
            } else if (fields[index] === 'cross') {
                symbol = generateCrossSVG();
            }
            tableHtml += /*html*/ `<td onclick="handleClick(this, ${index})">${symbol}</td>`;
      }
      tableHtml += '</tr>';
    }
    container.innerHTML = tableHtml;
}


/* ==========================================================================
   Generate forms -> svg
   ========================================================================== */

   function generateCircleSVG() {
    const color = '#000';
    const width = 40;
    const height = 40;

    return /*html*/     `<svg width="${width}" height="${height}">
                            <circle cx="20" cy="20" r="18" stroke="${color}" stroke-width="5" fill="none">
                                <animate attributeName="stroke-dasharray" from="0 188.5" to="188.5 0" dur="0.2s" fill="freeze" />
                            </circle>
                        </svg>`;
}

function generateCrossSVG() {
    const color = '#000';
    const width = 40;
    const height = 40;

    const svgHtml = /*html*/    `<svg width="${width}" height="${height}">
                                    <line x1="0" y1="0" x2="${width}" y2="${height}"
                                        stroke="${color}" stroke-width="4">
                                        <animate attributeName="x2" values="0; ${width}" dur="0.2s" />
                                        <animate attributeName="y2" values="0; ${height}" dur="0.2s" />
                                    </line>
                                    <line x1="${width}" y1="0" x2="0" y2="${height}"
                                        stroke="${color}" stroke-width="5">
                                        <animate attributeName="x2" values="${width}; 0" dur="0.2s" />
                                        <animate attributeName="y2" values="0; ${height}" dur="0.2s" />
                                    </line>
                                </svg>`;
    return svgHtml;
}


/* ==========================================================================
   Click
   ========================================================================== */
/**
 * 1. 'handleClick' function has two parameters 'cell' and 'index'
 * 1.1. Does the field/cell exist?
 *
 * 2. If statement -> if it's not filled -> fill it with current player ('circle' or 'cross')
 * 2.1. 'onclick' get removed after click on the field
 * 2.2. The current player chances -> if current player is 'circle' than 'cross' -> if else 'circle'
 */

function handleClick(cell, index) {
    if (fields[index] === null) {
        fields[index] = currentPlayer;
        cell.innerHTML = currentPlayer === 'circle' ? generateCircleSVG() : generateCrossSVG();
        cell.onclick = null;
        currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';

        if (isGameFinished()) {
            const winCombination = getWinningCombination();
            drawWinningLine(winCombination);
        }
    }
}


/* ==========================================================================
   Determine winner
   ========================================================================== */
/**
 * 1. 'isGameFinished' checks if game is finished
 * 1.1. '(field) => field !== null' -> checks if all fields within the array are filled
 *      if no field has the value 'null' than it gets evaluated to 'true'
 *      '.every() -> runs function for each field in the array
 * 
 * 1.2. If not all fields are filled the 'getWinningCombination()' is called -> to check if there is a 'winningCombinations'
 *      If a combination is found (inside each field the same value) -> 'getWinningCombination()' gets back the id's of the 'winningCombinations' fields
 *      If not -> returns 'null'
 * 
 * 1.3. The 'isGameFinished' gives back 'true' in both cases. Means that game is finished
 */

function isGameFinished() {
    return fields.every((field) => field !== null) || getWinningCombination() !== null;
}


function getWinningCombination() {
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (fields[a] === fields[b] && fields[b] === fields[c] && fields[a] !== null) {
            return winningCombinations[i];
        }
    }
    return null;
}


/* ==========================================================================
   Draw line (winner)
   ========================================================================== */
/**
 *
 */

function drawWinningLine(combination) {
    const lineColor = '#000';
    const lineWidth = 6;

    const startCell = document.querySelectorAll(`td`)[combination[0]];
    const endCell = document.querySelectorAll(`td`)[combination[2]];
    const startRect = startCell.getBoundingClientRect();
    const endRect = endCell.getBoundingClientRect();

    const contentRect = document.getElementById('container').getBoundingClientRect();

    const lineLength = Math.sqrt(
        Math.pow(endRect.left - startRect.left, 2) + Math.pow(endRect.top - startRect.top, 2)
    );
    const lineAngle = Math.atan2(endRect.top - startRect.top, endRect.left - startRect.left);

    const line = document.createElement('div');
    line.style.position = 'absolute';
    line.style.width = `${lineLength}px`;
    line.style.height = `${lineWidth}px`;
    line.style.backgroundColor = lineColor;
    line.style.top = `${startRect.top + startRect.height / 2 - lineWidth / 2 - contentRect.top}px`;
    line.style.left = `${startRect.left + startRect.width / 2 - contentRect.left}px`;
    line.style.transform = `rotate(${lineAngle}rad)`;
    line.style.transformOrigin = `top left`;
    document.getElementById('container').appendChild(line);
}


/* ==========================================================================
   Restart game
   ========================================================================== */
/**
 * 1. Reset the 'fields' array
 * 2. Calling 'render()' function
 */

function restartGame() {
    fields = [
        null,       // 0
        null,       // 1 
        null,       // 2      
        null,       // 3
        null,       // 4
        null,       // 5
        null,       // 6
        null,       // 7
        null        // 8
    ];
    render();
}
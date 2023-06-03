/* ==========================================================================
   Global variables
   ========================================================================== */
/**
 * 1. Array with fields (flex-direction row)
 * 1.1. All fields = null -> nothing in it.
 * 1.2. Fields can be filled with 'circle' or 'cross' (images)
 * 
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
 * 4.3. If/else statement - calculated index === 'circle' or 'cross' than 'o' or 'x'
 * 4.4. Inserted with the following 'tableHtml += `<td>${symbol}</td>`
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
                symbol = 'o'
            } else if (fields[index] === 'cross') {
                symbol = 'x'
            }
            tableHtml += `<td>${symbol}</td>`;
      }
      tableHtml += '</tr>';
    }
    container.innerHTML = tableHtml;
}



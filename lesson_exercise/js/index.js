'use strict';





// get user input with document.getelementsbyclassname and save to variables
// create HTML elements and then append at the end of the tabel 
function addInputElements() {
    const newRow = document.createElement('tr');
    Array.from(document.getElementsByClassName("input1")).forEach(element => {
        let newTD = document.createElement('td');
        let text = document.createTextNode(element.value);
        newTD.append(text);
        newRow.append(newTD);
    });
    // document.getElementsByClassName("tableBody1")[0].append(newRow);
    document.getElementsByClassName("lastHC")[0].after(newRow);
}


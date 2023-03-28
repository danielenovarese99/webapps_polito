'use strict';

window.onload = function () {

    const answers = [
        { date: "15/02/2023", text: "No", author: "daniele", score: 10 },
        { date: "17/02/2023", text: "Yes", author: "daniele", score: -10 },
        { date: "15/02/2023", text: "No", author: "daniele", score: 10 },
        { date: "15/02/2023", text: "No", author: "daniele", score: 10 },
        { date: "15/02/2023", text: "No", author: "daniele", score: 10 },
    ];

    const tableBody1 = document.getElementsByClassName('tableBody1')[0];
    answers.forEach(element => {
        let newRow = document.createElement('tr');
        Object.keys(element).forEach(el => {
            if (element == 'score') {
                let newTD = document.createELement('td');
                newTD.innerText = element[el];
                newTD.classList.add('scoreCounter');
                newRow.appendChild(newTD);
            }
            else {
                let newTD = document.createElement('td');
                newTD.innerText = element[el];
                newRow.appendChild(newTD);
            }
        })
        let btn = document.createElement('button');
        btn.innerText = 'Increase';
        btn.addEventListener('click', () => {
            btn.previousSibling.innerText = Number(btn.previousSibling.innerText) + 1;
        });


        newRow.appendChild(btn);
        tableBody1.appendChild(newRow);
    })


};

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
    document.getElementsByClassName('tableBody1')[0].appendChild(newRow);
}
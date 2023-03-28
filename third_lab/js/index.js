'use strict';

document.addEventListener("DOMContentLoaded", ready => {

    function toggleShadow() {
        document.getElementsByClassName("addMovieContainer")[0].classList.remove("buttonShadow");
        setTimeout(() => {
            document.getElementsByClassName("addMovieContainer")[0].classList.add("buttonShadow")
        }, 100);
        // TODO >> prompt user with window to insert new movie
    }


    const checkBoxes = Array.from(document.getElementsByClassName("checkBoxInput"));
    checkBoxes.forEach(element => element.checked = true);


    const filterOptions = Array.from(document.getElementsByClassName('filterOption1'));
    filterOptions.forEach(element => {
        element.onclick = () => {
            filterOptions.forEach(element2 => element2.classList.remove('selected1'));
            filterOptions.forEach(element2 => element2.classList.add('text-muted'));
            element.classList.remove('text-muted');
            element.classList.add('selected1');
        }
    });

    const filterOptions2 = Array.from(document.getElementsByClassName('filterOption2'));
    filterOptions2.forEach(element => {
        element.onclick = () => {
            filterOptions2.forEach(element2 => element2.classList.remove('selected2'));
            element.classList.add('selected2');
        }
    });

})
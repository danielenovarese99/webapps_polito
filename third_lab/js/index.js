'use strict';


/*
window.addEventListener("load", event => {
})
document.addEventListener("DOMContentLoaded", ready => {
})
*/
// window.addEventListener("load",event => {})
// it may be better off to use window.addEventListener("load") >> this is because the laod event is launched when the window has loaded extenal resources too, so we wont have 
/// too much computation going on - whereas with document, external resources may still be loading while we launch the scripts.

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

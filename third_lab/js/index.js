'use strict';


function toggleShadow(){
    document.getElementsByClassName("floatingButtonDiv")[0].classList.remove("buttonShadow");
    setTimeout(() => {
        document.getElementsByClassName("floatingButtonDiv")[0].classList.add("buttonShadow")
    },50);
    // TODO >> prompt user with window to insert new movie
}


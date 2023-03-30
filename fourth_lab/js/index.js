'use strict';

function Film(id, title, date = undefined, favorite = false, rating = 0) {
    this.id = id;
    this.title = title;
    this.date = date === undefined ? undefined : new Date(date);
    this.favorite = favorite;
    this.rating = rating;
}

let movies = [
    new Film(1, "Pulp fiction", "03 09 2023", true, 2),
    new Film(2, "21 grams", "03 09 2023", false, 3),
    new Film(3, "Star Wars", "03 09 2023", false, 5),
    new Film(4, "Matrix", "03 09 2022", true, 1),
    new Film(5, "Shrek", undefined, false, 1),
];

function deleteMovie(id,filter)
{
    // delete said movie, then update movies shown.
    movies = movies.filter(e => e.id != id);
    displayMovies(filter);
}


window.onload = function () {

    // call display function with filter "all";
    displayMovies('All');
}
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
        displayMovies(element.innerText);
        filterOptions.forEach(element2 => element2.classList.remove('selected1'));
        filterOptions.forEach(element2 => element2.classList.add('text-muted'));
        element.classList.remove('text-muted');
        element.classList.add('selected1');
    }
});


const filterOptions2 = Array.from(document.getElementsByClassName('filterOption2'));
filterOptions2.forEach(element => {
    element.onclick = () => {
        displayMovies(element.innerText);
        filterOptions2.forEach(element2 => element2.classList.remove('selected2'));
        element.classList.add('selected2');
    }
});



function displayMovies(filter) {
    document.getElementById('movieTableBody').innerHTML = '';

    let filteredMovies;
    switch (filter) {
        case 'All':
            console.log("Showing all");
            filteredMovies = movies.map(e => e);
            break;
        case 'Favorites':
            console.log("Favorite");
            filteredMovies = movies.filter(e => e.favorite === true);
            break;
        case 'Best rated':
            console.log("Best rated");
            filteredMovies = movies.filter(e => e.rating == 5);
            break;
        case 'Seen last month':
            console.log("Seen last month");
            let currentDate = new Date();
            filteredMovies = movies.filter(e => {
                if (e.date === undefined) {
                    return false;
                } else {
                    if (e.date.getFullYear() == currentDate.getFullYear() && e.date.getMonth == currentDate.getMonth) {
                        return true;
                    }
                }
            });
            break;
        default:
            console.log("Invalid filter");
            break;
    }

    // first empty entire table body

    filteredMovies.forEach(e => {
        let newTableRow = document.createElement('tr');
        let tableID = document.createElement('td');
        tableID.setAttribute('scope', 'row');
        tableID.innerText = e.id;

        // MOVIE TITLE
        let movieName = document.createElement('td');
        let movieNameDiv = document.createElement('div');
        movieNameDiv.innerText = e.title + "   ";
        movieName.appendChild(movieNameDiv);
        /// delete icon for movie title
        let movieNameTrashIcon = document.createElement('img');

        movieNameTrashIcon.setAttribute('src', './imgs/delete.png');
        movieNameTrashIcon.setAttribute('width', '15');
        movieNameTrashIcon.setAttribute('height', '15');
        movieNameTrashIcon.setAttribute('title','Click to delete movie');
        /// ADD EVENT LISTENER TO DELETE
        movieNameTrashIcon.addEventListener('click',()=>{
            deleteMovie(e.id,filter);
        })
        movieNameDiv.appendChild(movieNameTrashIcon);


        // MOVIE FAVORITE CHECKBOX
        let movieFav = document.createElement('td');
        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        e.favorite === true ? checkbox.setAttribute('checked', 'true') : checkbox.setAttribute('checked', 'false');
        checkbox.setAttribute('onclick','return false');
        movieFav.appendChild(checkbox);

        // MOVIE WATCHDATE
        let watchDate = document.createElement('td');
        watchDate.innerText = e.date == undefined ? "No watch date available" : e.date.getDate() + " / " + e.date.getMonth() + " / " + e.date.getFullYear();

        // MOVIE RATING
        let rating = document.createElement('td');
        // create div, append to rating <td></td>
        let ratingDiv = document.createElement('div');
        rating.appendChild(ratingDiv);
        // ADD AS MANY FILLED IMGs AS RATING + EMPTY RATING IMAGES FOR REMAINING RATINGS
        let i, count = 0;
        for (let i = 0; i < 5; i++) {
            if (count < e.rating) {
                count++;
                // create image
                let ratedimage = document.createElement('img');
                ratedimage.setAttribute('src', './imgs/rated.png');
                ratedimage.setAttribute('width', '20');
                ratedimage.setAttribute('height', '20');
                // append to div
                ratingDiv.appendChild(ratedimage);
            }
            else {
                // create image
                let ratedimage = document.createElement('img');
                ratedimage.setAttribute('src', './imgs/not_rated.png');
                ratedimage.setAttribute('width', '20');
                ratedimage.setAttribute('height', '20');
                // append to div
                ratingDiv.appendChild(ratedimage);
            }
        }

        // ADD ALL ELEMENTS CREATED TO CURRENT TABLE ROW
        newTableRow.appendChild(tableID);
        newTableRow.appendChild(movieName);
        newTableRow.appendChild(movieFav);
        newTableRow.appendChild(watchDate);
        newTableRow.appendChild(rating);

        // ADD TABLE ROW TO TABLE BODY
        document.getElementById('movieTableBody').appendChild(newTableRow);
    })
}
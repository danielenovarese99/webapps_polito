function Film(id, title, date = undefined, favorite = false, rating = 0) {
    this.id = id;
    this.title = title;
    this.date = date === undefined ? undefined : new Date(date);
    this.favorite = favorite;
    this.rating = rating;
}

export default Film;
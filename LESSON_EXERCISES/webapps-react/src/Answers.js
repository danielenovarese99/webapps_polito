function Answer(id,response, respName, date, score = 0) {
    this.response = response;
    this.respName = respName;
    this.score = score;
    this.date = new Date(date);
    this.id = id;
};

export default Answer;
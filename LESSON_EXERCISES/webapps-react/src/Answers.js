function Answer(response, respName, date, score = 0) {
    this.response = response;
    this.respName = respName;
    this.score = score;
    this.date = new Date(date);
};

export default Answer;
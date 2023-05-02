function Answer(id,response, respName, date,questionID, score = 0) {
    this.response = response;
    this.respName = respName;
    this.score = score;
    this.date = new Date(date);
    this.id = id;
    this.questionID = questionID;
};

export default Answer;
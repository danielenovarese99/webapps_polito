
function Question(question, questName, date) {
    this.question = question;
    this.questName = questName;
    this.date = new Date(date);
    this.answers = [];

    this.add = (Answer) => {
        this.answers.push(Answer);
    }

    this.findAll = (name) => {
        return this.answers.filter(element => element.respName === name);
    }

    this.afterDate = (date) => {
        const filterDate = dayjs(Date);
        return this.answers.filter((element) => {
            if (element.Date.isAfter(filterDate)) return element;
            /*
           if(element.Date.year() > filterDate.year()) return element;
           else if(element.Date.year() == filterDate.year())
           {
               if(element.Date.month() > filterDate.month()) return element;
               else if(element.Date.month() == filterDate.month())
               {
                   if(element.Date.day() > filterDate.day()) return element;
               }
           }
           */
        })
    }


    this.listByDate = () => {
        return [...this.answers].sort((el1, el2) => el1.Date.isAfter(el2.date) ? 1 : -1);

        /*
        if(el1.Date.year() != el2.Date.year())
            return el1.Date.year() - el2.Date.year();
        else{
            if(el1.Date.month() != el2.Date.month())
                return el1.Date.month() - el2.Date.month();
            else{
                return el1.Date.day() != el2.Date.day();
            }
        }
        */
    }

    this.listByScore = () => {
        return this.answers.sort((e1, e2) => e2.score - e1.score);;
    }
    this.getAnswers = () => {return this.answers;}

};

export default Question;
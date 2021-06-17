export default class Note {
    constructor(status, subject, description, importance, startDate, finishDate) {
        this.status = status;
        this.subject = subject;
        this.description = description;
        this.importance = importance;
        this.startDate = startDate;
        this.finishDate = finishDate;
    }
}

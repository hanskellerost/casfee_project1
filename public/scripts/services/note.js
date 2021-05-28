export default class Note {
    constructor(id, status, subject, description, importance, startDate, finishDate) {
        this.id = id;
        this.status = status;
        this.subject = subject;
        this.description = description;
        this.importance = importance;
        this.startDate = startDate;
        this.finishDate = finishDate;
    }
}
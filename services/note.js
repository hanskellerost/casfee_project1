export default class Note {
    constructor(obj) {
        if (obj && obj.startDate && typeof obj.startDate === 'string') {
            obj.startDate = new Date(obj.startDate);
        }
        if (obj && obj.endDate && typeof obj.endDate === 'string') {
            obj.endDate = new Date(obj.endDate);
        }
        Object.assign(this, obj);
    }
}

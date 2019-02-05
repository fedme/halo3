import * as shortId from 'shortid';

export class Participant {

    id: string;
    code: string;
    gender: string;
    age: number;
    ageGroup: string;
    dob: Date;
    grade: number;

    constructor() {
        // generate random short id
        this.generateId();
    }

    public generateId(): void {
        this.id = shortId.generate();
    }

    public equals(obj: Participant): boolean {
        return this.id === obj.id;
    }

}  
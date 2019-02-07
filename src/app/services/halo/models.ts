import { Utils } from "../common/utils";

export enum Instructor {
    Blue = 'blue',
    Yellow = 'yellow'
}

export enum Skill {
    Fish = 'fish',
    QA = 'qa'
}

export enum Confidence {
    Confident = 'confident',
    NonConfident = 'notconfident'
}

export enum ConfidenceLevel {
    VerySure = 'verysure',
    DontKnow = 'dontknow',
    NotSure = 'notsure'
}

export class MemoryCheck {
    possibleChoices: Instructor[];
    choice: Instructor;

    constructor() {
        this.possibleChoices = [
            Instructor.Blue,
            Instructor.Yellow
        ];
        Utils.shuffleArray(this.possibleChoices);
    }

    registerChoice(instructor: Instructor) {
        this.choice = instructor;
    }

    chooseByIndex(i: number) {
        if (i < this.possibleChoices.length)
            this.registerChoice(this.possibleChoices[i]);
    }
}

export class TestRound {
    picture: string;
    choice: Instructor;
    confidence: Confidence;
    confidenceLevel: ConfidenceLevel;

    possibleChoices: Instructor[];
    confidenceChoices: Confidence[];
    confidenceLevelChoices: ConfidenceLevel[];

    constructor(picture: string) {
        this.picture = picture;
        this.possibleChoices = [Instructor.Blue, Instructor.Yellow];
        Utils.shuffleArray(this.possibleChoices);
        this.confidenceChoices = [Confidence.Confident, Confidence.NonConfident];
        Utils.shuffleArray(this.confidenceChoices);
        this.confidenceLevelChoices = [ConfidenceLevel.NotSure, ConfidenceLevel.VerySure];
        Utils.shuffleArray(this.confidenceLevelChoices);
        this.confidenceLevelChoices.splice(1, 0, ConfidenceLevel.DontKnow);
    }

    chooseInstructor(i: number) {
        if (i < this.possibleChoices.length)
            this.choice = this.possibleChoices[i];
    }

    chooseConfidence(i: number) {
        if (i < this.confidenceChoices.length)
            this.confidence = this.confidenceChoices[i];
    }

    chooseConfidenceLevel(i: number) {
        if (i < this.confidenceLevelChoices.length)
            this.confidenceLevel = this.confidenceLevelChoices[i];
    }
}

export class TestBattery {
    tests: TestRound[];

    constructor(tests: TestRound[]) {
        this.tests = tests;
    }
}

export class Video {
    id: number;
    instructor: Instructor;
    skill: Skill;

    constructor(id: number, instructor: Instructor, skill: Skill) {
        this.id = id;
        this.instructor = instructor;
        this.skill = skill;
    }

    get videoFile(): string { 
        return `assets/videos/Edit_Video${this.id}_${this.instructor}_${this.skill.toUpperCase()}EXPERT.mp4`;
    }
}

export class Condition {
    id: string;
    videos: Video[] = [];

    constructor(id: string, videos: Video[] = []) {
        this.id = id;
        this.videos = videos;
    }

    static GetAllConditions(): Condition[] {
        return [
            new Condition(
                'blue-fish',
                [
                    new Video(1, Instructor.Blue, Skill.Fish),
                    new Video(1, Instructor.Yellow, Skill.QA),
                    new Video(2, Instructor.Blue, Skill.Fish),
                    new Video(2, Instructor.Yellow, Skill.QA)
                ]
            ),
            new Condition(
                'blue-qa',
                [
                    new Video(1, Instructor.Blue, Skill.QA),
                    new Video(1, Instructor.Yellow, Skill.Fish),
                    new Video(2, Instructor.Blue, Skill.QA),
                    new Video(2, Instructor.Yellow, Skill.Fish)
                ]
            ),
            new Condition(
                'yellow-fish',
                [
                    new Video(1, Instructor.Yellow, Skill.Fish),
                    new Video(1, Instructor.Blue, Skill.QA),
                    new Video(2, Instructor.Yellow, Skill.Fish),
                    new Video(2, Instructor.Blue, Skill.QA)
                ]
            ),
            new Condition(
                'yellow-qa',
                [
                    new Video(1, Instructor.Yellow, Skill.QA),
                    new Video(1, Instructor.Blue, Skill.Fish),
                    new Video(2, Instructor.Yellow, Skill.QA),
                    new Video(2, Instructor.Blue, Skill.Fish)
                ]
            )
        ];
    };
    
}


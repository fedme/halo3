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

export enum Environment {
    Animals = 'animals',
    Fish = 'fish',
    Houses = 'houses'
}

export enum Art {
    Animals = 'animals',
    BetterAtSchool = 'betteratschool',
    Icecream = 'icecream',
    TreasureHunt = 'treasurehunt'
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

    choose(instructor: Instructor) {
        this.choice = instructor;
    }

    chooseByIndex(i: number) {
        if (i < this.possibleChoices.length)
            this.choose(this.possibleChoices[i]);
    }
}

export class MemoryCheckBattery {
    checks: MemoryCheck[];
    private checkIndex: number;

    constructor(checks: MemoryCheck[]) {
        this.checks = checks;
        this.checkIndex = 0;
    }

    public get currentCheck(): MemoryCheck {
        if (this.checkIndex >= this.checks.length) return null;
        return this.checks[this.checkIndex];
    }

    public get visualIndex(): number {
        return this.checkIndex + 1;
    }

    public isLastCheck(): boolean {
        return this.checkIndex >= this.checks.length - 1;
    }

    public nextCheck() {
        this.checkIndex++;
    }

    public static getDefault(): MemoryCheckBattery {
        return new MemoryCheckBattery([
            new MemoryCheck(),
            new MemoryCheck(),
            new MemoryCheck(),
            new MemoryCheck(),
        ]);
    }
}

export class TestRound {
    picture: Environment;
    choice: Instructor;
    confidence: Confidence;
    confidenceLevel: ConfidenceLevel;

    possibleChoices: Instructor[];
    confidenceChoices: Confidence[];
    confidenceLevelChoices: ConfidenceLevel[];

    constructor(picture: Environment) {
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

    public static getDefault(): TestBattery {
        const battery = new TestBattery([
            new TestRound(Environment.Animals),
            new TestRound(Environment.Fish),
            new TestRound(Environment.Houses),
        ]);
        Utils.shuffleArray(battery.tests);
        return battery;
    }
}

export class SecondTestRound {
    picture: Art;
    choice: Instructor;

    possibleChoices: Instructor[];
    

    constructor(picture: Art) {
        this.picture = picture;
        this.possibleChoices = [Instructor.Blue, Instructor.Yellow];
        Utils.shuffleArray(this.possibleChoices);
    }

    chooseInstructor(i: number) {
        if (i < this.possibleChoices.length)
            this.choice = this.possibleChoices[i];
    }
}

export class SecondTestBattery {
    tests: SecondTestRound[];
    private testIndex: number;

    constructor(tests: SecondTestRound[]) {
        this.tests = tests;
        this.testIndex = 0;
    }

    public get currentTest(): SecondTestRound {
        if (this.testIndex >= this.tests.length) return null;
        return this.tests[this.testIndex];
    }

    public isLastTest(): boolean {
        return this.testIndex >= this.tests.length - 1;
    }

    public nextTest() {
        this.testIndex++;
    }

    public static getDefault(): SecondTestBattery {
        const battery = new SecondTestBattery([
            new SecondTestRound(Art.Animals),
            new SecondTestRound(Art.BetterAtSchool),
            new SecondTestRound(Art.Icecream),
            new SecondTestRound(Art.TreasureHunt)
        ]);
        Utils.shuffleArray(battery.tests);
        return battery;
    }
}

export class ExplanationBattery {
    explanations: Environment[];

    constructor(exps: Environment[]) {
        this.explanations = exps;
    }

    public static getDefault(): ExplanationBattery {
        const battery = new ExplanationBattery([
            Environment.Animals,
            Environment.Fish,
            Environment.Houses
        ]);
        return battery;
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

    static getAll(): Condition[] {
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


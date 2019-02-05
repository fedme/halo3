export enum Instructor {
    Blue = 'blue',
    Yellow = 'yellow'
}

export enum Skill {
    Fish = 'fish',
    QA = 'qa'
}

export enum ConfidenceLevel {
    VerySure = 'veryshure',
    DontKnow = 'dontknow',
    NotSure = 'notsure'
}

export class MemoryCheck {
    choice: Instructor;
}

export class TestRound {
    picture: string;
    choice: Instructor;
    confident: boolean;
    confidenceLevel: ConfidenceLevel
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

    get VideoFile(): string { 
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


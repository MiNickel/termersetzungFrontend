export class Exam {
    constructor(
        public id: number,
        public name: string,
        public examiner: Examiner,
        public tasks: Task[],
        public code: string,
        public startDate: Date,
        public endDate: Date
    ) {

    }
}

export class Exercise {
    constructor(
        public id: number,
        public name: string,
        public examiner: Examiner,
        public category: string,
        public tasks: Task[]
    ) {
    }
}

export class Task {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public steps: Step[],
        public score: number
    ) {

    }
}

export class Step {
    constructor(
        public id: number,
        public step: string,
        public score: number,
        public conversion: string
    ) {

    }
}

export class CheckStep {
    constructor(
        public step: string,
        public conversion: string,
        public isCorrect: boolean,
    ) {
    }
}

export class Examiner {
    constructor(
        public id: number,
        public firstname: string,
        public lastname: string
    ) {

    }
}

export class Student {
    constructor(
        public id: number,
        public firstname: string,
        public lastname: string,
        public studentNumber: number
    ) {

    }
}

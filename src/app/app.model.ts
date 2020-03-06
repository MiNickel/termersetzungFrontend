export class Exam {
    constructor(
        public id: number,
        public name: string,
        public professor: string,
        public tasks: Task[],
        public code: string
    ) {

    }
}

export class Exercise {
    constructor(
        public id: number,
        public name: string,
        public professor: string,
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
        public startTerm: string,
        public steps: string[],
        public endTerm: string,
        public score: number
    ) {

    }
}

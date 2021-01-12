export class Credentials {
    constructor(
        public username: string,
        public password: string,
    ) {

    }
}

export class Exam {
    constructor(
        public id: number,
        public name: string,
        public examinerId: number,
        public tasks: Task[],
        public code: string,
        public startDate: Date,
        public endDate: Date
    ) {

    }
}

export class StudentExam {
    constructor(
        public id: number,
        public tasks: Task[],
        public examId: number,
        public studentId: number,
    ) {

    }
}

export class Exercise {
    constructor(
        public id: number,
        public name: string,
        public examinerId: number,
        public category: string,
        public tasks: Task[]
    ) {
    }
}

export class StudentExercise {
    constructor(
        public id: number,
        public tasks: Task[],
        public exerciseId: number,
        public studentId: number
    ) {

    }
}

export class Task {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public notes: string,
        public steps: Step[],
        public score: number,
        public examId: number,
        public exerciseId: number,
        public studentExamId: number,
        public studentExerciseId: number
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
        public startEquation: string,
        public rule: string,
        public targetEquation: string,
        public correct: boolean,
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

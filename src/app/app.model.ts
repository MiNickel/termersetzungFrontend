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

export class ExamDto {
  constructor(
    public id: number,
    public name: string,
    public examiner: Examiner,
    public tasks: TaskDto[],
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
        public examId: number
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

export class TaskDto {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public startTerm: string,
    public score: number,
    public examId: number,
    public exerciseId: number,
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

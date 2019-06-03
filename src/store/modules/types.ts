export interface ITask {
    id: number;
    title: string;
    dateStart: Date | string;
    dateEnd: Date | string;
    executor: string;
    color: string;
}

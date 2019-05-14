import { ITask } from '@/store/modules/types';
export const calculateDaysCount = (dateStart: Date, dateEnd: Date) => {
    return Math.round((+dateEnd - +dateStart) / (1000 * 60 * 60 * 24));
};

export const isExecutorFree = (newTask: ITask, tasks: ITask[]): boolean => {
    const tasksWithExecutor = tasks.filter((task) => task.executor === newTask.executor);
    if (tasksWithExecutor.length === 0) {
        return true;
    }

    for (const task of tasks) {
        if (newTask.dateStart >= task.dateStart && newTask.dateStart <= task.dateEnd) {
            return false;
        }

        if (+newTask.dateEnd >= +task.dateStart && +newTask.dateEnd <= +task.dateEnd) {
            return false;
        }
    }

    return true;
};

function* generateId(): IterableIterator<number> {
    let id = 0;
    while (true) {
        yield id;
        id++;
    }
}

export const idGenerator = generateId();

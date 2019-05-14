import { VuexModule, Module, getModule, Mutation } from 'vuex-module-decorators';
import store from '@/store/store';
import { ITask } from './types';
import { sortByDate } from '@/utils/date';

@Module({ name: 'chartCommon', store, dynamic: true })
class ChartCommon extends VuexModule {
    public readonly executors: string[] = [
        'Никита Лебедев', 'Илья Низовцев', 'Анна Берсенёва', 'Беслан Муков', 'Кутемба Мчанга',
    ];

    public tasks: ITask[] = [];
    public startTime: Date = new Date();

    @Mutation
    public addTask(task: ITask): void {
        const taskDate = new Date(task.dateStart);
        if (this.startTime >= taskDate) {
            this.startTime = taskDate;
        }
        
        if (this.tasks.length === 0) {
            this.startTime = taskDate;
        }
        this.tasks.push(task);
    }

    @Mutation
    public editTask(task: ITask): void {
        const foundedIndex = this.tasks.findIndex((item) => item.id === task.id);
        this.tasks[foundedIndex] = task;
    }

    @Mutation
    public deleteTask(id: number): void {
        const foundedIndex = this.tasks.findIndex((item) => item.id === id);
        this.tasks.splice(foundedIndex, 1);
    }
}

export const ChartCommonModule = getModule(ChartCommon);

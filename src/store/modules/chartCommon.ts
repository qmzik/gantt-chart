import { VuexModule, Module, getModule, Mutation } from 'vuex-module-decorators';
import store from '@/store/store';
import { ITask } from './types';

@Module({ name: 'chartCommon', store, dynamic: true })
class ChartCommon extends VuexModule {
    public readonly executors: string[] = [
        'Никита Лебедев', 'Илья Низовцев', 'Анна Берсенёва', 'Беслан Муков', 'Кутемба Мчанга',
    ];

    public tasks: ITask[] = [];

    @Mutation
    public addTask(task: ITask): void {
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

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
}

export const ChartCommonModule = getModule(ChartCommon);

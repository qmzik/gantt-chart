import { VuexModule, Module, getModule, Mutation } from 'vuex-module-decorators';
import store from '@/store/store';

@Module({ name: 'taskHandler', store, dynamic: true })
class TaskHandler extends VuexModule {
    private isModalOpen: boolean = false;

    @Mutation
    private toggleModal(): void {
        this.isModalOpen = !this.isModalOpen;
    }
}

export const ChartCommonModule = getModule(TaskHandler);

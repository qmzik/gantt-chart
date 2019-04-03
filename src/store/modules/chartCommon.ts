import { VuexModule, Module, getModule, Mutation } from 'vuex-module-decorators';
import store from '@/store/store';

@Module({ name: 'chartCommon', store, dynamic: true })
class ChartCommon extends VuexModule {
}

export const ChartCommonModule = getModule(ChartCommon);

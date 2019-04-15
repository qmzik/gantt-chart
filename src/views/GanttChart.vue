<template>
  <div class="ganttChart">
      <Timeline></Timeline>
      <Task v-for="(task, i) in taskList"
            :key="i"
            :taskInfo="task"
      ></Task>
      <CreateTaskModal></CreateTaskModal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { getTwoMonthsDays, Month } from '@/utils/date';
import Timeline from '@/components/Timeline.vue';
import Task from '@/components/Task.vue';
import CreateTaskModal from '@/components/CreateTaskModal.vue';
import { ITask } from '../store/modules/types';
import { ChartCommonModule } from '../store/modules/chartCommon';

@Component({
    components: { Timeline, Task, CreateTaskModal },
})
export default class GanttChart extends Vue {
    private get months(): Month[] {
        return getTwoMonthsDays(this.startTime.getMonth(), this.startTime.getDate());
    }

    private readonly dateStart: Date = new Date(2019, 3, 17);
    private readonly dateEnd: Date = new Date(2019, 3, 20);

    private get taskList(): ITask[] {
        return ChartCommonModule.tasks;
    }

    private get startTime(): Date {
        return new Date();
    }
}
</script>

<style scoped>
.ganttChart {
    max-width: 1374px;
    display: flex;
    flex-direction: column;
    user-select: none;
}

.ganttChart__month {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 5px;
}

.ganttChart__month:nth-child(even) {
    border-left: 1px solid black;
    border-right: 1px solid black;
}

.month__days {
    display: flex;
}

.day {
    width: 20px;
    height: 20px;
    text-align: center;
}
</style>

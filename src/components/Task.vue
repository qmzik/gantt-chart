<template>
    <div>
        <div class="task" @click="toggleModal">
            <span class="task__title">{{ task.title }}</span>
            <div class="task__line" :style="{ width: width, marginLeft: margin }"></div>
        </div>
        <AtModal v-model="isModalShown" title="Edit task" :maskClosable="false" :showClose="false">
            <label class="editTask__label">
                <span class="label__text">Task Title</span>
                <AtInput v-model="task.title" :value="task.title"></AtInput>
            </label>
            <label class="editTask__label">
                <span class="label__text">Date Start</span>
                <AtInput v-model="task.dateStart" type="date"></AtInput>
            </label>
            <label class="editTask__label">
                <span class="label__text">Date End</span>
                <AtInput v-model="task.dateEnd" type="date"></AtInput>
            </label>
            <label class="editTask__label">
                <span class="label__text">Executor</span>
                <AtSelect v-model="task.executor" size="large">
                    <AtOption v-for="executor in executorsList" :key="executor" :value="executor">{{ executor }}</AtOption>
                </AtSelect>
            </label>
            <div slot="footer">
                <AtButton type="error" @click="handleDelete">Delete task</AtButton>
                <AtButton @click="handleCancel">Cancel edit</AtButton>
                <AtButton type="primary" @click="handleEdit">Confirm edit</AtButton>
            </div>
        </AtModal>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { calculateDaysCount } from '@/utils/task';
import { dateFormat } from '@/utils/date';
import { ITask } from '../store/modules/types';
import { ChartCommonModule } from '../store/modules/chartCommon';

@Component
export default class Task extends Vue {
    @Prop() private taskInfo!: ITask;

    private task: ITask = {
        id: this.taskInfo.id,
        title: this.taskInfo.title,
        dateStart: dateFormat(this.taskInfo.dateStart as Date),
        dateEnd: dateFormat(this.taskInfo.dateEnd as Date),
        executor: this.taskInfo.executor,
    };

    private beforeEditTask: ITask = ChartCommonModule.tasks.find((item) => item.id === this.taskInfo.id) as ITask;
    private isModalShown: boolean = false;

    private beforeMount(): void {
        this.task = {
            id: this.beforeEditTask.id,
            title: this.beforeEditTask.title,
            dateStart: dateFormat(this.beforeEditTask.dateStart as Date),
            dateEnd: dateFormat(this.beforeEditTask.dateEnd as Date),
            executor: this.beforeEditTask.executor,
        };
    }

    private toggleModal(): void {
        this.isModalShown = !this.isModalShown;
    }

    private get executorsList(): string[] {
        return ChartCommonModule.executors;
    }

    private handleEdit(): void {
        const preparedTask = this.task;
        preparedTask.dateStart = new Date(this.task.dateStart);
        preparedTask.dateEnd = new Date(this.task.dateEnd);

        ChartCommonModule.editTask(preparedTask);
        this.toggleModal();
    }

    private handleDelete(): void {
        ChartCommonModule.deleteTask(this.taskInfo.id);
        this.toggleModal();
    }

    private handleCancel(): void {
        this.task = this.beforeEditTask;

        this.toggleModal();
    }

    private get width(): string {
        if (ChartCommonModule.startTime > this.task.dateStart) {
            return `${calculateDaysCount(ChartCommonModule.startTime, new Date(this.task.dateEnd)) * 20}px`;
        }
        return `${calculateDaysCount(new Date(this.task.dateStart), new Date(this.task.dateEnd)) * 20}px`;
    }

    private get margin(): string {
        if (ChartCommonModule.startTime >= this.task.dateStart) {
            return '0px';
        }

        return `${calculateDaysCount(ChartCommonModule.startTime, new Date(this.task.dateStart)) * 20}px`;
    }

}
</script>

<style scoped>
.task {
    min-height: 40px;
    background-color: inherit;
    width: 100%;
    border-bottom: 1px solid black;
    border-right: 1px solid black;
    display: flex;
}

.editTask__label {
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
}

.label__text {
    text-align: left;
    margin-bottom: 5px;
}

.task__title {
    width: 150px;
    min-height: 100%;
    border-right: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
    position: sticky;
    left: 0;
    background-color: white;
}

.task__line {
    background-color: aqua;
}
</style>

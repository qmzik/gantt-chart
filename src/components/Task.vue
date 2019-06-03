<template>
    <div>
        <div class="task" @click="toggleModal">
            <span class="task__title">{{ title }}</span>
            <div class="task__line" :style="{ width: width, marginLeft: margin, backgroundColor: task.color }">
                <span class="title__popup">{{ title }}</span>
            </div>
        </div>
        <AtModal v-model="isModalShown" title="Edit task" :maskClosable="false" :showClose="false">
            <label class="editTask__label">
                <span class="label__text">Task Title</span>
                <AtInput v-model="task.title"></AtInput>
            </label>
            <label class="editTask__label">
                <span class="label__text">Color</span>
                <AtSelect v-model="task.color" size="large">
                    <AtOption class="color__select" v-for="c in colorsList" :key="c" :value="c" :style="{ backgroundColor: c }">{{ c }}</AtOption>
                </AtSelect>
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
import { isExecutorFree } from '../utils/task';
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
        color: this.taskInfo.color,
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
            color: this.taskInfo.color,
        };
    }

    private toggleModal(): void {
        this.isModalShown = !this.isModalShown;
    }

    private get title(): string {
        if (this.task.title.length > 16) {
            return `${this.task.title.slice(0, 16)}...`
        }

        return this.task.title;
    }

    private get executorsList(): string[] {
        return ChartCommonModule.executors;
    }

    private get colorsList(): string[] {
        return ChartCommonModule.colors;
    }

    private handleEdit(): void {
        if (!Boolean(this.task.title) || !Boolean(this.task.dateStart) || !Boolean(this.task.dateEnd) || !Boolean(this.task.executor) || !Boolean(this.task.color)) {
            this.$Notify({
                title: 'Error',
                message: 'Fill all inputs',
                type: 'error',
            });

            return;
        }

        const preparedTask = this.task;
        preparedTask.dateStart = new Date(this.task.dateStart);
        preparedTask.dateEnd = new Date(this.task.dateEnd);

        if (preparedTask.dateStart >= preparedTask.dateEnd) {
            this.$Notify({
                title: 'Error',
                message: 'Date start cannot be later than Date end',
                type: 'error',
            });

            return;
        }

        if (preparedTask.dateStart < new Date()) {
            this.$Notify({
                title: 'Error',
                message: 'Date start cannot be earlier than now',
                type: 'error',
            });

            return;
        }

        if (!isExecutorFree(preparedTask, ChartCommonModule.tasks)) {
            this.$Notify({
                title: 'Error',
                message: 'Executor is already has a task in this interval',
                type: 'error',
            });

            return;
        }

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
    cursor: pointer;
}

.title__popup {
    position: absolute;
    width: 100%;
    bottom: 40px;
    display: none;
    z-index: 3;
    font-size: 15px;
    background-color: black;
    color: aliceblue;
    padding: 5px;
    border-radius: 5px;
    word-break: break-all;
}

.task__line:hover > .title__popup {
    display: flex;
    justify-content: center;
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
    min-width: 150px;
    min-height: 100%;
    border-right: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
    position: sticky;
    left: 0;
    background-color: white;
    z-index: 10;
}

.task__line {
    background-color: aqua;
    position: relative;
}

.color__select {
    color: aliceblue;
}
</style>

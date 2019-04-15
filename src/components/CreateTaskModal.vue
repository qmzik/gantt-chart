<template>
    <div class="createTask">
        <div class="createTask__button" @click="toggleModal">+</div>
        <AtModal v-model="isModalShown" title="Create task" :maskClosable="false" :showClose="false">
            <label class="createTask__label">
                <span class="label__text">Task Title</span>
                <AtInput v-model="title" placeholder="To do gantt-chart"></AtInput>
            </label>
            <label class="createTask__label">
                <span class="label__text">Date Start</span>
                <AtInput v-model="dateStart" type="date"></AtInput>
            </label>
            <label class="createTask__label">
                <span class="label__text">Date End</span>
                <AtInput v-model="dateEnd" type="date"></AtInput>
            </label>
            <label class="createTask__label">
                <span class="label__text">Executor</span>
                <AtSelect v-model="executor" size="large">
                    <AtOption v-for="executor in executorsList" :key="executor" :value="executor">{{ executor }}</AtOption>
                </AtSelect>
            </label>
            <div slot="footer">
                <AtButton type="primary" @click="handleConfirm">Create</AtButton>
            </div>
        </AtModal>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ChartCommonModule } from '@/store/modules/chartCommon';
import { ITask } from '../store/modules/types';
import { idGenerator } from '../utils/task';

@Component
export default class CreateTaskModal extends Vue {
    private isModalShown: boolean = false;
    private title: string = '';
    private dateStart: string = '';
    private dateEnd: string = '';
    private executor: string = '';

    private get executorsList(): string[] {
        return ChartCommonModule.executors;
    }

    private handleConfirm(): void {
        if (!Boolean(this.title) || !Boolean(this.dateStart) || !Boolean(this.dateEnd) || !Boolean(this.executor)) {
            this.$Notify({
                title: 'Error',
                message: 'Fill all inputs',
                type: 'error',
            });

            return;
        }

        const task: ITask = {
            id: idGenerator.next().value,
            title: this.title,
            dateStart: new Date(this.dateStart),
            dateEnd: new Date(this.dateEnd),
            executor: this.executor,
        };

        if (task.dateStart >= task.dateEnd) {
            this.$Notify({
                title: 'Error',
                message: 'Date start cannot be later than Date end',
                type: 'error',
            });

            return;
        }

        ChartCommonModule.addTask(task);

        this.toggleModal();
        this.$Notify({
            title: 'Success',
            message: 'Task has created successfully',
            type: 'success',
        });
    }

    private toggleModal(): void {
        this.isModalShown = !this.isModalShown;
    }

    private destroyed(): void {
        if (this.isModalShown === true) {
            this.toggleModal();
        }
    }
}
</script>

<style scoped>
.createTask__button {
    border-bottom: 1px solid black;
    border-right: 1px solid black;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 35px;
    cursor: pointer;
}

.createTask__label {
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
}

.label__text {
    text-align: left;
    margin-bottom: 5px;
}

.createTask:hover {
    background-color: cornsilk;
}
</style>

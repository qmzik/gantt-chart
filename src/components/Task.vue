<template>
  <div class="task">
      <span class="task__title">{{ title }}</span>
      <div class="task__line" :style="{ width: width, marginLeft: margin }"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { calculateDaysCount } from '@/utils/task';

@Component
export default class Task extends Vue {
    @Prop() private title!: string;
    @Prop() private dateStart!: Date;
    @Prop() private dateEnd!: Date;

    private get width(): string {
        if (new Date() > this.dateStart) {
            return `${calculateDaysCount(new Date(), this.dateEnd) * 20}px`;
        }
        return `${calculateDaysCount(this.dateStart, this.dateEnd) * 20}px`;
    }

    private get margin(): string {
        if (new Date() >= this.dateStart) {
            return '0px';
        }

        return `${calculateDaysCount(new Date() , this.dateStart) * 20}px`;
    }
}
</script>

<style scoped>
.task {
    min-height: 40px;
    background-color: inherit;
    width: 100%;
    border-bottom: 1px solid black;
    display: flex;
}

.task__title {
    width: 150px;
    min-height: 100%;
    border-right: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
}

.task__line {
    background-color: aqua;
}
</style>

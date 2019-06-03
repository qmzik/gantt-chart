<template>
  <div class="timeline">
      <span class="timeline__taskTitle">Current tasks</span>
      <ul class="timeline__month" v-for="(month, index) in months" :key="index">
          <span class="month__name">{{ month.name }}</span>
          <div class="month__days">
            <li class="day" v-for="day in month.days" :key="day">{{ day }}</li>
          </div>
      </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { getTwoMonthsDays, Month } from '@/utils/date';
import { ChartCommonModule } from '../store/modules/chartCommon';
import { ITask } from '../store/modules/types';

@Component
export default class Timeline extends Vue {
    private get months(): Month[] {
        return getTwoMonthsDays(this.startTime.getMonth(), this.startTime.getDate());
    }

    private get startTime(): Date {
        return ChartCommonModule.startTime;
    }
}
</script>

<style scoped>
.timeline {
    display: flex;
}

.timeline__taskTitle {
    min-width: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #99958C;
}

.timeline__month {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    border-bottom: 1px solid #99958C;
}

.month__name {
    border-bottom: 1px solid #99958C;
}

.timeline__month:nth-child(even) {
    border-left: 1px solid #99958C;
    border-right: 1px solid #99958C;
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

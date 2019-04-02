<template>
  <div class="ganttChart">
      <ul>
          <li v-for=""></li>
      </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { getTwoMonthsDays, Month } from '@/utils/date';

@Component
export default class GanttChart extends Vue {
    private get months(): Month[] {
        return getTwoMonthsDays(this.startTime.getMonth());
    }

    private get startTime(): Date {
        return new Date();
    }
}
</script>

<style scoped>

</style>

import { ITask } from '@/store/modules/types';

export const dateFormat = (date: Date): string => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1 < 10 ? '0' : ''}${date.getMonth() + 1}`;
    const day = `${date.getDate() < 10 ? '0' : ''}${date.getDate()}`;
    return `${year}-${month}-${day}`;
};

export const sortByDate = (task1: ITask, task2: ITask): number => {
    return +new Date(task1.dateStart) - +new Date(task2.dateStart);
}

export const daysInMonth = (month: number): number => {
    const date = new Date();

    return 32 - new Date(date.getFullYear(), month, 32).getDate();
};

export const getTwoMonthsDays = (startMonth: number, dayNow: number): Month[] => {
    const CURRENT_YEAR: number = new Date().getFullYear();
    const now: Date = new Date(CURRENT_YEAR, startMonth, dayNow);
    const nextMonth: Date = new Date(now.getFullYear(), now.getMonth() + 1);
    const daysInCurrentMonth: number = daysInMonth(now.getMonth());
    const daysInNextMonth: number = daysInMonth(nextMonth.getMonth());
    const months: Month[] = [];
    const firstMonth = { name: monthsList[now.getMonth()], startDate: now.getDate(), endDate: daysInCurrentMonth, days: [] };
    for (let i = dayNow; i <= firstMonth.endDate; i++) {
        firstMonth.days.push(i);
    }
    months.push(firstMonth);
    const secondMonth = { name: monthsList[nextMonth.getMonth()], startDate: 1, endDate: daysInNextMonth, days: [] };
    for (let i = 1; i <= secondMonth.endDate; i++) {
        secondMonth.days.push(i);
    }
    months.push(secondMonth);
    if (now.getDate() > 1) {
        const thirdMonthDate: Date = new Date(now.getFullYear(), now.getMonth() + 2);
        const daysInThirdMonth: number = daysInMonth(thirdMonthDate.getMonth());
        const endDate = daysInThirdMonth - now.getDate() < 0 ? daysInThirdMonth : now.getDate() - 1;
        const thirdMonth = { name: monthsList[thirdMonthDate.getMonth()], startDate: 1, endDate, days: [] };
        for (let i = 1; i <= thirdMonth.endDate; i++) {
            thirdMonth.days.push(i);
        }
        months.push(thirdMonth);
    }

    return months;
};

const monthsList = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export interface Month {
    name: string;
    startDate: number;
    endDate: number;
    days: number[];
}

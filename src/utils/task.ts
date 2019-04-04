export const calculateDaysCount = (dateStart: Date, dateEnd: Date) => {
    return Math.round((+dateEnd - +dateStart) / (1000 * 60 * 60 * 24));
};

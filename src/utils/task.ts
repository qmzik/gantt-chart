export const calculateDaysCount = (dateStart: Date, dateEnd: Date) => {
    return Math.round((+dateEnd - +dateStart) / (1000 * 60 * 60 * 24));
};

function* generateId(): IterableIterator<number> {
    let id = 0;
    while(true) {
        yield id;
        id++;
    }
}

export const idGenerator = generateId();

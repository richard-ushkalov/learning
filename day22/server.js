const TODAY = 'вторник';

const rosters = {
    'вторник': ['Аня', 'Борис', 'Вера'],
    'четверг': ['Глеб', 'Дина'],
    'пятница': null,
};

const wait = ms => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
};

export const loadToday = async () => {
    await wait(500);
    
    if (TODAY.trim().length === 0) {
        throw new Error('Сегодняшний день пуст');
    }

    return TODAY;
};

export const loadNames = async (group) => {
    await wait(500);
    
    const names = rosters[group];

    if (names === undefined) {
        throw new Error(`Нет состава: ${group}`);
    }

    return names;
};
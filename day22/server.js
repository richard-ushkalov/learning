const TODAY = 'вторник';

const rosters = {
    'вторник': ['Аня', 'Борис', 'Вера'],
    'четверг': ['Глеб', 'Дина'],
    'пятница': null,
};

export const loadToday = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (TODAY.trim().length === 0) {
                reject(new Error('Сегодняшний день пуст'));
                return;
            }

            resolve(TODAY);
        }, 500);
    });
};

export const loadNames = group => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const names = rosters[group];

            if (names === undefined) {
                reject(new Error(`Нет состава: ${group}`));
                return;
            }

            resolve(names);
        }, 500);
    });
};
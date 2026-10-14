const TODAY = 'пятница';

const rosters = {
    'вторник': ['Аня', 'Борис', 'Вера'],
    'четверг': ['Глеб', 'Дина'],
    'пятница': null,
};

export const loadToday = onDone => {
    setTimeout(() => {
        if (TODAY.trim().length === 0) {
            return onDone(new Error('Сегодняшний день пуст'));
        }

        onDone(null, TODAY);
    }, 500);
};

export const loadNames = (group, onDone) => {
    setTimeout(() => {
        const names = rosters[group];

        if (names === undefined) {
            return onDone(new Error(`Нет состава: ${group}`));
        }

        onDone(null, names);
    }, 500);
};
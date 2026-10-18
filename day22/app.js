import { loadToday, loadNames } from "./server.js";

const todayPlayingButton = document.querySelector('.group-block__today-playing-button');
const status = document.querySelector('.group-block__status');
const title = document.querySelector('.group-block__today-title');
const list = document.querySelector('.group-block__list');

const renderError = error => {
    console.error('Не удалось загрузить: ' + error.message);
    status.textContent = 'Не удалось загрузить: ' + error.message;

    title.textContent = '';
    list.replaceChildren();
};

const handle = async (callback) => {
    todayPlayingButton.disabled = true;

    try {
        await callback();
    } catch (error) {
        renderError(error);
    } finally {
        todayPlayingButton.disabled = false;
    }
}

const loadGroup = async () => {
    status.textContent = 'Загрузка...';
    title.textContent = '';
    list.replaceChildren();

    const group = await loadToday();
    const names = await loadNames(group);

    title.textContent = `Сегодня: ${group}`;

    status.textContent = '';

    names.forEach(name => {
        const participant = document.createElement('li');
        participant.textContent = name;
        list.append(participant);
    });
};

todayPlayingButton.addEventListener('click', () => {
    handle(loadGroup);
});
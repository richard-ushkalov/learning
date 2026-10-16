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

    todayPlayingButton.disabled = false;
};

todayPlayingButton.addEventListener('click', () => {
    status.textContent = 'Загрузка...';
    title.textContent = '';
    list.replaceChildren();

    todayPlayingButton.disabled = true;

    loadToday()
        .then(group => {
            title.textContent = `Сегодня: ${group}`;

            return loadNames(group);
        })
        .then(names => {
            todayPlayingButton.disabled = false;
            status.textContent = '';

            names.forEach(name => {
                const participant = document.createElement('li');
                participant.textContent = name;
                list.append(participant);
            });
        })
        .catch(renderError)
        .finally(() => {
            status.textContent = '';

            todayPlayingButton.disabled = false;
        });
});
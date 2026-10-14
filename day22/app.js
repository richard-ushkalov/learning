import { loadToday, loadNames } from "./server.js";

const todayPlayingButton = document.querySelector('.group-block__today-playing-button');
const status = document.querySelector('.group-block__status');
const title = document.querySelector('.group-block__today-title');
const list = document.querySelector('.group-block__list');

const renderError = error => {
    console.error('Не удалось загрузить: ' + error.message);
    status.textContent = 'Не удалось загрузить: ' + error.message;

    title.textContent = '';
    todayPlayingButton.disabled = false;
};

todayPlayingButton.addEventListener('click', () => {
    todayPlayingButton.disabled = true;
    status.textContent = 'Загрузка...';
    title.textContent = '';
    list.replaceChildren();

    loadToday((error, today) => {
        if (error) {
            renderError(error);

            return;
        }

        loadNames(today, (error, names) => {
            todayPlayingButton.disabled = false;
            status.textContent = '';

            if (error) {
                renderError(error);

                return;
            }

            title.textContent = `Сегодня: ${today}`;
            try {
                names.forEach(name => {
                    const participant = document.createElement('li');
                    participant.textContent = name;
                    list.append(participant);
                });
            } catch (error) {
                renderError(error);
            }
        });
    });
});
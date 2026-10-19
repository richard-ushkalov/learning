import { searchTracks } from "./api.js";

const searchInput = document.querySelector('.search__input');
const searchStatus = document.querySelector('.search__status');
const searchList = document.querySelector('.search__list');

const startingBlockShelves = document.querySelector('.starting-block__shelves');

const loadTemplate = templateName => {
    const template = document.querySelector(`#${templateName}`);
    
    if (!template) {
        throw new Error(`Нет шаблона с именем #${templateName}`);
    }

    return template;
};

const trackTemplate = loadTemplate('track-template');
const shelfTemplate = loadTemplate('shelf-template');

const show = (text = '') => {
    searchStatus.textContent = text;
    if (text.trim().length !== 0) {
        console.log(text);
    }
};

const createTrack = (title, artist, artwork) => {
    const track = trackTemplate.content.cloneNode(true);

    track.querySelector('.track__title').textContent = title;
    track.querySelector('.track__artist').textContent = artist;
    track.querySelector('.track__artwork').src = artwork;

    return track;
};

const renderList = tracks => {
    searchList.replaceChildren();

    Array.from(tracks).forEach(({ trackName, artistName, artworkUrl100 }) => {
        searchList.append(createTrack(trackName, artistName, artworkUrl100));
    });
};

const createShelf = (tracks) => {
    const shelf = shelfTemplate.content.cloneNode(true);

    const status = shelf.querySelector('.shelf__status');
    const title = shelf.querySelector('.shelf__title');
    const list = shelf.querySelector('.shelf__list');

    status.textContent = 'Загрузка...';

    title.textContent = tracks[0].artistName;

    Array.from(tracks).forEach(({ trackName, artistName, artworkUrl100 }) => {
        list.append(createTrack(trackName, artistName, artworkUrl100));
    });

    status.textContent = '';

    return shelf;
};

const renderStartingShelf = async (request) => {
    const tracks = await searchTracks(request, 3);

    if (tracks.length === 0) {
        show(`Не найдено треков по запросу ${request}`);
        return;
    }

    const startingShelf = createShelf(tracks);

    startingBlockShelves.append(startingShelf);
};

let timerId = null;

const onInput = async (input) => {
    clearTimeout(timerId);

    if (input.trim().length === 0) {
        return;
    }

    timerId = setTimeout(() => {
        runSearch(input);
    }, 300);
};

searchInput.addEventListener('input', () => {
    onInput(searchInput.value);
});

let lastRequest = 0;

const runSearch = async (input) => {
    lastRequest++;
    const request = lastRequest;

    show('Загрузка...');

    try {
        const tracks = await searchTracks(input);

        if (request !== lastRequest) {
            return;
        }
        if (tracks.length === 0) {
            show(`Не найдено треков по запросу ${input}`);
            return;
        }

        renderList(tracks);

        show();
    } catch(error) {
        if (request !== lastRequest) {
            return;
        }

        show(`Ошибка: ${error.message}`);
    }
};

const run = async () => {
    try {
        await Promise.all([
            renderStartingShelf('Gallant'),
            renderStartingShelf('Kelela'),
            renderStartingShelf('FKA Twigs'),
        ]);
    } catch (error) {
        show(`Ошибка: ${error.message}`);
    }
};

run();
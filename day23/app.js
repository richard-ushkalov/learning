import { searchTracks } from "./api.js";

const shelfArtists = [ 'Gallant', 'Kelela', 'FKA Twigs' ];

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
};

const createTrack = (title, artist, artwork) => {
    const track = trackTemplate.content.cloneNode(true);

    track.querySelector('.track__title').textContent = title;
    track.querySelector('.track__artist').textContent = artist;
    track.querySelector('.track__artwork').src = artwork;

    return track;
};

const renderTracks = (list, tracks) => {
    list.replaceChildren();

    tracks.forEach(({ trackName, artistName, artworkUrl100 }) => {
        list.append(createTrack(trackName, artistName, artworkUrl100));
    });
};

const createShelf = artist => {
    const shelf = shelfTemplate.content.cloneNode(true);

    const status = shelf.querySelector('.shelf__status');
    const title = shelf.querySelector('.shelf__title');
    const list = shelf.querySelector('.shelf__list');

    startingBlockShelves.append(shelf);

    status.textContent = 'Загрузка...';

    title.textContent = artist;

    return { status, list };
};

let timerId = null;
let lastRequest = 0;

const onInput = term => {
    clearTimeout(timerId);

    if (term.trim().length === 0) {
        lastRequest++;

        show();
        searchList.replaceChildren();

        return;
    }

    timerId = setTimeout(() => {
        runSearch(term);
    }, 300);
};

searchInput.addEventListener('input', () => {
    onInput(searchInput.value);
});

const runSearch = async (term) => {
    lastRequest++;
    const request = lastRequest;

    show('Загрузка...');
    
    searchList.replaceChildren();

    try {
        const tracks = await searchTracks(term);

        if (request !== lastRequest) {
            return;
        }

        if (tracks.length === 0) {
            show(`Не найдено треков по запросу: ${term}`);
            return;
        }

        renderTracks(searchList, tracks);

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
        const shelves = shelfArtists.map(createShelf);

        const results = await Promise.allSettled(shelfArtists.map(artist => searchTracks(artist, 3)));

        results.forEach((result, index) => {
            if (result.status === 'rejected') {
                shelves[index].status.textContent = `Не удалось загрузить полку: ${result.reason}`;

                return;
            }
            if (result.value.length === 0) {
                shelves[index].status.textContent = `Ничего не найдено`;

                return;
            }

            renderTracks(shelves[index].list, result.value);

            shelves[index].status.textContent = '';
        });
    } catch (error) {
        show(`Ошибка: ${error.message}`);
    }
};

run();
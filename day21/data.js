import { getApiPlayers } from './api.js'

let players = [];
let sortKey = 'potted';

export const getPlayers = () => {
    return players;
};

export const setPlayers = newPlayers => {
    players = newPlayers;
};

export const getSortKey = () => {
    return sortKey;
};

export const setSortKey = newSortKey => {
    sortKey = newSortKey;
};

export const loadPlayers = onDone => {
    setTimeout(() => {
        onDone(null, getApiPlayers());
    }, 500);
};
/* STEP I-III */

// const key = 'potted';
// const player = { name: 'Аня', potted: 5, 'best-break': 24 };

// console.log(player[key]);
// console.log(player['best-break']);

/* STEP II-III */

const player = { name: 'Аня', potted: 5, fouls: 2 };

const updated = { ...player, potted: 8 };

console.log(updated.potted);

/* STEP III-II */

// const game = {
//   table: 9,
//   winner: { name: 'Аня' },
// };

// const { table, winner: { name } } = game;

// console.log(name);
// console.log(winner);

/* STEP III-III */
/* Напечатать сумму всех числовых значений объекта */

const stats = { potted: 5, fouls: 2, breaks: 1 };

const total = Object.values(stats).reduce((sum, value) => sum + value, 0);

console.log(total);

/* STEP IV-III */

const team = {
    title: 'Сборная',
    players: ['Аня', 'Борис'],
    showAll() {
        this.players.forEach((player) => {
            console.log(this.title + ': ' + player);
        });
    }
};

team.showAll();
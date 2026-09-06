/* STEP I-III */

// const balls = ['красный', 'синий', 'жёлтый'];

// if (balls.includes('красный')) {
//   console.log('Красный на столе');
// }

// const copy = balls.slice();
// copy.push('чёрный');

// console.log(balls.length);

/* STEP I-IV */

const fouls = [1, 2, 5, 6, 7];

const moreThanThree = fouls.some(foul => foul > 3);

console.log(moreThanThree);

/* STEP II-Sandbox */

const colors = ['красный', 'синий', 'жёлтый'];

colors.forEach((color, index) => {
  console.log(index + ': ' + color);
});

/* STEP II-III */

const balls = ['красный', 'синий', 'жёлтый'];

const lengths = balls.map(ball => ball.length );

console.log(lengths);

/* STEP II-IV */

// const items = [1, 30, 500, 600, 2300, 30, 50 , 4];

// const expensive = items.find(value => value > 500);

// console.log(expensive);

/* STEP III-III */

const items = [
  { name: 'Кий', price: 300 },
  { name: 'Стол', price: 1200 }
];

if (items.some(item => item.price > 500)) {
  console.log('Есть дорогие товары');
}

/* STEP IV-Sandbox */

const prices = [120, 90, 40];

const total = prices.reduce((sum, price) => sum + price, 0);

console.log(total);   // 250

/* STEP IV-III */

// const players = [
//   { name: 'Аня', fouls: 1 },
//   { name: 'Борис', fouls: 4 },
//   { name: 'Вика', fouls: 0 }
// ];

// const cleanCount = players.reduce((count, player) => player.fouls < 4 ? count + 1 : count, 0);

// console.log(cleanCount);

/* STEP V-III */

const players = [
  { name: 'Аня', potted: 6, fouls: 1 },
  { name: 'Борис', potted: 8, fouls: 4 },
  { name: 'Вика', potted: 3, fouls: 0 }
];

const names = players
  .filter(player => player.fouls < 4)
  .sort((a, b) => b.potted - a.potted)
  .map(player => player.name);

console.log(names);
const balls = [
  { number: 0,  color: "белый",     potted: false },
  { number: 3,  color: "красный",   potted: true  },
  { number: 8,  color: "чёрный",    potted: false },
  { number: 11, color: "бордовый",  potted: true  },
  { number: 5,  color: "оранжевый", potted: false },
  { number: 14, color: "зелёный",   potted: true  },
  { number: 9,  color: "жёлтый",    potted: false },
];

const layout = document.querySelector('.layout');
if (!layout) { console.log('layout = null'); }
const template = document.querySelector('#ball-template');
if (!template) { console.log('template = null'); }

for (const ball of balls) { /* нам не нужно знать индекс, а число циклов известно (balls.length), нужно проверять каждый шар, значит for..of */
    const node = template.content.cloneNode(true);

    let ballColor;
    switch (ball.color) {
        case 'белый':
            ballColor = '#dddddd';
            break;
        case 'чёрный':
            ballColor = '#000000';
            break;
        case 'бордовый':
            ballColor = '#9d1717';
            break;
        case 'красный':
            ballColor = '#ff2929';
            break;
        case 'оранжевый':
            ballColor = '#f49211';
            break;
        case 'жёлтый':
            ballColor = '#f5f530';
            break;
        case 'зелёный':
            ballColor = '#369621';
            break;
        default:
            ballColor = '#c0392b';
            break;
    }
    
    node.querySelector('.ball__shape').style.background = ballColor;
    node.querySelector('.ball__number').textContent = ball.number;
    node.querySelector('.ball__status').textContent = ball.potted ? 'забит' : 'на столе';

    layout.append(node);
}

let pottedCount = 0;
let onTableCount = 0;
let pottedNumberSum = 0;

let highestOnTableNumber = -1;
if (!balls || balls.length === 0) { highestOnTableNumber = -2; }

for (const ball of balls) {
    if (ball.number === 0) { continue; }

    if (ball.potted) {
        pottedCount++;
        pottedNumberSum += ball.number;
    } else {
        onTableCount++;
        if (ball.number > highestOnTableNumber) {
            highestOnTableNumber = ball.number;
        }
    }
}

for (const ball of balls) {
    if (!ball.potted && ball.number > 8) {
        console.log(`Найден шар на столе ${ball.number}, цвет — ${ball.color}`);
        break;
    }
}

console.log(`Шаров забито: ${pottedCount}`);
console.log(`Шаров на столе: ${onTableCount}`);
console.log(`Сумма номеров забитых шаров: ${pottedNumberSum}`);
if (highestOnTableNumber === -2) {
    console.log(`Шаров на стол не предоставили`);
} else if (highestOnTableNumber === -1) {
    console.log(`Нет шаров на столе`);
} else {
    console.log(`Наибольший номер шара, оставшийся на столе: ${highestOnTableNumber}`);
}

const FRICTION = 0.94;
const cueBall = { speed: 12.5 };

let steps = 0;

while (cueBall.speed > 0.05) { /* мы не знаем кол-во циклов — while */
    cueBall.speed *= FRICTION;

    steps++;
}

console.log(`За ${steps} тактов шар был остановлен`);
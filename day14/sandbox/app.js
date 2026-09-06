/* Step III */

document.querySelector('.start').addEventListener('click', () => {
    document.querySelector('.status').textContent = `Партия началась!`;
});

/* Step IV */

const showTotal = (price, count) => {
  const total = price * count;
  document.querySelector('.total').textContent = total + ' €';
};

document.querySelector('.repeat').addEventListener('click', () => {
    showTotal(120, 3);
});

const formatPrice = price => `${price > 0 ? price : 0} €`;
// const formatPrice = price => {
//     if (price < 0) {
//         return '0 €';
//     } else {
//         return `${price} €`;
//     }
// };

console.log(formatPrice(360));

/* Step V */

const calcFee = sum => sum * 0.05;
const showFee = fee => {
    document.querySelector('.fee').textContent = fee;
};

const fee = calcFee(1000);
showFee(fee);
console.log('Комиссия: ' + fee.toFixed(2));
console.log('Скрипт работает');

const orderStatus = document.querySelector('.order__status');
if (!orderStatus) { console.log('orderStatus = null'); }

const orderPrice = document.querySelector('.order__price');
if (!orderPrice) { console.log('orderPrice = null'); }

const orderMessage = document.querySelector('.order__message');
if (!orderMessage) { console.log('orderMessage = null'); }

const price = 20;
const freeDeliveryFrom = 50;
const promo = '23gdsg-js'.toUpperCase();
const deliveryStatus = 'courier';

let discount;
if (price > 200) {
    discount = 0.15;
} else if (price > 100) {
    discount = 0.1;
} else if (price > 50) {
    discount = 0.05;
} else {
    discount = 0;
}

let deliveryCost;
switch (deliveryStatus) {
    case 'courier':
        deliveryCost = 20;
        break;
    case 'post':
        deliveryCost = 10;
        break;
    case 'pickup':
    default:
        deliveryCost = 0;
        break;
}
deliveryCost = promo === '23GDSG-JS' ? 0 : deliveryCost;

const quantity = 3;

if (quantity <= 0) {
    orderStatus.style.display = "none";
    orderPrice.style.display = "none";
    orderMessage.textContent = "Список товаров пуст"
}
else {
    const totalPrice = price * quantity;
    const discountAmount = totalPrice * discount;
    const totalDiscountPrice = totalPrice - discountAmount;
    const totalPriceWithDelivery = totalDiscountPrice + deliveryCost;

    let status;
    if (deliveryCost === 0) {
        status = 'Доставка бесплатная (промокод использован)';
    } else if (totalDiscountPrice >= freeDeliveryFrom) {
        status = 'Доставка бесплатная';
    } else {
        status = `Цена с учётом доставки: ${totalDiscountPrice} + ${deliveryCost} = ${totalPriceWithDelivery} EUR`;
    } 

    orderStatus.textContent = status;
    orderPrice.textContent = `${totalPriceWithDelivery}`;
    orderMessage.textContent = `${quantity} ${quantity === 1 ? 'товар' : 'товара'}`;

    console.log(`Цена за единицу: ${price} EUR`);
    console.log(`Кол-во: ${quantity} ${quantity === 1 ? 'товар' : 'товара'}`);
    console.log(`Итоговая цена: ${totalPrice} EUR`);
    console.log(`Скидка составляет ${discountAmount}%, итоговая цена со скидкой: ${totalDiscountPrice} EUR`);
    console.log(`totalPrice = ${typeof totalPrice}`);
    console.log(`totalDiscountPrice = ${typeof totalDiscountPrice}`);
    console.log(`discountAmount = ${typeof discountAmount}`);
}

console.log(`price = ${typeof price}`);
console.log(`quantity = ${typeof quantity}`);
console.log(`discount = ${typeof discount}`);
console.log(`freeDeliveryFrom = ${typeof freeDeliveryFrom}`);
console.log(`deliveryCost = ${typeof deliveryCost}`);
console.log(`totalPrice = ${typeof totalPrice}`);
console.log(`totalDiscountPrice = ${typeof totalDiscountPrice}`);
console.log(`discountAmount = ${typeof discountAmount}`);
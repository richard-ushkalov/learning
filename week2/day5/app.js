console.log('Скрипт работает');

const orderStatus = document.querySelector('.order__status');
if (!orderStatus) { console.log('orderStatus = null'); }

const orderPrice = document.querySelector('.order__price');
if (!orderPrice) { console.log('orderPrice = null'); }

const orderMessage = document.querySelector('.order__message');
if (!orderMessage) { console.log('orderMessage = null'); }

const PROMO_CODE = '23GDSG-JS';

const price = 40;
const freeDeliveryFrom = 50;
const promo = '23gdsg-js'.toUpperCase(); /* Как метод уже рабочий для ожиданий чисел извне */
const deliveryStatus = 'courier';

let deliveryCost;
switch (deliveryStatus) {
    case 'courier':
        deliveryCost = 20;
        break;
    case 'post':
        deliveryCost = 10;
        break;
    case 'pickup':
        deliveryCost = 0;
        break;

    default:
        deliveryCost = 0;
        break;
}
if (promo === PROMO_CODE) { deliveryCost = 0; }

const quantity = 7;

if (quantity <= 0) {
    orderStatus.classList.add('order__item--hidden');
    orderPrice.classList.add('order__item--hidden');
    orderMessage.classList.add('order__item--error');
    orderMessage.textContent = "Список товаров пуст";
} else {
    const totalPrice = price * quantity;

    let discount;
    if (totalPrice >= 200) {
        discount = 0.15;
    } else if (totalPrice >= 100) {
        discount = 0.1;
    } else if (totalPrice >= 50) {
        discount = 0.05;
    } else {
        discount = 0;
    }

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
    orderPrice.textContent = String(totalPriceWithDelivery);
    orderMessage.textContent = `${quantity} ${quantity === 1 ? 'товар' : 'товара'}`;

    console.log(`Цена за единицу: ${price} EUR`);
    console.log(`Кол-во: ${quantity} ${quantity === 1 ? 'товар' : 'товара'}`);
    console.log(`Итоговая цена: ${totalPrice} EUR`);
    console.log(`Скидка составляет ${discount * 100}%, итоговая цена со скидкой: ${totalDiscountPrice} EUR`);
    console.log(`totalPrice = ${typeof totalPrice}`);
    console.log(`totalDiscountPrice = ${typeof totalDiscountPrice}`);
    console.log(`discountAmount = ${typeof discountAmount}`);
}
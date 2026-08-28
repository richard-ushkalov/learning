console.log('Скрипт запущен');

const price = 25;
const discount = 0.1;
const freeDeliveryFrom = 50;
const deliveryCost = 20;

let quantity = 2;

console.log(`price = ${typeof price}`);
console.log(`discount = ${typeof discount}`);
console.log(`freeDeliveryFrom = ${typeof freeDeliveryFrom}`);
console.log(`deliveryCost = ${typeof deliveryCost}`);
console.log(`quantity = ${typeof quantity}`);

if (quantity > 0) {
    const totalPrice = price * quantity;
    const discountAmount = totalPrice * discount;
    const totalDiscountPrice = totalPrice - discountAmount;

    console.log(`Цена за единицу: ${price} EUR`);
    console.log(`Кол—во: ${quantity}x`);
    console.log(`Итоговая цена: ${totalPrice} EUR`);
    console.log(`Скидка составляет ${discountAmount} EUR, итоговая цена со скидкой: ${totalDiscountPrice} EUR`);

    if (totalDiscountPrice < freeDeliveryFrom) {

        const totalPriceWithDelivery = totalDiscountPrice + deliveryCost;
        const message = `Цена с учётом доставки: ${totalDiscountPrice} + ${deliveryCost} = ${totalPriceWithDelivery} EUR`;
        const messageText = document.querySelector('.message-text');
        messageText.textContent = message;

        console.log(message);
    } else {

        console.log('Доставка бесплатная');
    }

    console.log(`totalPrice = ${typeof totalPrice}`);
    console.log(`totalDiscountPrice = ${typeof totalDiscountPrice}`);
    console.log(`discountAmount = ${typeof discountAmount}`);
}
console.log('Скрипт запущен');

const price = 25; /* all values are in `EUR` */
const discount = 1 - 0.1;   /*  we need to multiply negate,
                                it work like 100% minus `discount` that we want to give,
                                so after that we can multiply price by `discount` and have right price
                            */
const freeDeliveryFrom = 50;
const deliveryCost = 20;

let quantity = 2;

const totalPrice = price * quantity;
const totalDiscountPrice = totalPrice * discount;
const discountValue = totalPrice - totalDiscountPrice;

console.log(`Цена за единицу: ${price} EUR`);
console.log(`Кол—во: ${quantity}x`);
console.log(`Итоговая цена: ${totalPrice} EUR`);
console.log(`Скидка составляет ${discountValue} EUR, итоговая цена со скидкой: ${totalDiscountPrice} EUR`);

if (totalDiscountPrice < freeDeliveryFrom) {
    const totalPriceWithDelivery = totalDiscountPrice + deliveryCost;
    const message = `Цена с учётом доставки: ${totalDiscountPrice} + ${deliveryCost} = ${totalPriceWithDelivery} EUR`;
    const messageText = document.querySelector('.message-text');
    messageText.textContent = message;

    console.log(message);
} else {
    console.log(`Доставка бесплатная`);
}

console.log(`price = '${typeof(price)}'`);
console.log(`discount = '${typeof(discount)}'`);
console.log(`freeDeliveryFrom = '${typeof(freeDeliveryFrom)}'`);
console.log(`deliveryCost = '${typeof(deliveryCost)}'`);
console.log(`quantity = '${typeof(quantity)}'`);
console.log(`totalPrice = '${typeof(totalPrice)}'`);
console.log(`totalDiscountPrice = '${typeof(totalDiscountPrice)}'`);
console.log(`discountValue = '${typeof(discountValue)}'`);
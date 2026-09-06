const day = 'сб';

switch (day) {
  case 'сб':
  case 'вс':
    console.log('Выходной');
    break;

  default:
    console.log('Рабочий день');
}
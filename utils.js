const getFieldSize = (x, y) => {
  const numX = Number(x);
  const numY = Number(y);

  return {
    x: numX % 2 === 0 && numX >= 2 && numX <= 10 ? numX : 4,
    y: numY % 2 === 0 && numY >= 2 && numY <= 10 ? numY : 4,
  };
};

const getNumbersArray = (fieldSize) => {
  let numbers = [];
  let elements = (fieldSize.x * fieldSize.y) / 2;

  for (let i = 1; i <= elements; i++) {
    numbers.push(i);
    numbers.push(i);
  }

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  shuffle(numbers);

  return numbers;
};

const toggleClass = (firstEl, secondEl, className) => {
  firstEl.classList.toggle(className);
  secondEl.classList.toggle(className);
};

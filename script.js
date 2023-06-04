(() => {
  let TIMEOUT = 60;

  const createMenu = () => {
    const menuContainer = document.createElement("div");
    menuContainer.classList.add("menu-container");

    const horizontal = document.createElement("input");
    horizontal.classList.add("menu-input");
    const xLabel = document.createElement("label");
    xLabel.classList.add("menu-label");
    xLabel.textContent = "Введите четное число от 2-х до 10 (по-умолчанию: 4)";

    const vertical = document.createElement("input");
    vertical.classList.add("menu-input");
    const yLabel = document.createElement("label");
    yLabel.classList.add("menu-label");
    yLabel.textContent = "Введите четное число от 2-х до 10 (по-умолчанию: 4)";

    const menuButton = document.createElement("button");
    menuButton.classList.add("menu-button");
    menuButton.textContent = "Начать игру";

    menuContainer.append(xLabel);
    menuContainer.append(horizontal);
    menuContainer.append(yLabel);
    menuContainer.append(vertical);
    menuContainer.append(menuButton);

    return {
      menuContainer,
      menuButton,
      horizontal,
      vertical,
    };
  };

  const createItem = (num) => {
    const item = document.createElement("div");
    item.classList.add("item");

    const content = document.createElement("div");
    content.classList.add("item-content");
    content.textContent = num;

    item.append(content);

    item.addEventListener("click", () => {
      content.classList.toggle("item-content-active");
    });

    return item;
  };

  const createField = (x, y) => {
    let numbers = [];
    const fieldSize = getFieldSize(x, y);
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

    const container = document.createElement("div");
    container.classList.add("container", "element-display");

    const fieldContainer = document.createElement("div");
    fieldContainer.classList.add("items-container");

    const exitButton = document.createElement("button");
    exitButton.classList.add("menu-button");
    exitButton.textContent = "Выйти";

    numbers.forEach((el) => fieldContainer.append(createItem(el)));

    container.append(fieldContainer);
    container.append(exitButton);

    return {
      container,
      exitButton,
    };
  };

  const createTimeout = () => {
    const timeout = document.createElement("div");
    timeout.classList.add("timeout", "element-display");
    timeout.textContent = `Осталось: ${TIMEOUT} сек.`;

    return {
      timeout,
    };
  };

  const toggleView = (firstEl, secondEl) => {
    firstEl.classList.toggle("element-display");
    secondEl.classList.toggle("element-display");
  };

  const startGame = ({ field, menu, startTimeout }) => {
    startTimeout();
    toggleView(field, menu);
  };

  const exitGame = ({ field, menu, stopTimeout }) => {
    const items = document.querySelectorAll(".item-content");
    items.forEach((el) => el.classList.remove("item-content-active"));
    toggleView(field, menu);
    stopTimeout();
  };

  const getFieldSize = (x, y) => {
    let defaultX = 4;
    let defaultY = 4;

    let numX = Number(x);
    let numY = Number(y);

    if (numX % 2 === 0 && numX >= 2 && numX <= 10) defaultX = numX;
    if (numY % 2 === 0 && numY >= 2 && numY <= 10) defaultY = numY;

    return {
      x: defaultX,
      y: defaultY,
    };
  };

  document.addEventListener("DOMContentLoaded", () => {
    root = document.getElementById("root");
    let time;
    let x;
    let y;

    const {
      menuContainer: menu,
      menuButton,
      horizontal,
      vertical,
    } = createMenu();

    horizontal.addEventListener("input", (e) => {
      x = e.target.value;
    });

    vertical.addEventListener("input", (e) => {
      y = e.target.value;
    });

    const { exitButton, container: field } = createField(x, y);
    const { timeout } = createTimeout();

    menuButton.addEventListener("click", () => {
      startGame({ menu, field, startTimeout });
      horizontal.value = "";
      vertical.value = "";
    });

    exitButton.addEventListener("click", () =>
      exitGame({ field, menu, stopTimeout })
    );

    const startTimeout = () => {
      time = setInterval(() => {
        timeout.textContent = `Осталось: ${TIMEOUT--} сек.`;
        if (TIMEOUT === -1) {
          alert("Вы не успели за 1 минуту!");
          exitGame({ field, menu, stopTimeout });
        }
      }, 1000);
      timeout.classList.remove("element-display");
    };

    const stopTimeout = () => {
      clearInterval(time);
      TIMEOUT = 60;
      timeout.textContent = `Осталось: ${TIMEOUT} сек.`;
      timeout.classList.toggle("element-display");
    };

    root.append(menu);
    root.append(field);
    root.append(timeout);
  });
})();

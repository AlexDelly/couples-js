(() => {
  let X_CELLS = 4;
  let Y_CELLS = 4;
  let TIMEOUT = 60;
  let INTERVAL = null;

  const createTimeout = () => {
    const timeout = document.createElement("div");
    timeout.classList.add("timeout", "element-display");
    timeout.textContent = `Осталось: ${TIMEOUT} сек.`;

    return {
      timeout,
    };
  };

  const createMenu = () => {
    const menuContainer = document.createElement("div");
    menuContainer.classList.add("menu-container");

    const xInput = document.createElement("input");
    xInput.classList.add("menu-input");
    const xLabel = document.createElement("label");
    xLabel.classList.add("menu-label");
    xLabel.textContent = "ШИРИНА ПОЛЯ: От 2-х до 10 (по-умолчанию: 4)";

    const yInput = document.createElement("input");
    yInput.classList.add("menu-input");
    const yLabel = document.createElement("label");
    yLabel.classList.add("menu-label");
    yLabel.textContent = "ВЫСОТА ПОЛЯ: От 2-х до 10 (по-умолчанию: 4)";

    const startButton = document.createElement("button");
    startButton.classList.add("menu-button");
    startButton.textContent = "Начать игру";

    menuContainer.append(xLabel);
    menuContainer.append(xInput);
    menuContainer.append(yLabel);
    menuContainer.append(yInput);
    menuContainer.append(startButton);

    return {
      menuContainer,
      startButton,
      xInput,
      yInput,
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
    const fieldSize = getFieldSize(x, y);
    const numbers = getNumbersArray(fieldSize);

    const container = document.createElement("div");
    container.classList.add("container", "element-display");

    const fieldContainer = document.createElement("div");
    fieldContainer.classList.add("items-container", `w-${x}`, `h-${y}`);

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

  const exitGame = ({ field, menu, timeout }) => {
    clearInterval(INTERVAL);
    X_CELLS = Y_CELLS = 4;
    TIMEOUT = 60;
    field.remove();

    const items = document.querySelectorAll(".item-content");
    toggleClass(field, menu, "element-display");
    timeout.classList.toggle("element-display");
    items.forEach((el) => el.classList.remove("item-content-active"));
    timeout.textContent = `Осталось: ${TIMEOUT} сек.`;
  };

  document.addEventListener("DOMContentLoaded", () => {
    root = document.getElementById("root");

    const { timeout } = createTimeout();
    const { menuContainer: menu, startButton, xInput, yInput } = createMenu();

    xInput.addEventListener("input", (e) => {
      X_CELLS = e.target.value;
    });

    yInput.addEventListener("input", (e) => {
      Y_CELLS = e.target.value;
    });

    startButton.addEventListener("click", () => {
      const { exitButton, container: field } = createField(X_CELLS, Y_CELLS);
      toggleClass(field, menu, "element-display");
      timeout.classList.remove("element-display");

      INTERVAL = setInterval(() => {
        timeout.textContent = `Осталось: ${TIMEOUT--} сек.`;
        if (TIMEOUT === -1) {
          alert("Вы не успели за 1 минуту!");
          exitGame({ field, menu, timeout });
        }
      }, 1000);

      exitButton.addEventListener("click", () => {
        exitGame({ field, menu, timeout });
      });

      xInput.value = yInput.value = "";
      root.append(field);
    });

    root.append(menu);
    root.append(timeout);
  });
})();

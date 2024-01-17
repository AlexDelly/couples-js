(() => {
  let X_CELLS = 4;
  let Y_CELLS = 4;
  let TIMEOUT = 60;
  let INTERVAL = null;
  let isLookingCouple = false;
  let elementToLookCouple = null;
  let foundElements = [];

  const createTimeout = () => {
    const timeout = document.createElement("div");
    timeout.classList.add("timeout", "element-display");
    timeout.textContent = `Time left: ${TIMEOUT} sec.`;

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
    xLabel.textContent = "Width: Even 2-10 (default: 4)";

    const yInput = document.createElement("input");
    yInput.classList.add("menu-input");
    const yLabel = document.createElement("label");
    yLabel.classList.add("menu-label");
    yLabel.textContent = "Height: Even 2-10 (default: 4)";

    const startButton = document.createElement("button");
    startButton.classList.add("menu-button");
    startButton.textContent = "Start game";

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

  const createItem = (num, elements, timeout, menu, field) => {
    const item = document.createElement("div");
    item.classList.add("item");

    const content = document.createElement("div");
    content.classList.add("item-content");
    content.textContent = num;

    item.append(content);

    const findCouple = (el) => {
      if (el.textContent === elementToLookCouple.textContent) {
        el.classList.toggle("item-content-active");
        foundElements.push(el.textContent);
        isLookingCouple = false;
        elementToLookCouple = null;

        if (foundElements.length === elements) {
          let finishInterval = setInterval(() => {
            alert("Success!");
            exitGame({ field, menu, timeout });
            clearInterval(finishInterval);
          }, 100);
        }
      } else {
        el.classList.toggle("item-content-active");

        let itemInterval = setInterval(() => {
          el.classList.toggle("item-content-active");
          elementToLookCouple.classList.toggle("item-content-active");
          elementToLookCouple = null;
          isLookingCouple = false;
          foundElements.pop();
          clearInterval(itemInterval);
        }, 100);
      }
    };

    item.addEventListener("click", (e) => {
      if (e.target !== elementToLookCouple) {
        if (!isLookingCouple) {
          content.classList.toggle("item-content-active");
          elementToLookCouple = e.target;
          foundElements.push(e.target.textContent);
          isLookingCouple = true;
        } else {
          findCouple(content);
        }
      }
    });

    return item;
  };

  const createField = (x, y, timeout, menu) => {
    const fieldSize = getFieldSize(x, y);
    const elements = fieldSize.x * fieldSize.y;
    const numbers = getNumbersArray(fieldSize);

    const container = document.createElement("div");
    container.classList.add("container", "element-display");

    const fieldContainer = document.createElement("div");
    fieldContainer.classList.add("items-container", `w-${x}`, `h-${y}`);

    const exitButton = document.createElement("button");
    exitButton.classList.add("menu-button");
    exitButton.textContent = "Exit";

    numbers.forEach((el) =>
      fieldContainer.append(createItem(el, elements, timeout, menu, container))
    );

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
    isLookingCouple = false;
    elementToLookCouple = null;
    foundElements = [];
    field.remove();

    const items = document.querySelectorAll(".item-content");
    toggleClass(field, menu, "element-display");
    timeout.classList.toggle("element-display");
    items.forEach((el) => el.classList.remove("item-content-active"));
    timeout.textContent = `Time left: ${TIMEOUT} sec.`;
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
      const { exitButton, container: field } = createField(
        X_CELLS,
        Y_CELLS,
        timeout,
        menu
      );
      toggleClass(field, menu, "element-display");
      timeout.classList.remove("element-display");

      INTERVAL = setInterval(() => {
        timeout.textContent = `Time left: ${TIMEOUT--} sec.`;
        if (TIMEOUT === -1) {
          alert("Failed! Timed out");
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

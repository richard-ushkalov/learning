const layout = document.querySelector('.layout'); // 1 Раз

const fragmentBlock = document.querySelector('#template-block'); // 1 Раз
if (!fragmentBlock) {
  throw new Error(`Нет шаблона #template-block`);
}
const fragmentContent = document.querySelector('#template-content'); // 1 Раз
if (!fragmentContent) {
  throw new Error(`Нет шаблона #template-content`);
}

export const clearLayout = () => { layout.replaceChildren(); };

export const createBlock = () => {
  const initBlock = () => {
    const template = fragmentBlock.content.cloneNode(true);
    const block = template.querySelector('.block');

    layout.append(block);

    return block;
  };

  const block = initBlock();
  const blockLine = block.querySelector('.block__line'); // Кол-во вызовов createBlock() (9 раз)

  const addContent = () => {
    const template = fragmentContent.content.cloneNode(true);
    const content = template.querySelector('.line__content');

    blockLine.append(content);

    return content;
  };

  const addId = id => {
    blockLine.dataset.id = id;
  }

  const addButton = (text, action) => {
    const button = document.createElement('button');
    button.textContent = text;
    button.dataset.action = action;
    button.type = 'button';

    blockLine.append(button);
  };

  return {
    addContentWithText: (text) => {
      addContent().textContent = text;
    },
    addId: (id) => {
      addId(id);
    },
    addButton: (text, action) => {
      addButton(text, action);
    },
  };
};
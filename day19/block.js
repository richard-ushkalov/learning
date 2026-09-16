const layout = document.querySelector('.layout'); // 1 Раз

const fragmentBlock = document.querySelector('#template-block'); // 1 Раз
const fragmentContent = document.querySelector('#template-content'); // 1 Раз

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

  return {
    addContentWithText: (text) => {
      addContent().textContent = text;
    },
  };
};
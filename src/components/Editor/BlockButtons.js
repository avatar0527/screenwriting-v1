import React from 'react';
import { RichUtils } from 'draft-js';

const BlockButtons = ({ editorState, toggleBlockType, blockTypes }) => {
  const renderBlockButton = () => {
    const currentBlockType = RichUtils.getCurrentBlockType(editorState);

    const buttonRenders = blockTypes.map((types) => {
      let active = '';

      if (currentBlockType === types.value) {
        active = 'green';
      }

      return (
        <button
          onMouseDown={toggleBlockType}
          className={`ui icon toggle button ${active}`}
          data-block={types.value}
          key={types.value}
        >
          {types.buttonText}
        </button>
      );
    });
    return buttonRenders;
  };

  return <div className='ui buttons'>{renderBlockButton()}</div>;
};

export default BlockButtons;

// let active = '';

// if (getSelectionInlineStyle(editorState)[button.value]) {
//   active = 'grey';
// }

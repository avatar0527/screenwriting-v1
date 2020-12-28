import React from 'react';
import { RichUtils } from 'draft-js';

const BlockButtons = ({ editorState, toggleBlockType, blockTypes }) => {
  const renderBlockButton = (value, block) => {
    const currentBlockType = RichUtils.getCurrentBlockType(editorState);

    let className = '';
    if (currentBlockType === block) {
      className = 'active';
    }
    return (
      <input
        type='button'
        key={block}
        value={value}
        className={className}
        data-block={block}
        onMouseDown={toggleBlockType}
      />
    );
  };

  return (
    <div className='toolbar'>
      <div className='block-style-options'>
        Block Types:
        {blockTypes.map((button) => {
          return renderBlockButton(button.value, button.block);
        })}
      </div>
    </div>
  );
};

export default BlockButtons;

//draftjs: richutils
//props: editorstate, toggleblocktype,

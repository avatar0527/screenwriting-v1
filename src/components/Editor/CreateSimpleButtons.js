import React from 'react';
import { getSelectionInlineStyle } from 'draftjs-utils';

const CreateSimpleButtons = ({
  buttonDetails,
  buttonFunction,
  editorState,
}) => {
  const renderButtons = () => {
    const buttonRenders = buttonDetails.map((button) => {
      let active = '';

      if (getSelectionInlineStyle(editorState)[button.value]) {
        active = 'grey';
      }

      if (button.buttonIcon) {
        return (
          <button
            onMouseDown={buttonFunction}
            className={`ui icon toggle button ${active}`}
            data-style={button.value}
            key={button.value}
          >
            <i className={`${button.buttonIcon}`}>{button.buttonText}</i>
          </button>
        );
      }
      return (
        <button
          onMouseDown={buttonFunction}
          className={`ui icon toggle button ${active}`}
          data-style={button.value}
          key={button.value}
        >
          {button.buttonText}
        </button>
      );
    });
    return buttonRenders;
  };

  return <div className='ui buttons'>{renderButtons()}</div>;
};

export default CreateSimpleButtons;

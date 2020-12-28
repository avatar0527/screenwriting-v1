import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  KeyBindingUtil,
} from 'draft-js';
import React, { useState } from 'react';
import Dropdown from './Dropdown';

const customStyleMap = {
  SCENE: {
    color: 'red',
  },
  ACTION: {
    color: 'green',
  },
  CHARACTER: {
    color: 'blue',
  },
  DIALOGUE: {
    color: 'yellow',
  },
  TRANSITION: {
    color: 'purple',
  },
};

const styleNames = [
  {
    value: 'Scene',
    style: 'SCENE',
  },

  {
    value: 'Action',
    style: 'ACTION',
  },

  {
    value: 'Character',
    style: 'CHARACTER',
  },

  {
    value: 'Dialogue',
    style: 'DIALOGUE',
  },

  {
    value: 'Transition',
    style: 'TRANSITION',
  },
];

const App = () => {
  // const [selectedType, setSelectedType] = useState(styleNames[0]);
  const [optionIndex, setOptionIndex] = useState(0);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const keyBindingFunction = (e) => {
    if (KeyBindingUtil.hasCommandModifier(e) && e.shiftKey && e.key === 'x') {
      return 'strikethrough';
    }
    if (e.keyCode === 9 && e.shiftKey) {
      if (optionIndex === 0) {
        setOptionIndex(styleNames.length - 1);
        // setSelectedType(styleNames[optionIndex]);
      } else {
        let option = optionIndex - 1;
        setOptionIndex(option);
        // setSelectedType(styleNames[optionIndex]);
      }
      return styleNames[optionIndex].style;
    }
    if (e.keyCode === 9) {
      if (optionIndex === 4) {
        setOptionIndex(0);
        // setSelectedType(styleNames[optionIndex]);
      } else {
        let option = optionIndex + 1;
        setOptionIndex(option);
        // setSelectedType(styleNames[optionIndex]);
      }
      return styleNames[optionIndex].style;
    }

    return getDefaultKeyBinding(e);
  };

  const renderInlineStyleButton = (value, style) => {
    return (
      <input
        type='button'
        key={style}
        value={value}
        data-style={style}
        onMouseDown={toggleInlineStyle}
      />
    );
  };

  const onChange = (editorState) => {
    setEditorState(editorState);
  };
  const toggleInlineStyle = () => {
    // event.preventDefault();
    console.log(styleNames[optionIndex].style);
    setEditorState(
      RichUtils.toggleInlineStyle(editorState, styleNames[optionIndex].style)
    );
  };

  // const handleKeyCommand = (command) => {
  //   // inline formatting key commands handles bold, italic, code, underline
  //   var editorState = RichUtils.handleKeyCommand(editorState, command);

  //   // If RichUtils.handleKeyCommand didn't find anything, check for our custom strikethrough command and call `RichUtils.toggleInlineStyle` if we find it.
  //   if (!editorState && command === 'strikethrough') {
  //     editorState = RichUtils.toggleInlineStyle(editorState, 'STRIKETHROUGH');
  //   }

  //   if (editorState) {
  //     setEditorState(editorState);
  //     return 'handled';
  //   }

  //   return 'not-handled';
  // };

  return (
    <div className='ui container' style={{ marginTop: '3em' }}>
      <h2 className='ui dividing header'>Screen Writing v1</h2>
      <div className='inline-style-options'>
        <Dropdown
          options={styleNames}
          selected={optionIndex}
          onSelectedChange={setOptionIndex}
          label='select type'
          toggleInlineStyle={toggleInlineStyle}
        />
      </div>
      <div className='ui segment'>
        <Editor
          editorState={editorState}
          onChange={onChange}
          // handleKeyCommand={handleKeyCommand}
          keyBindingFn={keyBindingFunction}
          customStyleMap={customStyleMap}
        />
      </div>
    </div>
  );
};

export default App;

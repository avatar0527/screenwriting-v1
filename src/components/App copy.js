import React, { useState } from 'react';
import {
  Editor,
  EditorState,
  getDefaultKeyBinding,
  RichUtils,
  Modifier,
} from 'draft-js';
import Dropdown from './Dropdown';
import 'draft-js/dist/Draft.css';

const customStyleMap = {
  Scene: {
    color: 'rgba(255, 0, 0, 1.0)',
  },
  Action: {
    label: 'Action',
    color: 'rgba(255, 127, 0, 1.0)',
  },
  Character: {
    label: 'Character',
    color: 'rgba(180, 180, 0, 1.0)',
  },
  Dialogue: {
    label: 'Dialogue',
    color: 'rgba(0, 180, 0, 1.0)',
  },
  Transition: {
    label: 'Transition',
    color: 'rgba(0, 0, 255, 1.0)',
  },
};

const App = () => {
  const [selectedType, setSelectedType] = useState(customStyleMap[0]);
  const [optionIndex, setOptionIndex] = useState(0);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  // const toggleType = (toggledType) => {
  //   const selection = editorState.getSelection();
  //   const nextContentState = Object.keys(customStyleMap).reduce(
  //     (contentState, color) => {
  //       return Modifier.removeInlineStyle(contentState, selection, color);
  //     },
  //     editorState.getCurrentSelection()
  //   );

  //   let nextEditorState = EditorState.push(
  //     editorState,
  //     nextContentState,
  //     'change-inline-style'
  //   );

  //   const currentStyle = editorState.getCurrentInlineStyle();

  //   if (selection.isCollapsed()) {
  //     nextEditorState = currentStyle.reduce((state, color) => {
  //       return RichUtils.toggleInlineStyle(state, color);
  //     }, nextEditorState);
  //   }

  //   if (!currentStyle.has(toggledType)) {
  //     nextEditorState = RichUtils.toggleInlineStyle(
  //       nextEditorState,
  //       toggledType
  //     );
  //   }
  //   setEditorState(nextEditorState);
  // };

  const myKeyBindingFn = (e = React.SyntheticKeyboardEvent) => {
    if (e.keyCode === 9 && e.shiftKey) {
      if (optionIndex === 0) {
        setOptionIndex(customStyleMap.length - 1);
        setSelectedType(customStyleMap[optionIndex]);
        console.log(optionIndex);
      } else {
        let option = optionIndex - 1;
        setOptionIndex(option);
        setSelectedType(customStyleMap[optionIndex]);

        console.log(optionIndex);
      }
      return '-tab';
    }
    if (e.keyCode === 9) {
      if (optionIndex === 4) {
        setOptionIndex(0);
        setSelectedType(customStyleMap[optionIndex]);

        console.log(optionIndex);
      } else {
        let option = optionIndex + 1;
        setOptionIndex(option);
        setSelectedType(customStyleMap[optionIndex]);

        console.log(optionIndex);
      }
      return 'tab';
    }

    return getDefaultKeyBinding(e);
  };

  const handleKeyCommand = (command) => {
    if (command === 'tab') {
      setEditorState(
        RichUtils.toggleBlockType(
          editorState,
          customStyleMap[optionIndex].label
        )
      );
      return 'handled';
    }
    if (command === '-tab') {
      setEditorState(
        RichUtils.toggleBlockType(
          editorState,
          customStyleMap[optionIndex].label
        )
      );
      return 'handled';
    }
    return 'not-handled';
  };

  return (
    <div className='ui container' style={{ marginTop: '3em' }}>
      <h2 className='ui dividing header'>Screen Writing v1</h2>
      <Dropdown
        options={customStyleMap}
        selected={selectedType}
        onSelectedChange={setSelectedType}
        label='select type'
      />
      <div className='ui segment'>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          handelKeyCommand={handleKeyCommand}
          keyBindingFn={myKeyBindingFn}
          customStyleMap={customStyleMap}
        />
      </div>
    </div>
  );
};

export default App;

const styleMap = {
  SCENE: {
    color: 'red',
    textTransform: 'uppercase',
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

const inlineStyleButtons = [
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

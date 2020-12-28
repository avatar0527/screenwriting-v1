import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  // KeyBindingUtil,
} from 'draft-js';
import '../css/App.css';
import React from 'react';

import BlockButtons from './BlockButtons';

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

const blockTypes = [
  {
    value: '씬',
    block: 'header-one',
  },

  {
    value: '액션',
    block: 'header-two',
  },

  {
    value: '케릭터',
    block: 'header-three',
  },
  {
    value: '대사',
    block: 'header-four',
  },
  {
    value: '트렌지션',
    block: 'header-five',
  },
];

let optionIndex;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };

    this.onChange = this.onChange.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.toggleBlockType = this.toggleBlockType.bind(this);
  }

  componentDidMount() {
    optionIndex = 0;

    this.setState({
      editorState: RichUtils.toggleBlockType(
        this.state.editorState,
        blockTypes[optionIndex].block
      ),
    });
    console.log(optionIndex);
  }

  onChange(editorState) {
    this.setState({ editorState });
  }

  keyBindingFunction(e) {
    //will need something to say cursor on most left end for tab stuff
    // need logic for +enter
    if (e.keyCode === 9 && e.shiftKey) {
      console.log(optionIndex);
      return 'downOneLevel';
    }
    if (e.keyCode === 9) {
      console.log(optionIndex);
      return 'upOneLevel';
    }
    // if (e.keyCode === 13 && optionIndex === 0) {
    //   return 'upOneLevel';
    // }
    // if (e.keyCode === 13 && optionIndex === 2) {
    //   return 'downOneLevel';
    // }
    return getDefaultKeyBinding(e);
  }

  myBlockStyleFn(contentBlock) {
    const type = contentBlock.getType();
    if (type === 'header-one') {
      return 'scene';
    }
    if (type === 'header-two') {
      return 'action';
    }
    if (type === 'header-three') {
      return 'character';
    }
    if (type === 'header-four') {
      return 'dialogue';
    }
    if (type === 'header-five') {
      return 'transition';
    }
  }

  handleKeyCommand(command) {
    // inline formatting key commands handles bold, italic, code, underline
    var editorState = RichUtils.handleKeyCommand(
      this.state.editorState,
      command
    );

    if (!editorState && command === 'upOneLevel') {
      optionIndex === blockTypes.length - 1 ? (optionIndex = 0) : optionIndex++;
      editorState = RichUtils.toggleBlockType(
        this.state.editorState,
        blockTypes[optionIndex].block
      );
    }

    if (!editorState && command === 'downOneLevel') {
      optionIndex === 0 ? (optionIndex = blockTypes.length - 1) : optionIndex--;
      editorState = RichUtils.toggleBlockType(
        this.state.editorState,
        blockTypes[optionIndex].block
      );
    }

    if (editorState) {
      this.setState({ editorState });
      return 'handled';
    }

    return 'not-handled';
  }

  toggleBlockType(event) {
    event.preventDefault();

    let block = event.currentTarget.getAttribute('data-block');
    this.setState({
      editorState: RichUtils.toggleBlockType(this.state.editorState, block),
    });
  }

  render() {
    return (
      <div className='ui container' style={{ marginTop: '3em' }}>
        <h2 className='ui dividing header'>Screen Writing v1</h2>
        <BlockButtons
          editorState={this.state.editorState}
          toggleBlockType={this.toggleBlockType}
          blockTypes={blockTypes}
        />
        <div className='testPadding'>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            handleKeyCommand={this.handleKeyCommand}
            keyBindingFn={this.keyBindingFunction}
            customStyleMap={styleMap}
            blockStyleFn={this.myBlockStyleFn}
          />
        </div>
      </div>
    );
  }
}

export default App;

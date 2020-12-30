import { Editor, EditorState, RichUtils, getDefaultKeyBinding } from 'draft-js';
import { getSelectedBlock } from 'draftjs-utils';
import '../../css/EditorStyle.css';
import React from 'react';
import { connect } from 'react-redux';
import { updateOptionIndex } from '../../actions';

import CreateSimpleButtons from './CreateSimpleButtons';
import Toolbar from './Toolbar';
import BlockButtons from './BlockButtons';
import Dropdown from './Dropdown';

const blockTypes = [
  {
    value: 'header-one',
    buttonText: '씬',
  },

  {
    value: 'header-two',
    buttonText: '액션',
  },

  {
    value: 'header-three',
    buttonText: '케릭터',
  },
  {
    value: 'header-four',
    buttonText: '대사',
  },
  {
    value: 'header-five',
    buttonText: '트렌지션',
  },
];

const fontWeightButtons = [
  {
    value: 'BOLD',
    buttonIcon: 'bold icon',
    buttonText: '',
  },
  {
    value: 'UNDERLINE',
    buttonIcon: 'underline icon',
    buttonText: '',
  },
  {
    value: 'ITALIC',
    buttonIcon: 'italic icon',
    buttonText: '',
  },
];

class EditorMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.state = {
      editorState: RichUtils.toggleBlockType(
        this.state.editorState,
        blockTypes[this.props.index].value
      ),
    };

    this.focus = () => this.editor.focus();
    this.onChange = this.onChange.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.toggleBlockType = this.toggleBlockType.bind(this);
  }

  onChange(editorState) {
    this.setState({ editorState });
  }

  keyBindingFunction(e) {
    //will need something to say cursor on most left end for tab stuff
    // need logic for +enter
    if (e.keyCode === 9 && e.shiftKey) {
      return 'downOneLevel';
    }
    if (e.keyCode === 9) {
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
      let i = this.props.index;
      this.props.index === blockTypes.length - 1 ? (i = 0) : i++;
      editorState = RichUtils.toggleBlockType(
        this.state.editorState,
        blockTypes[i].value
      );
      this.props.updateOptionIndex(i);
    }

    if (!editorState && command === 'downOneLevel') {
      let i = this.props.index;
      this.props.index === 0 ? (i = blockTypes.length - 1) : i--;
      editorState = RichUtils.toggleBlockType(
        this.state.editorState,
        blockTypes[i].value
      );
      this.props.updateOptionIndex(i);
    }

    if (command === 'backspace') {
      const block = getSelectedBlock(this.state.editorState);
      if (block.getText() === '') {
        return 'handled';
      }
    }

    if (editorState) {
      this.setState({ editorState });
      return 'handled';
    }

    return 'not-handled';
  }

  toggleBlockType(e) {
    e.preventDefault();

    let block = e.currentTarget.getAttribute('data-block');
    this.setState({
      editorState: RichUtils.toggleBlockType(this.state.editorState, block),
    });
  }

  blockTypeOnSelectedChange = (index) => {
    this.setState({
      editorState: RichUtils.toggleBlockType(
        this.state.editorState,
        blockTypes[this.props.index].value
      ),
    });
  };

  toggleFontWeight = (e) => {
    //check if already applied
    // if not, apply
    e.preventDefault();

    const value = e.currentTarget.getAttribute('data-style');
    this.setState({
      editorState: RichUtils.toggleInlineStyle(this.state.editorState, value),
    });
  };

  render() {
    return (
      <div className='ui container' style={{ marginTop: '3em' }}>
        <h2 className='ui dividing header'>Screen Writing v1</h2>
        <Toolbar
          blockDropdown={
            <Dropdown
              options={blockTypes}
              selected={this.props.index}
              onSelectedChange={this.blockTypeOnSelectedChange}
              label=''
            />
          }
          fontButtons={
            <CreateSimpleButtons
              buttonDetails={fontWeightButtons}
              buttonFunction={this.toggleFontWeight}
              editorState={this.state.editorState}
            />
          }
          sceneNumberButton={
            <CreateSimpleButtons
              buttonDetails={[
                {
                  value: 'placeholder',
                  buttonIcon: 'list ol icon',
                  buttonText: '',
                },
              ]}
              buttonFunction={() => {
                return null;
              }}
              editorState={this.state.editorState}
            />
          }
          blockButtons={
            <BlockButtons
              editorState={this.state.editorState}
              toggleBlockType={this.toggleBlockType}
              blockTypes={blockTypes}
            />
          }
        />
        <div onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            handleKeyCommand={this.handleKeyCommand}
            keyBindingFn={this.keyBindingFunction}
            blockStyleFn={this.myBlockStyleFn}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { index: state.optionIndex };
};

export default connect(mapStateToProps, { updateOptionIndex })(EditorMain);

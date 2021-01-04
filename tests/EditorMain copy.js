import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  Modifier,
} from 'draft-js';
import { getSelectedBlock } from 'draftjs-utils';
import '../../css/EditorStyle.css';
import React from 'react';
import { connect } from 'react-redux';
import {
  updateBackspaceCount,
  updateOptionIndex,
  updateEditorState,
} from '../../actions';

import CreateSimpleButtons from './CreateSimpleButtons';
import EditorToolbar from './EditorToolbar';
import BlockButtons from './BlockButtons';
import EditorDropdown from './EditorDropdown';
import EditorHeader from './EditorHeader';

const blockTypes = [
  {
    value: 'header-one',
    buttonText: '씬',
  },

  {
    value: 'unstyled',
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

    this.onChange = this.onChange.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.toggleBlockType = this.toggleBlockType.bind(this);
    this.clear = this.clear.bind(this);
    this.setDomEditorRef = (ref) => (this.domEditor = ref);
    this.focus = () => this.domEditor.focus();
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

    if (e.keyCode === 220) {
      return 'testingR';
    }

    return getDefaultKeyBinding(e);
  }

  myBlockStyleFn(contentBlock) {
    const type = contentBlock.getType();
    if (type === 'header-one') {
      return 'scene';
    }
    if (type === 'unstyled') {
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

  clear() {
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const styles = editorState.getCurrentInlineStyle();

    const removeStyles = styles.reduce((state, style) => {
      return Modifier.removeInlineStyle(state, selection, style);
    }, contentState);

    const removeBlock = Modifier.setBlockType(
      removeStyles,
      selection,
      'unstyled'
    );

    this.setState({
      editorState: EditorState.push(editorState, removeBlock),
    });
  }

  handleReturn(event, editorState) {
    const block = getSelectedBlock(this.state.editorState);
    if (block.getText() === '') {
      let i = 1;
      switch (this.props.index) {
        case 0:
          i = 1;
          break;
        case 1:
          i = 0;
          break;
        default:
          break;
      }

      this.setState({
        editorState: RichUtils.toggleBlockType(
          editorState,
          blockTypes[i].value
        ),
      });

      this.props.updateOptionIndex(i);
      return 'handled';
    } else {
      let i;
      switch (this.props.index) {
        case 0:
          i = 1;
          break;
        case 1:
          i = 1;
          break;
        case 2:
          i = 3;
          break;
        case 3:
          i = 2;
          break;
        default:
          break;
      }

      const currentContent = editorState.getCurrentContent();
      const selection = editorState.getSelection();
      const textWithEntity = Modifier.splitBlock(currentContent, selection);

      this.setState({
        editorState: EditorState.push(
          editorState,
          textWithEntity,
          'split-block'
        ),
      });

      this.props.updateOptionIndex(i);

      return 'handled';
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
        this.clear();

        if (this.props.index === 1) {
          return 'not-handled';
        }
        this.props.updateOptionIndex(1);

        editorState = RichUtils.toggleBlockType(
          this.state.editorState,
          blockTypes[this.props.index].value
        );
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
    this.props.updateOptionIndex(index);
    this.setState({
      editorState: RichUtils.toggleBlockType(
        this.state.editorState,
        blockTypes[index].value
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
        <EditorHeader />
        <EditorToolbar
          blockDropdown={
            <EditorDropdown
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
            handleReturn={this.handleReturn}
            keyBindingFn={this.keyBindingFunction}
            blockStyleFn={this.myBlockStyleFn}
            ref={this.setDomEditorRef}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    index: state.optionIndex,
    backspaceCount: state.backspaceCount,
    editorState: state.editorState,
  };
};

export default connect(mapStateToProps, {
  updateOptionIndex,
  updateBackspaceCount,
  updateEditorState,
})(EditorMain);

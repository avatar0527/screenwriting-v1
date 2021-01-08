import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  Modifier,
  KeyBindingUtil,
} from 'draft-js';
import { getSelectedBlock, getSelectedBlocksType } from 'draftjs-utils';
import '../../css/EditorStyle.css';
import React from 'react';
import { connect } from 'react-redux';
import {
  updateOptionIndex,
  updateEditorState,
  changeBlockType,
  updateDebugIndex,
  moreContentRetrieved,
  loadEditorState,
  notSaved,
  saved,
  saveScreenplay,
} from '../../actions';
import _ from 'lodash';

import EditorToolbar from './EditorToolbar';
import EditorHeader from './EditorHeader';
import EditorInstructions from './EditorInstructions';
import { blockTypes } from './blockTypes';

class EditorMain extends React.Component {
  constructor(props) {
    super(props);

    this.ref = React.createRef();
    this.state = { editorRef: this.ref };
    this.onChange = this.onChange.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.toggleBlockType = this.toggleBlockType.bind(this);
    this.clear = this.clear.bind(this);
    this.setDomEditorRef = (ref) => (this.domEditor = ref);
    this.focus = () => this.domEditor.focus();
    this.props.loadEditorState(this.props.match.params.id);
  }

  componentDidMount() {
    this.props.updateEditorState(
      RichUtils.toggleBlockType(this.props.editorState, blockTypes[2].value)
    );
    var el = this.state.editorRef.current;
    el.addEventListener('compositionstart', this.handler);
    return () => {
      el.removeEventListener('compositionstart', this.handler);
    };
  }

  //Debug Indexes
  // 1 = return, 2 = backspace
  componentDidUpdate() {
    switch (this.props.debugIndex) {
      case 1:
        this.props.changeBlockType(
          this.props.editorState,
          blockTypes[this.props.index].value
        );
        this.props.updateDebugIndex(0);
        break;
      case 2:
        this.props.changeBlockType(
          this.props.editorState,
          blockTypes[this.props.index].value
        );
        this.props.updateDebugIndex(0);
        break;
      default:
        const currentIndex = _.findIndex(blockTypes, {
          value: getSelectedBlocksType(this.props.editorState),
        });
        if (currentIndex !== -1) {
          this.props.updateOptionIndex(currentIndex);
        }

        break;
    }
  }
  dispatchEditorState = () => {
    const prevEditorState = this.props.editorState;
    try {
      const selection = prevEditorState.getSelection();
      const contentState = prevEditorState.getCurrentContent();
      // 将选中文字部分置空
      const nextContentState = Modifier.replaceText(
        contentState,
        selection,
        '',
        undefined
      );
      const pushCommand = EditorState.push(
        prevEditorState,
        nextContentState,
        'insert-characters'
      );
      this.props.updateEditorState(pushCommand);
    } catch (e) {
      console.error(e);
      this.props.updateEditorState(prevEditorState);
    }
  };

  onChange(editorState) {
    if (this.props.saveStatus === 0) {
      this.props.notSaved();
    }
    this.props.updateEditorState(editorState);
  }

  handler = () => {
    this.dispatchEditorState();
  };

  keyBindingFunction(e) {
    //will need something to say cursor on most left end for tab stuff
    // need logic for +enter
    if (e.keyCode === 9 && e.shiftKey) {
      e.preventDefault();
      return 'downOneLevel';
    }
    if (e.keyCode === 9) {
      e.preventDefault();
      return 'upOneLevel';
    }
    if (e.keyCode === 83 && KeyBindingUtil.hasCommandModifier(e)) {
      e.preventDefault();
      return 'saveScreenplay';
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
    const editorState = this.props.editorState;
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

    this.props.updateEditorState(EditorState.push(editorState, removeBlock));
  }

  work(editorState) {
    const currentContent = editorState.getCurrentContent(),
      currentSelection = editorState.getSelection();

    const newContent = Modifier.insertText(
      currentContent,
      currentSelection,
      'characterToInsert'
    );

    const newEditorState = EditorState.push(
      editorState,
      newContent,
      'insert-characters'
    );

    this.onChange(newEditorState);
    this.focus();
  }

  handleReturn(event, editorState) {
    const block = getSelectedBlock(this.props.editorState);
    const currentContent = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const textWithEntity = Modifier.splitBlock(currentContent, selection);

    if (block.getText() === '') {
      let i = 1;
      switch (this.props.index) {
        case 0:
          i = 1;
          this.props.updateOptionIndex(i);
          this.props.changeBlockType(editorState, blockTypes[i].value);

          return 'handled';
        default:
          this.props.updateOptionIndex(1);
          return 'not-handled';
      }

      // this.props.updateOptionIndex(i);
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
        case 4:
          i = 0;
          break;
        default:
          break;
      }

      const newEditorState = RichUtils.toggleBlockType(
        editorState,
        blockTypes[this.props.index].value
      );

      this.props.updateEditorState(
        EditorState.push(newEditorState, textWithEntity, 'split-block')
      );

      this.props.updateOptionIndex(i);
      this.props.updateDebugIndex(1);

      return 'handled';
    }
  }

  handleKeyCommand(command) {
    // inline formatting key commands handles bold, italic, code, underline
    var editorState = RichUtils.handleKeyCommand(
      this.props.editorState,
      command
    );

    if (!editorState && command === 'upOneLevel') {
      let i = this.props.index;
      this.props.index === blockTypes.length - 1 ? (i = 0) : i++;
      editorState = RichUtils.toggleBlockType(
        this.props.editorState,
        blockTypes[i].value
      );
      this.props.updateOptionIndex(i);
    }

    if (!editorState && command === 'downOneLevel') {
      let i = this.props.index;
      this.props.index === 0 ? (i = blockTypes.length - 1) : i--;
      editorState = RichUtils.toggleBlockType(
        this.props.editorState,
        blockTypes[i].value
      );
      this.props.updateOptionIndex(i);
    }

    if (command === 'backspace') {
      const block = getSelectedBlock(this.props.editorState);
      if (block.getText() === '') {
        this.clear();

        switch (this.props.index) {
          case 1:
            return 'not-handled';
          case 3:
            return 'not-handled';
          default:
            this.props.updateOptionIndex(1);

            break;
        }

        editorState = RichUtils.toggleBlockType(
          this.props.editorState,
          blockTypes[this.props.index].value
        );
        return 'handled';
      }
    }
    if (command === 'saveScreenplay') {
      this.props.saveScreenplay(
        this.props.editorState,
        this.props.match.params.id
      );
      this.props.saved();

      return 'handled';
    }

    if (editorState) {
      this.props.updateEditorState(editorState);
      return 'handled';
    }

    return 'not-handled';
  }

  toggleBlockType(e) {
    e.preventDefault();

    let block = e.currentTarget.getAttribute('data-block');
    this.props.updateEditorState(
      RichUtils.toggleBlockType(this.props.editorState, block)
    );
  }

  render() {
    return (
      <div className='ui container' style={{ marginTop: '3em' }}>
        <div className='ui compact segment'>
          <div>
            <EditorHeader />
            <EditorToolbar {...this.props} />
          </div>
          <div onClick={this.focus} ref={this.ref}>
            <Editor
              editorState={this.props.editorState}
              onChange={this.onChange}
              handleKeyCommand={this.handleKeyCommand}
              handleReturn={this.handleReturn}
              keyBindingFn={this.keyBindingFunction}
              blockStyleFn={this.myBlockStyleFn}
              ref={this.setDomEditorRef}
            />
          </div>
          <div className='ui right rail' style={{ marginLeft: '0px' }}>
            <EditorInstructions />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    index: state.optionIndex,
    backspaceCount: state.backspaceCount,
    editorState: state.editorState.editorState,
    debugIndex: state.debugIndex,
    saveStatus: state.saveStatus,
  };
};

export default connect(mapStateToProps, {
  updateOptionIndex,
  updateEditorState,
  changeBlockType,
  updateDebugIndex,
  moreContentRetrieved,
  loadEditorState,
  notSaved,
  saved,
  saveScreenplay,
})(EditorMain);

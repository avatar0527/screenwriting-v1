import React from 'react';
import { connect } from 'react-redux';
import RichUtils from 'draft-js';

import EditorDropdown from './EditorDropdown';
import CreateSimpleButtons from './CreateSimpleButtons';
import SaveButton from './SaveButton';
import { updateEditorState, updateOptionIndex } from '../../actions';

const blockTypes = [
  {
    value: 'header-one',
    buttonText: '씬',
  },

  {
    value: 'unstyled',
    buttonText: '지문',
  },

  {
    value: 'header-three',
    buttonText: '캐릭터',
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

const EditorToolbar = (props) => {
  const blockTypeOnSelectedChange = (index) => {
    props.updateOptionIndex(index);
    props.updateEditorState(
      RichUtils.toggleBlockType(props.editorState, blockTypes[index].value)
    );
  };

  const toggleFontWeight = (e) => {
    //check if already applied
    // if not, apply
    e.preventDefault();

    const value = e.currentTarget.getAttribute('data-style');

    props.updateEditorState(
      RichUtils.toggleInlineStyle(props.editorState, value)
    );
  };

  return (
    <div>
      <div className='ui divider' style={{ margin: '1rem 0 0.25rem' }}></div>
      <div className='ui horizontal divided list'>
        <div className='item' style={{ fontWeight: 'bold' }}>
          Hollywood Standard
        </div>
        <div className='item'>
          <EditorDropdown
            options={blockTypes}
            selected={props.optionIndex}
            onSelectedChange={blockTypeOnSelectedChange}
            label=''
          />
        </div>
        {/* <div className='ui segment'>{blockButtons}</div> */}
        <div className='item'>
          <CreateSimpleButtons
            buttonDetails={fontWeightButtons}
            buttonFunction={toggleFontWeight}
          />
        </div>
        <div className='item'>
          <SaveButton {...props} />
        </div>
      </div>
      <div className='ui divider' style={{ margin: '0.25rem 0 1rem' }}></div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    optionIndex: state.optionIndex,
    editorState: state.editorState.editorState,
  };
};

export default connect(mapStateToProps, {
  updateOptionIndex,
  updateEditorState,
})(EditorToolbar);

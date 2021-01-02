import React from 'react';

const EditorToolbar = ({
  blockDropdown,
  fontButtons,
  sceneNumberButton,
  formatSelector,
}) => {
  return (
    <div>
      <div className='ui divider' style={{ margin: '1rem 0 0.25rem' }}></div>
      <div className='ui horizontal divided list'>
        <div className='item' style={{ fontWeight: 'bold' }}>
          Hollywood Standard
        </div>
        <div className='item'>{blockDropdown}</div>
        {/* <div className='ui segment'>{blockButtons}</div> */}
        <div className='item'>{fontButtons}</div>
        <div className='item'>{sceneNumberButton}</div>
      </div>
      <div className='ui divider' style={{ margin: '0.25rem 0 1rem' }}></div>
    </div>
  );
};

export default EditorToolbar;

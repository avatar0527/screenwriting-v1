import React from 'react';

class EditorHeader extends React.Component {
  render() {
    return (
      <div className='ui grid'>
        <h2 className='ui header' style={{ margin: '0px' }}>
          {/* <i className='file icon' /> */}
          Screen Writing 1
        </h2>
        <div className='sub header'>
          <div className='ui secondary menu'>
            <a href='/' className='item '>
              File
            </a>
            <a href='/' className='item'>
              Edit
            </a>
            <a href='/' className='item'>
              View
            </a>
            <a href='/' className='item'>
              Arrange
            </a>
            <a href='/' className='item'>
              Extras
            </a>
            <a href='/' className='item'>
              Help
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default EditorHeader;

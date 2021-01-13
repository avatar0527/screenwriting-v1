import React from 'react';
import { connect } from 'react-redux';

class EditorHeader extends React.Component {
  render() {
    return (
      <div className='ui grid'>
        <h3
          className='ui header'
          style={{ marginTop: 'auto', marginBottom: 'auto' }}
        >
          {this.props.screenplay.title}
        </h3>
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

const mapStateToProps = (state, ownProps) => {
  return {
    screenplay: state.screenplays[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps)(EditorHeader);

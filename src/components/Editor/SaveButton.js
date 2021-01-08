import React from 'react';
import { connect } from 'react-redux';
import { saveScreenplay, saved } from '../../actions';

class SaveButton extends React.Component {
  renderColor = () => {
    if (this.props.saveStatus === 1) {
      return 'red';
    }
    return 'primary';
  };
  renderText = () => {
    if (this.props.saveStatus === 1) {
      return '저장하기';
    }
    return '저장완료';
  };
  onClick = () => {
    this.props.saveScreenplay(
      this.props.editorState,
      this.props.match.params.id
    );
    this.props.saved();
  };
  render() {
    return (
      <div>
        <button
          className={`ui ${this.renderColor()} button`}
          onClick={this.onClick}
        >
          {`${this.renderText()}`}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    editorState: state.editorState.editorState,
    saveStatus: state.saveStatus,
  };
};

export default connect(mapStateToProps, { saveScreenplay, saved })(SaveButton);

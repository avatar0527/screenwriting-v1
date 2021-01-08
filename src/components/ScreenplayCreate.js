import React from 'react';
import { connect } from 'react-redux';
import { createScreenplay } from '../actions';
import ScreenplayForm from './ScreenplayForm';

class ScreenplayCreate extends React.Component {
  onSubmit = (formValues) => {
    this.props.createScreenplay(formValues);
  };

  render() {
    return (
      <div>
        <h3>시나리오 새로 만들기</h3>
        <ScreenplayForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { createScreenplay })(ScreenplayCreate);

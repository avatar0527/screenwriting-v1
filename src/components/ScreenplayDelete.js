import React from 'react';
import Modal from './Modal';
import history from '../history';
import { connect } from 'react-redux';
import { fetchScreenplay, deleteScreenplay } from '../actions';
import { Link } from 'react-router-dom';

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchScreenplay(this.props.match.params.id);
  }

  renderActions() {
    const { id } = this.props.match.params;
    return (
      <React.Fragment>
        <button
          onClick={() => this.props.deleteScreenplay(id)}
          className='ui button negative'
        >
          삭제하기
        </button>
        <Link to='/' className='ui button'>
          취소
        </Link>
      </React.Fragment>
    );
  }

  renderContent() {
    if (!this.props.stream) {
      return '시나리오를 삭제하시겠습니까?';
    }
    return `'${this.props.screenplay.title}'를 삭제하시겠습니까?`;
  }
  render() {
    return (
      <Modal
        title='Delete Stream'
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { screenplay: state.screenplays[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchScreenplay, deleteScreenplay })(
  StreamDelete
);

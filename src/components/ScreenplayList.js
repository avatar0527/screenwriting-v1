import React from 'react';
import { connect } from 'react-redux';
import { fetchScreenplays } from '../actions';
import { Link } from 'react-router-dom';

class ScreenplayList extends React.Component {
  componentDidMount() {
    this.props.fetchScreenplays();
  }

  renderAdmin(screenplay) {
    // if (screenplay.userId === this.props.currentUserId) {
    return (
      <div className='right floated content'>
        <Link
          to={`/screenplays/editor/${screenplay.id}`}
          className='ui button primary'
        >
          편집?
        </Link>
        <Link
          to={`/screenplays/delete/${screenplay.id}`}
          className='ui button negative'
        >
          삭제
        </Link>
      </div>
    );
    // }
  }

  renderList() {
    return this.props.screenplays.map((screenplay) => {
      return (
        <div className='item' key={screenplay.id}>
          {this.renderAdmin(screenplay)}
          <i className='large middle aligned icon camera' />
          <div className='content'>
            {screenplay.title}
            <div className='name'>{screenplay.name}</div>
          </div>
        </div>
      );
    });
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to='/screenplays/new' className='ui button green'>
            시나리오 새로 만들기
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h2>시나리오</h2>
        <div className='ui celled list'>{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    screenplays: Object.values(state.screenplays),
    // currentUserId: state.auth.userId,
    isSignedIn: true,
  };
};
export default connect(mapStateToProps, { fetchScreenplays })(ScreenplayList);

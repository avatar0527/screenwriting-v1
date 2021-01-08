import React from 'react';
import { connect } from 'react-redux';
import { fetchScreenplays, clearEditorState } from '../actions';
import { Link } from 'react-router-dom';

class ScreenplayList extends React.Component {
  componentDidMount() {
    this.props.fetchScreenplays();
    this.props.clearEditorState();
  }

  renderAdmin(screenplay) {
    //this second check is unnecessary i think?
    if (screenplay.userId === this.props.currentUserId) {
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
    }
  }

  renderList() {
    return this.props.screenplays.map((screenplay) => {
      if (screenplay.userId === this.props.currentUserId) {
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
      } else {
        return null;
      }
    });
  }

  renderCreate() {
    return (
      <div style={{ textAlign: 'right' }}>
        <Link to='/screenplays/new' className='ui button green'>
          시나리오 새로 만들기
        </Link>
      </div>
    );
  }

  render() {
    if (this.props.isSignedIn) {
      return (
        <div>
          <h2>시나리오</h2>
          <div className='ui celled list'>{this.renderList()}</div>
          {this.renderCreate()}
        </div>
      );
    } else {
      return (
        <div className='ui center aligned icon header'>
          <i className='circular user icon'></i>
          <div className='content'>사용하시려면 로그인을 해주세요</div>
          <div className='sub header'></div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    screenplays: Object.values(state.screenplays),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};
export default connect(mapStateToProps, { fetchScreenplays, clearEditorState })(
  ScreenplayList
);

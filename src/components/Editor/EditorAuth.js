import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import EditorMain from './EditorMain';
import { fetchScreenplay } from '../../actions';

class EditorAuth extends React.Component {
  componentDidMount() {
    this.props.fetchScreenplay(this.props.match.params.id); //fetch stream
  }
  renderEditor(screenplay) {
    if (!this.props.screenplays) {
      return (
        <div className='ui active centered inline large text loader'>
          Loading
        </div>
      );
    } else {
      console.log(screenplay);
      if (screenplay.userId === this.props.currentUserId) {
        return <EditorMain match={this.props.match} />;
      } else {
        return (
          <div>
            Oops, something must be wrong here! <br />
            <Link to='/' className='ui button negative'>
              Go to front page
            </Link>
          </div>
        );
      }
    }
  }
  render() {
    return <div>{this.renderEditor(this.props.screenplays)}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    currentUserId: state.auth.userId,
    screenplays: state.screenplays[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchScreenplay })(EditorAuth);

'use strict';

import React from 'react';
import { connect } from 'react-redux';
import DismissibleAlert from '../components/DismissibleAlert';
import * as types from '../constants/NotificationTypes';
import { dismiss } from  '../actions/notification';


class NotificationContainer extends React.PureComponent {
  render() {
    switch (this.props.type) {
      case types.NOTIFICATION_NONE:
        return null;

      case types.NOTIFICATION_ERROR:
      case types.NOTIFICATION_WARNING:
      case types.NOTIFICATION_INFO:
      case types.NOTIFICATION_SUCCESS:
        return (
          <div id="notification">
            <DismissibleAlert type={this.props.type} dismiss={this.props.dismiss}>{this.props.data}</DismissibleAlert>
          </div>
        );

      default:
        break;
    }

    return null;
  }
}


const mapStateToProps = state => ({
  type: state.notification.type,
  data: state.notification.data
});


const mapDispatchToProps = (dispatch, ownProps) => ({
  dismiss: () => dispatch(dismiss())
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationContainer);

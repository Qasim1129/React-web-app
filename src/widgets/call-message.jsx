// Chat message describing a video or voice call.

import React from 'react';
import { FormattedMessage } from 'react-intl';

import { secondsToTime } from '../lib/strformat.js';

export default class CallMessage extends React.PureComponent {
  render() {
    const isCallDropped = this.props.content == 'disconnected';
    const successClass = 'material-icons medium ' + (isCallDropped ? 'red' : 'green');
    const callIcon = this.props.response ?
      (isCallDropped ? 'call_missed' : 'call_received') :
      (isCallDropped ? 'call_missed_outgoing' : 'call_made');
    const duration = isCallDropped ? (
        this.props.response ?
        <FormattedMessage id="call_missed" defaultMessage="missed" description="Label for cancelled incoming call" /> :
        <FormattedMessage id="call_cancelled" defaultMessage="cancelled" description="Label for cancelled outgoing call" />
      ) :
      <span>{secondsToTime(this.props.duration / 1000)}</span>;
    return <div className="call-message">
      <div><i className="material-icons big gray">call</i></div>
      <div className="flex-column narrow">
        <div>{this.props.response ?
          <FormattedMessage id="calls_incoming" defaultMessage="Incoming call" description="Incoming call label" /> :
          <FormattedMessage id="calls_outgoing" defaultMessage="Outgoing call" description="Outgoing call label" />
        }</div>
        <div className="duration"><i className={successClass}>{callIcon}</i> {duration}</div>
      </div>
    </div>;
  }
}
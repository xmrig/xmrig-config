'use strict';

import React from 'react';
import Icon from '@fortawesome/react-fontawesome';
import cn from 'classnames';


export default class PresetForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name
    };
  }


  render() {
    return (
      <form className="form-inline pull-right">
        <div className="form-group">
          <div className="input-group">
            <input type="text" className="form-control" id="name" name="name" value={this.state.name} onChange={event => { this.setState({ name: event.target.value }) }} />
            <span className="input-group-btn">
              <button title="Save" onClick={this.save} className={cn('btn', { 'btn-default': this.isSaved(), 'btn-success': !this.isSaved() })}><Icon icon="save" /> Save</button>
              <button title="Share" onClick={this.share} className="btn btn-default" disabled={!this.isSaved()}><Icon icon="share-alt" /> Share</button>
            </span>
          </div>
        </div>
      </form>
    );
  }


  componentWillReceiveProps(nextProps) {
    if (this.state.name !== nextProps.name) {
      this.setState({name: nextProps.name});
    }
  }


  isSaved() {
    return this.props.name === this.state.name;
  }


  save = event => {
    event.preventDefault();

    this.props.save(this.state.name);
  };


  share = event => {
    event.preventDefault();

    this.props.share();
  };
}

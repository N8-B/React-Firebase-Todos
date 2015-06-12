var React = require('react'),
    Firebase = require('firebase'),
    RootUrl = 'https://vivid-torch-2280.firebaseio.com/';

module.exports = React.createClass({
  getInitialState: function() {
    return {
      text: this.props.item.text,
      done: this.props.item.done,
      textChanged: false
    }
  },
  componentWillMount: function() {
    this.fb = new Firebase(RootUrl + 'items/' + this.props.item.key);
  },
  render: function() {
    return (
      <div className="input-group">
        <span className="input-group-addon">
          <input
            type="checkbox"
            checked={this.state.done}
            onChange={this.handleDoneChange}
            />
        </span>
        <input type="text"
          disabled={this.state.done}
          className="form-control"
          value={this.state.text}
          onChange={this.handleTextChange}
          onKeyDown={this.handleKeyDown}
          ref="userInput"
          />
        <span className="input-group-btn">
          {this.changesButtons()}
          <button
            className="btn btn-danger"
            onClick={this.handleDeleteClick}
            >
            Delete
          </button>
        </span>
      </div>
    );
  },
  changesButtons: function() {
    if(!this.state.textChanged) {
      return null;
    } else {
      return [
        <button
          className="btn btn-success"
          onClick={this.handleSaveClick}
          >Save
        </button>,
        <button
          className="btn btn-info"
          onClick={this.handleUndoClick}
          >Undo
        </button>
      ]
    }
  },
  handleKeyDown: function(event) {
    if(event.keyCode === 13 && this.state.textChanged) {
      this.fb.update({ text: this.state.text });
      this.setState({ textChanged: false });
    } else {
      return null;
    }
  },
  handleSaveClick: function() {
    this.fb.update({ text: this.state.text });
    this.setState({ textChanged: false });
  },
  handleUndoClick: function() {
    this.setState({
      text: this.props.item.text,
      textChanged: false
    });
  },
  handleDoneChange: function(event) {
    var updatedItem = { done: event.target.checked };
    this.setState(updatedItem);
    this.fb.update(updatedItem);
  },
  handleDeleteClick: function() {
    this.fb.remove();
  },
  handleTextChange: function(event) {
    this.setState({
      text: event.target.value,
      textChanged: true
    });
  }
});

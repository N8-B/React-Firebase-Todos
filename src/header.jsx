var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      text: ''
    }
  },
  render: function() {
    return (
      <div className="input-group">
        <input
          value={this.state.text}
          onChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
          type="text"
          className="form-control"
          placeholder="Add a to-do here..."/>
        <span className="input-group-btn">
          <button
            onClick={this.handleClick}
            className="btn btn-primary"
            type="button">
            Add
          </button>
        </span>
      </div>
    )
  },
  handleKeyDown: function(event) {
    if(event.keyCode === 13) {
      // Send value of text input to Firebase
      this.props.itemsStore.push({
        text: this.state.text,
        done: false
      });

      this.setState({text: ''});
    } else {
      return null;
    }
  },
  handleClick: function() {
    // Send value of text input to Firebase
    this.props.itemsStore.push({
      text: this.state.text,
      done: false
    });

    this.setState({text: ''});
  },
  handleInputChange: function(event) {
    this.setState({text: event.target.value});
  }
});

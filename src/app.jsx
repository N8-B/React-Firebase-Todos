// Required Modules
var React = require('react'),
    ReactFire = require('reactfire'),
    Firebase = require('firebase'),
    RootUrl = 'https://vivid-torch-2280.firebaseio.com/';

// React components
var Header = require('./header'),
    List = require('./list');

// Main app configuration
var App = React.createClass({
  mixins: [ ReactFire ],
  getInitialState: function() {
    return {
      items: {},
      loaded: false
    }
  },
  componentWillMount: function() {
    this.fb = new Firebase(RootUrl + 'items/');
    this.bindAsObject(this.fb, 'items');
    this.fb.on('value', this.handleDataLoaded);
  },
  render: function() {
    return (
      <div className="row panel panel-default">
        <div className="col-md-8 col-md-offset-2">
          <h2 className="text-center">To-Do List</h2>
          <Header itemsStore={this.firebaseRefs.items} />
          <hr />
          <div className={"content " + (this.state.loaded ? 'loaded' : '')}>
            <List items={this.state.items} />
            {this.deleteButton()}
          </div>
        </div>
      </div>
    )
  },
  deleteButton: function() {
    if(!this.state.loaded) {
      return;
    } else {
      return (
        <div className="text-center clear-complete">
          <hr />
          <button
            onClick={this.handleDeleteDoneClick}
            disabled={this.state.items ? '' : 'disabled'}
            type="button"
            className="btn btn-default btn-primary btn-block">
          Clear Complete
          </button>
        </div>
      )
    }
  },
  handleDeleteDoneClick: function() {
    for(var key in this.state.items) {
      if(this.state.items[key].done === true) {
        this.fb.child(key).remove();
      }
    }
  },
  handleDataLoaded: function() {
    this.setState({ loaded: true });
  }
});

// Create main React app element and render in div.container on index.html
var element = React.createElement(App, {});
React.render(element, document.querySelector('.container'));

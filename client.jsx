/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');

var RemoveLink = React.createClass({
	handleRemove: function() {
		this.props.remove(this.props.itemToRemove);
	},
	render: function() {
		return (<a onClick={this.handleRemove} href="#"><img src="/assets/ok-icon.png"/></a>);
	}
});

var TodoList = React.createClass({
  render: function() {
    var createItem = function(item) {
    return (
		<tr>
			<td>{item.id}</td>
			<td>{item.text}</td>
			<td>{item.created}</td>
			<td> < RemoveLink remove={this.props.remove} itemToRemove={item}/></td>
		</tr>
	);
    };
    return ( 
		<table className="table">
			<thead>
				<tr>
					<th>#</th>
					<th>Work to to</th>
					<th>Created</th>
					<th>Done?</th>
				</tr>
			</thead>
			<tbody>
				{this.props.items.map(createItem.bind(this))}
			</tbody>
		</table>
		);
  }
});
var Todo = React.createClass({
  getInitialState: function() {
    return {items: [{id:"1", text:"Learn React.js", created: this.getDate(new Date())}], text: ''};
  },
  
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  
  onRemove: function(item) {
	var index = item.id - 1;
	var items = this.state.items;
	items.splice(index, 1);
	items.map(function(item, index) {
		item.id = index+1;
		return item;
	});
	this.setState({items: items});
  },
  
  handleSubmit: function(e) {
    e.preventDefault();
	var text = this.state.text;
	if (text) {
		var nextItems = this.state.items.concat([{text: text, id: this.state.items.length+1, created: this.getDate(new Date())}]);
		var nextText = '';
		this.setState({items: nextItems, text: nextText});
	}
  },
  
  getDate: function(date) {
	return date.getFullYear() + "-" + date.getMonth()+1 + "-" + date.getDate();
  },
  
  render: function() {
    return (
      <div className="container">
        <h2>Simple TODO list</h2>
		<div className="panel panel-default">
			<TodoList items={this.state.items} remove={this.onRemove} />
		</div>
        <form onSubmit={this.handleSubmit}>
			<div className="col-lg-5">
				<div className="input-group">
				<input className="form-control" onChange={this.onChange} value={this.state.text} />
				<span className="input-group-btn">
					<button className="btn btn-default">Add to TODO list</button>
				</span>
				</div>
			</div>
        </form>
      </div>
    );
  }
});

var App = React.createClass({

  render: function() {
    return (
      <html>
        <head>
          <link rel="stylesheet" href="/assets/bootstrap.css" />
          <script src="/assets/bundle.js" />
        </head>
		<body>
			<Todo />
		</body>
      </html>
    );
  }
});

module.exports = App;

if (typeof window !== 'undefined') {
  window.onload = function() {
    React.render(App(), document);
  }
}

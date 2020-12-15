import React from 'react';
import ReactDOM from 'react-dom';
import './app.css';

const KingGrab = require('./kings.js'); 

class Who extends React.Component	{
	constructor(props)	{
		super(props);
		this.state = {
			entry: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleButton = this.handleButton.bind(this);
	}

	handleChange(event) {
		this.setState({
			entry: event.target.value
		})
	}

	handleButton() {
		this.props.onButt(this.state.entry);
	}

	handleKeyDown = e => {
		if (e.key === 'Enter')	{
			this.handleButton();
		}
	}

	render()	{
		return (
			<div onKeyDown={this.handleKeyDown}>
				<h1>Who ruled England in <input type="text" onChange={this.handleChange}/>?</h1>
				<button onClick={this.handleButton}>Go!</button>
			</div>
		)
	}
}

class KingDisplay extends React.Component {
	constructor(props)	{
		super(props);
		this.state =	{
			king: this.props.kingInfo
		}
	}

	render()	{
		const king = this.state.king;

		let text;

		if (king.disclaimer) {
			text = king.disclaimer
		}
		else {
			text = king.name + " ruled in " + king.reqYear + "."
		}

		return (
	 		<div>
				<h1>{text}</h1>
				<button onClick={this.props.backButt}>Back!</button>
			</div>
		)
	}
}

class Main extends React.Component	{
	constructor(props)	{
		super(props);
		this.state = {
			yearEntry: 0
		}
	}

	entryClick = entry => {
		this.setState({
			yearEntry: entry
		});
	}

	backToStart = () => {
		this.setState({
			yearEntry: 0
		})
	}

	render()	{
		let view;

		const year = this.state.yearEntry;

		if (!year)	{
			view = <Who onButt={this.entryClick}/>
		}
		else {
			let king = KingGrab.getKing(year);
			view = <KingDisplay kingInfo={king} backButt={this.backToStart}/>
		}

		return (
			<div class="main">
				<div class="red"></div>
				<div class="ques">{view}</div>
			</div>)
	}
}

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);

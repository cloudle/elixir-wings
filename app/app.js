import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {
	constructor (props) {
		super(props);

		// this.state = {
		// 	counter: 1,
		// };

		// this.counterInterval = setInterval(() => {
		// 	this.counterTick();
		// }, 200);
	}

	// counterTick () {
	// 	this.setState({counter: this.state.counter + 1});
	// }

	render() {
		return <div>
			<h1>CRM Server!!</h1>
			{this.props.articles.map((item, index) => <div key={index}>
				<span>{item.title} {item.content}</span>
			</div>)}
			{this.props.children}
		</div>
	}
}

export default connect(state => {
	return {
		articles: state.app.articles
	}
})(App);
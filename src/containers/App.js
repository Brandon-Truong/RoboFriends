import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

//needs to be class to start using state
class App extends Component{
	constructor() { // use a constructor  to declare state
		super()  //CANNOT use this. function until you have super()
		this.state = 	{ //declare this.state then say what you want the state to have
			robots: [], 
			searchfield:''
			//robots and searchfield are the states that can *change* and affect the app
		}
	}

	componentDidMount(){
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response=> response.json())
			.then(users=>this.setState({robots: users}));
	}

	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value})
	}
	//class in react ALWAYS has to have a render()
	render() {
		const {robots, searchfield} = this.state;
		const filteredRobots = robots.filter(robot =>{
		return robot.name.toLowerCase().includes(searchfield.toLowerCase())
		})
			return !robots.length ?
			<h1> Loading </h1> :
			(
				<div className = 'tc'>
					<h1 className='f1'> RoboFriends </h1>
					<SearchBox searchChange ={this.onSearchChange}/>
					<Scroll>
						<ErrorBoundry>
							<CardList robots ={filteredRobots}/>	
						</ErrorBoundry>
					</Scroll>	
				</div>	
				// can now use this.state.robots instead of from { robots }
			)
		}
}

export default App;
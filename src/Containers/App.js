import React,{Component} from 'react';
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox';
import Scroll from '../Components/Scroll'
import ErrorBoundary from '../Components/ErrorBoundary'
import './App.css';



class App extends Component {
	
	constructor() {
		super()
	   	this.state = {
	   		robots : [],
			searchField : ""
		
	   	}		

	};

	componentDidMount() {
	fetch('https://jsonplaceholder.typicode.com/users')
			.then(response=> response.json())
			.then(users =>this.setState({robots:users}))
	
	};
	onSearchChange = (event) => {
		this.setState({searchField:event.target.value})

		

	}

	render() {

		const {robots,searchField} = this.state; 
		// so we can remove the this.state pre-fix


		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchField.toLowerCase())||
			robot.email.toLowerCase().includes(searchField.toLowerCase());
		});

		return !robots.length?
		 <h1>LOADING..</h1>
		:	

		(
		<div className="tc">
			<h1 className = "f2">RoboFriends</h1>
	    	<SearchBox searchChange = {this.onSearchChange}/>
	    	<Scroll>
	    	<ErrorBoundary>
			<CardList robots ={filteredRobots}/>
			</ErrorBoundary>
			</Scroll>
		</div>
		);

		

		

	};

};

export default App;
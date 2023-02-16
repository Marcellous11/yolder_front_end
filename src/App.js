import './styles/App.css';
import { BrowserRouter } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import MyRoutes from './MyRoutes.js';
import NavBar from './NavBar';
import Context from './Context';
import axios from 'axios';
function App() {
	const [ loggedIn, setLoggedIn ] = React.useState(localStorage.user);
	const [ users, setUsers ] = useState([]);
	const [ ozyCount, setOzyCount ] = useState(0);

	useEffect(
		() => {
			const getAllUsers = async () => {
				let { data } = await axios.get('http://localhost:3002/users/');
				setUsers(data);
			};
			getAllUsers();
		},
		[ localStorage.users ]
	);

	return (
		<div className="App">
			<Context.Provider value={{ users, setUsers, setLoggedIn, loggedIn, ozyCount, setOzyCount }}>
				<BrowserRouter>
					<NavBar loggedIn={loggedIn} />
					<MyRoutes />
				</BrowserRouter>
			</Context.Provider>
		</div>
	);
}

export default App;

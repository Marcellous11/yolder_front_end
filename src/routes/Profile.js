import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';
import Context from '../Context';

const Profile = () => {
	const navigate = useNavigate();
	const { users } = useContext(Context);
	const [ user, setUser ] = useState();

	useEffect(
		() => {
			if (!localStorage.user) navigate('/login');

			if (users) {
				for (let i = 1; i < Object.keys(users).length; i++) {
					if (localStorage.user === users[i].email) {
						setUser(users[i]);
					}
				}
			}
		},
		[ users ]
	);

	if (user) {
		return (
			<div className="Profile">
				<h2>Welcome</h2>
				<h1>
					{user.firstName} {user.lastName}
				</h1>
				<h3>
					Status: <span style={{ color: user.state === 'pending' ? 'red' : 'green' }}>{user.state}</span>{' '}
				</h3>
			</div>
		);
	}

	return (
		<div>
			<h1>Loading</h1>
		</div>
	);
};

export default Profile;

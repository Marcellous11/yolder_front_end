import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import UserMod from '../modules/UserMod';
import Context from '../Context';

import '../styles/Admin.css';

const Admin = ({ changeState }) => {
	const { users } = useContext(Context);
	if (users) {
		return (
			<div className="Admin">
				<h1>Admin</h1>
				<h3>All Users</h3>
				<div className="Admin-UserMods">
					{users.map((user) => {
						return (
							<UserMod
								changeState={changeState}
								key={user.id}
								id={user.id}
								firstName={user.firstName}
								lastName={user.lastName}
								email={user.email}
								state={user.state}
								password={user.password}
							/>
						);
					})}
				</div>
			</div>
		);
	}
	return <h1>Loading</h1>;
};

export default Admin;

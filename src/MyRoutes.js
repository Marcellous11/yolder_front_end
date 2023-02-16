import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Admin from './routes/Admin';
import Profile from './routes/Profile';
import Login from './routes/Login';
import Signup from './routes/Signup';
import axios from 'axios';
import Context from './Context';

const MyRoutes = () => {
	const makeuser = async (data) => {
		await axios.post('http://localhost:3002/users/', data);
	};
	const changeState = async (id, data) => {
		const res = await axios.patch(`http://localhost:3002/users/${id}`, data);
	};
	const login = async (data) => {
		const res = await axios.post(`http://localhost:3002/users/login`, data);
		return res;
	};

	return (
		<Routes>
			<Route path="/signup" element={<Signup makeuser={makeuser} />} />
			<Route path="/login" element={<Login login={login} />} />
			<Route path="/admin" element={<Admin changeState={changeState} />} />
			<Route path="/profile" element={<Profile />} />
			<Route path="/" element={<Login />} />
		</Routes>
	);
};
export default MyRoutes;

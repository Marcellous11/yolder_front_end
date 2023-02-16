import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css';
import Context from '../Context';

const Login = ({ login }) => {
	const { setLoggedIn, users } = useContext(Context);
	const navigate = useNavigate();
	const INIITAL_STATE = {
		email: '',
		password: ''
	};
	const [ formData, setFormData ] = useState(INIITAL_STATE);

	const onChange = (e) => {
		const { name, value } = e.target;
		setFormData((formData) => ({
			...formData,
			[name]: value
		}));
	};

	const onSubmit = (e) => {
		login(formData).then((data) => {
			if (data.data) {
				localStorage.user = formData.email;
				localStorage.users = users;

				setLoggedIn(localStorage.user);
				setFormData(INIITAL_STATE);
				navigate('/profile');
			} else {
				console.log('wrong password');
				alert('Wrong Password');
			}
		});

		e.preventDefault();
	};

	return (
		<div className="Login">
			<div>
				<title>Login Page</title>
			</div>
			<div className="Login-Content">
				<h1>Login</h1>
				<form className="Login-Content-Form" onSubmit={onSubmit}>
					<label htmlFor="email">
						<input
							required
							type="email"
							name="email"
							placeholder="Email"
							onChange={onChange}
							value={formData.email}
						/>
					</label>
					<label htmlFor="password">
						<input
							required
							type="password"
							name="password"
							placeholder="Password"
							onChange={onChange}
							value={formData.password}
						/>
					</label>
					<p>
						Don't have an account? Sign up<Link style={{ color: 'green' }} to="/signup">
							{' '}
							here!{' '}
						</Link>
					</p>
					<button style={{ color: 'white' }} type="submit">
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.css';
import Context from '../Context';

const Signup = ({ makeuser }) => {
	const { users } = useContext(Context);
	const INIITAL_STATE = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		passwordCheck: ''
	};
	const [ formData, setFormData ] = useState(INIITAL_STATE);
	const navigate = useNavigate();
	const onChange = (e) => {
		const { name, value } = e.target;
		setFormData((formData) => ({
			...formData,
			[name]: value
		}));
	};

	//Password match validation
	if (formData.password === formData.passwordCheck && formData.password.length > 0) {
		document.querySelector('.Signup-form input[name="passwordCheck"]').style.borderColor = 'green';
	} else if (formData.password !== formData.passwordCheck && formData.password.length > 0) {
		document.querySelector('.Signup-form input[name="passwordCheck"]').style.borderStyle = 'solid';
		document.querySelector('.Signup-form input[name="passwordCheck"]').style.borderColor = 'red';
	} else {
	}

	// email valivation
	let takenEmail = false;
	if (formData.email) {
		users.forEach((e) => {
			if (formData.email === e.email) {
				takenEmail = true;
				document.querySelector('.Signup-form input[name="email"]').style.borderStyle = 'solid';
				document.querySelector('.Signup-form input[name="email"]').style.borderColor = 'red';
			} else {
				takenEmail = false;
				document.querySelector('.Signup-form input[name="email"]').style.borderStyle = 'solid';
				document.querySelector('.Signup-form input[name="email"]').style.borderColor = 'green';
			}
		});
	}

	const onSubmit = (e) => {
		e.preventDefault();
		if (formData.password === formData.passwordCheck && !takenEmail) {
			delete formData.passwordCheck;

			makeuser(formData);
			setFormData(INIITAL_STATE);
			navigate('/login');
		}
	};

	return (
		<div className="Signup">
			<div>
				<h1>Sign Up </h1>
				<title>Yodlr Registration Portal</title>
			</div>

			<div>
				<form className="Signup-form" onSubmit={onSubmit}>
					<label htmlFor="firstname">
						<input
							required
							type="text"
							name="firstName"
							placeholder="First Name"
							onChange={onChange}
							value={formData.firstName}
						/>
					</label>
					<label htmlFor="lastName">
						<input
							required
							type="text"
							name="lastName"
							placeholder="Last Name"
							onChange={onChange}
							value={formData.lastName}
						/>
					</label>
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
					<label htmlFor="passwordCheck">
						<input
							required
							type="password"
							name="passwordCheck"
							placeholder="Check Password"
							onChange={onChange}
							value={formData.state}
						/>
					</label>

					<button style={{ color: 'white' }} type="submit">
						Submit
					</button>
					{formData.password !== formData.passwordCheck && <span>Passwords do not match</span>}
					{takenEmail && <span>That email has already been used.</span>}
				</form>
			</div>
		</div>
	);
};

export default Signup;

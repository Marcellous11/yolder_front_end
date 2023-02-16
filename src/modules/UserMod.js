import React, { useContext, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import '../styles/Admin.css';
import Context from '../Context';

export default function UserMod({ id, firstName, lastName, email, state, password, changeState }) {
	const [ userInfo, setUserInfo ] = useState({ id, firstName, lastName, email, password, state });
	const { users, ozyCount, setOzyCount } = useContext(Context);

	//toggles active and changle element color
	const makeChange = (e) => {
		//asyc work around,
		setOzyCount(ozyCount + 1);
		localStorage.users = ozyCount;

		if (userInfo.state === 'pending') {
			//color
			e.target.style.color = 'green';

			//setting state to be set into db
			setUserInfo({
				id: id,
				firstName,
				lastName,
				email,
				state: 'active',
				password
			});
		} else {
			e.target.style.color = 'red';

			//setting state to be set into db
			setUserInfo({
				id,
				firstName,
				lastName,
				email,
				state: 'pending',
				password
			});
		}
	};

	//state commited to db
	changeState(id, userInfo);

	return (
		<Card className="Card" sx={{ maxWidth: 300, minWidth: 275 }}>
			<CardContent>
				<Typography variant="h5" component="div">
					{firstName} {lastName}
				</Typography>
				<Typography sx={{ mb: 1.5 }} color="text.secondary">
					status:<span
						style={{
							display: 'inline',
							color: state === 'pending' ? 'red' : 'green',
							padding: '.4rem',
							cursor: 'pointer',
							borderRadius: '.5rem'
						}}
						onClick={makeChange}
					>
						{userInfo.state}
					</span>
				</Typography>
				<Typography variant="body2">Email : {email}</Typography>
			</CardContent>
		</Card>
	);
}

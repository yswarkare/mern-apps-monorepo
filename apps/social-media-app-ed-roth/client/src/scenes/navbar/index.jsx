import { useState } from 'react';
import { Box, FormControl, IconButton, InputBase, MenuItem, Select, Typography, useTheme, useMediaQuery } from '@mui/material';
import { Search, Message, DarkMode, LightMode, Notifications, Help, Menu, Close } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setMode, setLogout } from '../../state/index';
import { useNavigate } from 'react-router-dom';
import FlexBetween from '../../components/FlexBetween';

const iconSize = { fontSize: '25px' };

const Navbar = () => {
	const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.user);
	const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');
	const theme = useTheme();
	const neutralLight = theme.palette.neutralLight;
	const dark = theme.palette.dark;
	const background = theme.palette.background.default;
	const primaryLight = theme.palette.primary.light;
	const alt = theme.palette.background.alt;

	const fullName = `${user?.firstname} ${user?.lastname}`;

	return (
		<FlexBetween padding={'1rem 6%'} backgroundColor={alt}>
			<FlexBetween gap={'1.75rem'}>
				<Typography
					fontWeight='bold'
					fontSize='clamp(1rem, 2rem, 2.25rem)'
					color='primary'
					onClick={() => navigate('/home')}
					sx={{
						'&:hover': {
							color: primaryLight,
							cursor: 'pointer',
						},
					}}
				>
					Sociopedia
				</Typography>
				{isNonMobileScreens && (
					<FlexBetween backgroundColor={neutralLight} borderRadius='9px' gap='3rem' padding='0.1rem 1.5rem'>
						<InputBase placeholder='Search...' />
						<IconButton>
							<Search />
						</IconButton>
					</FlexBetween>
				)}
			</FlexBetween>
			{/* Desktop Navbar */}
			{isNonMobileScreens ? (
				<FlexBetween gap='2rem'>
					<IconButton onClick={() => dispatch(setMode())}>
						{theme.palette.mode === 'dark' ? <DarkMode sx={iconSize} /> : <LightMode sx={{ color: dark, ...iconSize }} />}
					</IconButton>
					<Message sx={iconSize} />
					<Notifications sx={iconSize} />
					<Help sx={iconSize} />
					<FormControl varient='standard' value={fullName}>
						<Select
							value={fullName}
							sx={{
								backgroundColor: neutralLight,
								width: '150px',
								borderRadius: '0.25rem',
								p: '0.25rem 1.rem',
								'& .MuiSvgIcon-root': {
									pr: '0.25rem',
									width: '3rem',
								},
								'& .MuiSelect-select:focus': {
									backgroundColor: neutralLight,
								},
							}}
							input={<InputBase />}
						>
							<MenuItem value={fullName}>
								<Typography>{fullName}</Typography>
							</MenuItem>
							<MenuItem onClick={() => dispatch(setLogout())}></MenuItem>
						</Select>
					</FormControl>
				</FlexBetween>
			) : (
				<IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
					<Menu />
				</IconButton>
			)}

			{/* Mobile View */}
			{!isNonMobileScreens && isMobileMenuToggled && (
				<Box
					position='fixed'
					right='0'
					bottom='0'
					height='100%'
					zIndex='10'
					maxWidth='500px'
					minWidth='300px'
					backgroundColor={background}
				>
					{/* Close Icon */}
					<Box display='flex' justifyContent='flex-end' p='1rem'>
						<IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
							<Close />
						</IconButton>
					</Box>

					{/* Menu Items */}
					<FlexBetween display='flex' flexDirection='column' justifyContent='center' alignItems='center' gap='3rem'>
						<IconButton onClick={() => dispatch(setMode())}>
							{theme.palette.mode === 'dark' ? <DarkMode sx={iconSize} /> : <LightMode sx={{ color: dark, ...iconSize }} />}
						</IconButton>
						<Message sx={iconSize} />
						<Notifications sx={iconSize} />
						<Help sx={iconSize} />
						<FormControl varient='standard' value={fullName}>
							<Select
								value={fullName}
								sx={{
									backgroundColor: neutralLight,
									width: '150px',
									borderRadius: '0.25rem',
									p: '0.25rem 1.rem',
									'& .MuiSvgIcon-root': {
										pr: '0.25rem',
										width: '3rem',
									},
									'& .MuiSelect-select:focus': {
										backgroundColor: neutralLight,
									},
								}}
								input={<InputBase />}
							>
								<MenuItem value={fullName}>
									<Typography>{fullName}</Typography>
								</MenuItem>
								<MenuItem onClick={() => dispatch(setLogout())}></MenuItem>
							</Select>
						</FormControl>
					</FlexBetween>
				</Box>
			)}
		</FlexBetween>
	);
};

export default Navbar;

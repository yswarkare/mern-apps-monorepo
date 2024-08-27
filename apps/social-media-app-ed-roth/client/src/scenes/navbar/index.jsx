import { useState } from 'react';
import { Box, FormControl, IconButton, InputBase, MenuItem, Select, Typography, useTheme, useMediaQuery } from '@mui/material';
import { Search, Message, DarkMode, LightMode, Notification, Help, Menu, Close } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setMode, setLogout } from '../../state/index';
import { useNavigate } from 'react-router-dom';
import FlexBetween from 'components/FlexBetween';

const NavbarPage = () => {
	const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.user);
	const isNonMobileScreens = useMediaQuery('min-width: 1000px');
	const theme = useTheme();
	const neutralLight = theme.palette.neutralLight;
	const dark = theme.palette.dark;
	const background = theme.palette.background.default;
	const primaryLight = theme.palette.primary.light;
	const alt = theme.palette.background.alt;

	const fullName = `${user.firstname} ${user.lastname}`;

	return (
		<FlexBetween padding={'1rem 6%'} backgroundColor={alt}>
			<FlexBetween>
        
      </FlexBetween>
		</FlexBetween>
	);
};

export default NavbarPage;

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routes from './routes';

import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme.jsx';

function App() {
	const router = createBrowserRouter(routes);
	const mode = useSelector((state) => state.mode);
	const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<RouterProvider router={router}></RouterProvider>
		</ThemeProvider>
	);
}

export default App;

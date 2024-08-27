import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import PageLoader from './components/loaders/PageLoader.jsx';
import store from './state/store.js';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Suspense fallback={<PageLoader />}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistStore(store)}>
					<App />
				</PersistGate>
			</Provider>
		</Suspense>
	</StrictMode>
);

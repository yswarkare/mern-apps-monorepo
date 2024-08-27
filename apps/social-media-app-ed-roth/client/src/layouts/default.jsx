import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import PageLoader from '../components/loaders/PageLoader';

const DefaultPage = () => {	return (
		<div className='app'>
			default page
			<main>
				<Suspense fallback={<PageLoader />}>
					<Outlet />
				</Suspense>
			</main>
		</div>
	);
};

export default DefaultPage;

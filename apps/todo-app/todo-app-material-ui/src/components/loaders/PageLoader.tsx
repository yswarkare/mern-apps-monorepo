import BlocksWave from './BlocksWave';

const PageLoader = () => {
	return (
		<div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
			<div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'blue' }}>
				<BlocksWave size='4rem' />
			</div>
		</div>
	);
};

export default PageLoader;

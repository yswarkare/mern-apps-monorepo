import BlocksWave from "./BlocksWave";

const PageLoader = () => {
	return (
		<div className='absolute top-0 left-0 h-screen w-full flex justify-center items-center text-blue-600'>
			<BlocksWave size='4rem' />
		</div>
	);
};

export default PageLoader;

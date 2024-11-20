function trial() {
	const rejectableValues = ['undefined', 'null', ''];
	for (const el of rejectableValues) {
		try {
			const val = JSON.parse(el);
			console.log(val);
		} catch (error) {
			console.log(error);
		}
	}
}

trial();

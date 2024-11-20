import { ChangeEventHandler, MouseEvent, MouseEventHandler, useState } from 'react';

// const InputIcon = ({ type }: { type: string }) => {
// 	switch (type) {
// 		case 'search':
// 			return <SearchIcon />;
// 		case 'email':
// 			return <EmailIcon />;
// 		case 'username':
// 			return <UserIcon />;
// 		case 'password':
// 			return <KeyIcon />;
// 		default:
// 			return null;
// 	}
// };

type Props = {
	value?: string | number;
	label?: string;
	type: string;
	position?: string;
	id?: string;
	onClick?: MouseEventHandler;
	onChange?: ChangeEventHandler<HTMLInputElement>;
	error?: string;
};

const InputUi = ({ value, label, type, position, id, onClick, onChange, error, ...props }: Props) => {
	const [inType, setInType] = useState(type);

	const inputTypes = ['text', 'email', 'password'];

	const changeIcon = (e: MouseEvent<HTMLDivElement>) => {
		if (onClick) onClick(e);
		if (type === 'password') {
			setInType(inType === 'password' ? 'text' : 'password');
		}
	};

	return (
		<div className="w-full gap-1 flex flex-col items-start">
			{label && <p className="w-full pl-2 text-left">{label}</p>}
			<label className={`w-full input input-bordered flex items-center gap-2 ${error && 'input-error'}`}>
				{position === 'left' && (
					<div className="tooltip tooltip-left" data-tip={label || type}>
						{/* <InputIcon type={type} /> */}
					</div>
				)}
				<input
					type={inputTypes.includes(type) ? inType : 'text'}
					title={id}
					id={id}
					className="grow"
					placeholder={type}
					onChange={onChange}
					{...props}
				/>
				{type === 'password' && (
					<div className="cursor-pointer tooltip tooltip-right" data-tip={inType === 'text' ? 'hide' : 'show'} onClick={(e) => changeIcon(e)}>
						{(inType === 'text' && ' ') || (inType === 'password' && ' ')}
					</div>
				)}
				{position === 'right' && (
					<div className="tooltip tooltip-left" data-tip={label || type}>
						{/* <InputIcon type={type} /> */}
						{value}
					</div>
				)}
			</label>
			{error && <p className="w-full pl-2 text-left error text-error text-sm">{error}</p>}
		</div>
	);
};

export default InputUi;

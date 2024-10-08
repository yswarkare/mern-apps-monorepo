import { useState } from 'react';
import { Box, Button, useMediaQuery, Typography, useTheme, TextField } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { setLogin } from '../../state/index';
import Dropzone from 'react-dropzone';
import FlexBetween from '../../components/FlexBetween';

const registerSchema = yup.object().shape({
	firstname: yup.string().required('required'),
	lastname: yup.string().required('required'),
	email: yup.string().email('invalid email').required('required'),
	password: yup.string().required('required'),
	location: yup.string().required('required'),
	occupation: yup.string().required('required'),
	picture: yup.string().required('required'),
});

const loginSchema = yup.object().shape({
	email: yup.string().email('invalid email').required('required'),
	password: yup.string().required('required'),
});

const initialValuesRegister = {
	firstname: '',
	lastname: '',
	email: '',
	password: '',
	location: '',
	occupation: '',
	picture: '',
};

const initialValuesLogin = {
	email: '',
	password: '',
};

const Form = () => {
	const [pageType, setPageType] = useState();
	const { palette } = useTheme();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isNonMobile = useMediaQuery('(min-width: 1000px)');
	const isLogin = pageType === 'login';
	const isRegister = pageType === 'register';

	const handleFormSubmit = async (values, onSubmitProps) => {};

	return (
		<Formik
			onSubmit={handleFormSubmit}
			initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
			validationSchema={isLogin ? loginSchema : registerSchema}
		>
			{({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, resetForm }) => (
				<Form onSubmit={handleSubmit}>
					<Box
						display='grid'
						gap='30px'
						gridTemplateColumns='repeat(4, minmax(0, 1fr))'
						sx={{
							'& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
						}}
					>
						{isRegister && (
							<>
								<TextField
									label='First Name'
									onBlur={handleBlur}
									value={values.firstname}
									name='firstname'
									error={Boolean(touched.firstname) && Boolean(errors.firstname)}
									helperText={touched.firstname && errors.firstname}
									sx={{ gridColumn: 'span 2' }}
								/>
								<TextField
									label='Last Name'
									onBlur={handleBlur}
									value={values.lastname}
									name='lastname'
									error={Boolean(touched.lastname) && Boolean(errors.lastname)}
									helperText={touched.lastname && errors.lastname}
									sx={{ gridColumn: 'span 2' }}
								/>
								<TextField
									label='Location'
									onBlur={handleBlur}
									value={values.location}
									name='location'
									error={Boolean(touched.location) && Boolean(errors.location)}
									helperText={touched.location && errors.location}
									sx={{ gridColumn: 'span 2' }}
								/>
								<TextField
									label='Occupation'
									onBlur={handleBlur}
									value={values.occupation}
									name='occupation'
									error={Boolean(touched.occupation) && Boolean(errors.occupation)}
									helperText={touched.occupation && errors.occupation}
									sx={{ gridColumn: 'span 2' }}
								/>
								<Box gridColumn='span-4' border={`1px solid ${palette.neutral.medium}`} borderRadius='5px' p='1rem'>
									<Dropzone
										acceptedFiles='.jpg,.jpeg,.png'
										multiple={false}
										onDrop={(acceptedFiles) => {
											setFieldValue('picture', acceptedFiles);
										}}
									>
										{({ getRootProps, getInputProps }) => (
											<Box
												{...getRootProps()}
												border={`2px dashed ${palette.primary.main}`}
												p='1rem'
												sx={{ '&:hover': { cursor: 'pointer' } }}
											>
												<input {...getInputProps()} />
												{!values.picture ? (
													<p>Add Picture Here</p>
												) : (
													<FlexBetween>
														<Typography>{values.picture.name}</Typography>
														<EditOutlinedIcon></EditOutlinedIcon>
													</FlexBetween>
												)}
											</Box>
										)}
									</Dropzone>
								</Box>
							</>
						)}
					</Box>
				</Form>
			)}
		</Formik>
	);
};

export default Form;

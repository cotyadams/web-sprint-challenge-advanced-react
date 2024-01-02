import * as yup from 'yup';

export const formSchema = yup.object().shape({
    x: yup
        .number()
        .required()
        .min(1, 'x value must be greater than or equal to 1')
        .max(3, 'x value must be smaller than or equal to 3'),
    y: yup
        .number()
        .required()
        .min(1, 'y value must be greater than or equal to 1')
        .max(3, 'y value must be smaller than or equal to 3'),
    steps: yup
        .number()
        .required()
        .min(0, 'move counter value must be greater than or equal to 0'),
    email: yup
        .string()
        .email('must have a valid email address')
        .required('email is required')
})
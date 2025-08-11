import {object, string, type InferType} from 'yup'


export const authenticationSchema = object({
  phone_number: string().min(11).required(),
  password: string().min(1).required(),
});

export type AuthenticationFormSchema = InferType<typeof authenticationSchema>
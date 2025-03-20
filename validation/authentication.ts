import {object, string, type InferType} from 'yup'


export const authenticationSchema = object({
  email: string().min(1).required(),
  password: string().min(1).required(),
});

export type AuthenticationFormSchema = InferType<typeof authenticationSchema>
import {object, string, number ,type InferType} from 'yup'


export const  patientSchema = object({
  name: string().min(3, "Name must be at least 3 characters").required("Name is required"),
  gender: string().min(1, "Gender is required").required("Gender is required"),
  age: number().min(1, "Age is required").required("Age is required"),
  profession: string().min(1, "Profession is required").required("Profession is required"),
  address: string().min(1, "Address is required").required("Address is required"),
  phone_number: string().min(10, "Phone number must be at least 10 characters").required("Phone number is required"),
});


export type PatientFormSchema = InferType<typeof patientSchema>;
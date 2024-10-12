import {z} from 'zod';

export const schemaSignIn = z.object({
    email: z.string({required_error: 'Email is required'}).email({message: 'Email address is not valid'}),
    password: z.string({required_error: 'Password is required'}).min(5, {message: 'Password should have min 5 character'}),
})

export const schemaCategory = z.object({
    name: z.string({required_error: 'Category is required'}).min(4,  {message: 'Name should have min 4 character'}),
})
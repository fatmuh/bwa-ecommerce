"use server"

import { schemaSignIn, schemaSignUp } from "@/lib/schema";
import { ActionResult } from "@/types";
import prisma from "../../../../../lib/prisma";
import bcrypt from 'bcrypt'
import {lucia} from "@/lib/auth";
import {cookies} from "next/headers";
import { redirect } from "next/navigation";

export async function signIn(
    _: unknown,
    formData: FormData,
): Promise<ActionResult> {

    const validate = schemaSignIn.safeParse({
            email: formData.get('email'),
            password: formData.get('password')
        }
    );

    if(!validate.success) {
        return {
            error: validate.error.errors[0].message,
        }
    }

    const existingUser = await prisma.user.findFirst({
       where: {
           email: validate.data.email,
           role: 'customer'
       }
    });

    if(!existingUser) {
        return {
            error: 'Email Not Found'
        }
    }

    const comparePassword = bcrypt.compareSync(validate.data.password, existingUser.password);

    if (!comparePassword) {
        return {
            error: 'Email / password wrong'
        }
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    )

    return redirect('/')
}

export async function signUp(
    _: unknown,
    formData: FormData,
): Promise<ActionResult> {

    const validate = schemaSignUp.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    });

    if (!validate.success) {
        return {
            error: validate.error.errors[0].message
        }
    }

    const hashPassword = bcrypt.hashSync(validate.data.password, 12);

    try {
        await prisma.user.create({
            data: {
                email: validate.data.email,
                name: validate.data.name,
                password: hashPassword,
                role: "customer"
            }
        })
    } catch (error) {
        console.log(error);
        return {
            error: "Failed to sign up"
        }
    }

    return redirect('/sign-in')
}
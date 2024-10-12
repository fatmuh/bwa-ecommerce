"use server"

import { schemaBrand } from "@/lib/schema";
import { ActionResult } from "@/types";
import { redirect } from "next/navigation";
import prisma from "../../../../../../../lib/prisma";
import { deleteFile, uploadFile } from "@/lib/supabase";

export async function postBrand(
    _: unknown,
    formData: FormData,
): Promise<ActionResult> {

    const validate = schemaBrand.safeParse({
        name: formData.get('name'),
        image: formData.get('image')
    })

    if (!validate.success) {
        return {
            error: validate.error.errors[0].message
        }
    }

    try {
        const fileName = await uploadFile(validate.data.image, 'brands')

        await prisma.brand.create({
            data: {
                name: validate.data.name,
                logo: fileName
            }
        })
    } catch (e) {
        console.log(e);
        return {
            error: 'Failed to insert data'
        };
    }

    return redirect('/dashboard/brands')
}

export async function updateBrand(
    _: unknown,
    formData: FormData,
    id: number
): Promise<ActionResult> {
    console.log(formData.get('name'));

    const fileUpload = formData.get('image') as File;
    const validate = schemaBrand.pick({ 'name': true }).safeParse({
        name: formData.get('name')
    })

    if (!validate.success) {
        return {
            error: validate.error.errors[0].message
        }
    }

    const brand = await prisma.brand.findFirst({
        where: {
            id: id
        },
        select: {
            logo: true
        }
    });

    let fileName = brand?.logo;
    if (fileUpload.size > 0) {
        fileName = await uploadFile(fileUpload, 'brands')
    }

    try {
        await prisma.brand.update({
            where: {
                id: id
            },
            data: {
                name: validate.data.name,
                logo: fileName
            }
        });
    } catch (e) {
        console.log(e);
        return {
            error: 'Failed to update data'
        };
    }

    return redirect("/dashboard/brands")
}

export async function deleteBrand(
    _: unknown,
    formData: FormData,
    id: number
): Promise<ActionResult> {

    const brand = await prisma.brand.findFirst({
        where: {
            id: id
        },
        select: {
            logo: true
        }
    });

    if (!brand) {
        return {
            error: 'Brand not found'
        }
    }

    try {
        deleteFile(brand.logo, 'brands')

        await prisma.brand.delete({
            where: {
                id: id
            }
        });
    } catch (e) {
        console.log(e);
        return {
            error: 'Failed to delete data'
        };
    }
    
    return redirect("/dashboard/brands")
}
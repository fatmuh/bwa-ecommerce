import prisma from "../../../../../../../lib/prisma";

export async function getBrands() {
    try {
        const brands = await prisma.brand.findMany({})
        return brands;
    } catch (e) {
        console.log(e);
        return [];
    }
}

export async function getBrandById(
    id: string
) {
    try {
        const brand = await prisma.brand.findFirst({
            where: {
                id: Number.parseInt(id)
            }
        });

        return brand;
    } catch (e) {
        console.log(e);
        return null
    }
}
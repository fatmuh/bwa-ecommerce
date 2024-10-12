import prisma from "../../../../../../../lib/prisma";

export async function getLocations() {
    try {
        const categories = await prisma.location.findMany({});
        return categories;
    } catch (e) {
        console.error(e);

        return [];
    }
}

export async function getLocationById(id: string) {
    try {
        const category = await prisma.location.findFirst({
            where: {
                id: Number.parseInt(id)
            }
        })

        return category;
    } catch (e) {
        console.error(e);
        return null
    }
}
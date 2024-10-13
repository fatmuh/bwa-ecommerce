import prisma from "../../../../../../../lib/prisma";
import { TColumn } from "../columns";

export async function getProducts() {
    try {
        const products = await prisma.product.findMany({
            orderBy: {
                name: "asc"
            },
            select: {
                id: true,
                _count: {
                    select: {
                        OrderProduct: true
                    }
                },
                name: true,
                created_at: true,
                price: true,
                stock: true,
                category: {
                    select: {
                        name: true
                    }
                },
                brand: {
                    select: {
                        name: true
                    }
                },
                location: {
                    select: {
                        name: true
                    }
                },
                images: true
            }
        });

        const response_products: TColumn[] = products.map((product) => {
            return {
                brand_name: product.brand.name,
                category_name: product.category.name,
                createdAt: product.created_at,
                image_url: product.images[0],
                id: product.id,
                name: product.name,
                price: Number(product.price),
                stock: product.stock,
                total_sales: product._count.OrderProduct
            }
        });

        return response_products;
    } catch (e) {
        console.log(e);
        return [];
    }
}

export async function getProductById(id: number) {
    try {
        const product = await prisma.product.findFirst({
            where: {
                id: id
            }
        });

        return product
    } catch (e) {
        console.log(e);
        return null
    }
}
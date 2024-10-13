import prisma from "../../../../../../../lib/prisma";
import { TColumn } from "../columns";

export async function getCustomers() {
    try {
        const customer = await prisma.user.findMany({
            where: {
                role: 'customer'
            },
            include: {
                _count: {
                    select: {
                        Order: true
                    }
                }
            }
        });

        const response: TColumn[] = customer.map((cust) => {
            return {
                id: cust.id,
                name: cust.name,
                email: cust.email,
                total_transaction: cust._count.Order
            }
        });

        return response
    } catch (error) {
        console.log(error);
        return [];
    }
}
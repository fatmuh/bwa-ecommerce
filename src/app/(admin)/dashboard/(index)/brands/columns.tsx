"use client";

import {ColumnDef} from "@tanstack/react-table";
import {Brand} from "@prisma/client";
import {Button} from "@/components/ui/button";
import {Edit} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getImageUrl } from "@/lib/supabase";
import FormDelete from "@/app/(admin)/dashboard/(index)/brands/_components/form-delete";

export const columns: ColumnDef<Brand>[] = [
    {
        accessorKey: "name",
        header: "Brand",
        cell: ({row}) => {
            const brand = row.original

            return (
                <div className="inline-flex items-center gap-5">
                    <Image src={getImageUrl(brand.logo)} alt="Product" width={80} height={80}></Image>
                    <span>{brand.name}</span>
                </div>
            )
        }
    },
    {
        id: "actions",
        cell: ({row}) => {
            const brand = row.original;

            return (
                <div className="space-x-4 inline-flex">
                    <Button size="sm" asChild>
                        <Link href={`/dashboard/brands/edit/${brand.id}`}>
                            <Edit className="w-4 h-4 mr-2" /> Edit
                        </Link>
                    </Button>
                    <FormDelete id={brand.id} />
                </div>
            )
        }
    }
]
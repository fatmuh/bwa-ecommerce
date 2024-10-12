import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {PlusCircle} from "lucide-react";
import {DataTable} from "@/components/ui/data-table";
import {columns} from "@/app/(admin)/dashboard/(index)/locations/columns";
import {getLocations} from "@/app/(admin)/dashboard/(index)/locations/lib/data";
import Link from "next/link";

export default async function CategoriesPage() {
    const data = await getLocations();

    return (
        <>
            <div className="space-y-4">
                <div className="text-right">
                    <Button size="sm" className="h-8 gap-1" asChild>
                        <Link href="/dashboard/locations/create">
                            <PlusCircle className="h-3.5 w-3.5"/>
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Add Location
                            </span>
                        </Link>
                    </Button>
                </div>
                <Card x-chunk="dashboard-06-chunk-0">
                    <CardHeader>
                        <CardTitle>Locations</CardTitle>
                        <CardDescription>
                            Manage your locations and view their sales performance.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DataTable columns={columns} data={data}/>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

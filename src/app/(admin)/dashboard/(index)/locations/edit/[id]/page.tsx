import React from 'react';
import {getLocationById} from "@/app/(admin)/dashboard/(index)/locations/lib/data";
import {redirect} from "next/navigation";
import FormLocation from "@/app/(admin)/dashboard/(index)/locations/_components/form-location";
import { Tedit } from '@/types';

export default async function EditPage({params}: Tedit) {
    const data = await getLocationById(params.id);

    if (!data) {
        return redirect('/dashboard/categories');
    }
    
    return <FormLocation type="EDIT" data={data} />
}
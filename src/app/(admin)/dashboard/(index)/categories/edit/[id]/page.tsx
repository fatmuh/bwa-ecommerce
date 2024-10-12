import React from 'react';
import {getCategoryById} from "@/app/(admin)/dashboard/(index)/categories/lib/data";
import {redirect} from "next/navigation";
import FormCategory from "@/app/(admin)/dashboard/(index)/categories/_components/form-category";
import { Tedit } from '@/types';

export default async function EditPage({params}: Tedit) {
    const data = await getCategoryById(params.id);

    if (!data) {
        return redirect('/dashboard/categories');
    }
    
    return <FormCategory type="EDIT" data={data} />
}
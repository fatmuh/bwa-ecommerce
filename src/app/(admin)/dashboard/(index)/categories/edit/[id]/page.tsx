import React from 'react';
import {getCategoryById} from "@/app/(admin)/dashboard/(index)/categories/lib/data";
import {redirect} from "next/navigation";
import FormCategory from "@/app/(admin)/dashboard/(index)/categories/_components/form-category";

type Tparams = {
    id: string;
}

interface EditPageProp {
    params: Tparams;
}

export default async function EditPage({params}: EditPageProp) {
    const data = await getCategoryById(params.id);

    if (!data) {
        return redirect('/dashboard/categories');
    }
    
    return <FormCategory type="EDIT" data={data} />
}
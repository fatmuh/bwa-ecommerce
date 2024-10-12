import React from 'react';
import {getLocationById} from "@/app/(admin)/dashboard/(index)/locations/lib/data";
import {redirect} from "next/navigation";
import FormLocation from "@/app/(admin)/dashboard/(index)/locations/_components/form-location";

type Tparams = {
    id: string;
}

interface EditPageProp {
    params: Tparams;
}

export default async function EditPage({params}: EditPageProp) {
    const data = await getLocationById(params.id);

    if (!data) {
        return redirect('/dashboard/categories');
    }
    
    return <FormLocation type="EDIT" data={data} />
}
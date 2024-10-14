import { getBrands } from '@/app/(admin)/dashboard/(index)/brands/lib/data'
import React from 'react'
import FilterCheckboxItem from './filter-checkbox-item';

export default async function FilterBrand() {
    const brands = await getBrands();

    return (

        <div className="flex flex-col gap-[14px]">
            <p className="font-semibold leading-[22px]">Brands</p>
            {brands.map((item) => (
                <FilterCheckboxItem type='brand' key={item.id + item.name} id={item.id.toString()} value={item.name} />
            ))}
        </div>
    )
}

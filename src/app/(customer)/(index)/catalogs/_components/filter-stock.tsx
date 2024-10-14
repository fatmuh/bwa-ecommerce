import React from 'react'
import FilterCheckboxItem from './filter-checkbox-item'

export default function FilterStock() {
    return (
        <div className="flex flex-col gap-[14px]">
            <p className="font-semibold leading-[22px]">Stocks</p>
            <FilterCheckboxItem type='stock' id={'ready'} value='Ready' />
            <FilterCheckboxItem type='stock' id={'preorder'} value='Pre-order' />
        </div>
    )
}

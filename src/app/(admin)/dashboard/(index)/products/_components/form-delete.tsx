"use client";

import React from 'react';
import {Trash} from "lucide-react";
import {Button} from "@/components/ui/button";
import {ActionResult} from "@/types";
import {useFormState, useFormStatus} from "react-dom";
import { deleteProduct } from '../lib/action';

const initialSate: ActionResult = {
    error: ''
}

interface FormDeleteProps {
    id: number
}

function SubmitButton() {
    const {pending} = useFormStatus();

    return (
        <Button type="submit" size="sm" variant="destructive" disabled={pending}>
            <Trash className="w-4 h-4 mr-2" /> {pending ? "Loading..." : "Delete"}
        </Button>
    )
}

export default function FormDelete({id}: FormDeleteProps) {
    const deleteProductWithId = (_: unknown, formData: FormData) => deleteProduct(_, formData, id)
    const [state, formAction] = useFormState(deleteProductWithId, initialSate)

    return (
        <form action={formAction}>
            <SubmitButton />
        </form>
    )
}
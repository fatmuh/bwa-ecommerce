import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getImageUrl } from '@/lib/supabase';
import { Upload } from 'lucide-react'
import Image from 'next/image'
import React, { ChangeEvent, useRef } from 'react'

export default function UploadImage({images}: {images: any}) {
    const ref = useRef<HTMLInputElement>(null);
    const thumbnailRef = useRef<HTMLImageElement>(null);
    const imageFirstRef = useRef<HTMLImageElement>(null);
    const imageSecondRef = useRef<HTMLImageElement>(null);

    const openFolder = () => {
        if (ref.current) {
            ref.current.click()
        }
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!thumbnailRef.current || !imageFirstRef.current || !imageSecondRef.current) {
            return;
        }

        if (e.target.files && e.target.files.length >= 3) {
            thumbnailRef.current.src = URL.createObjectURL(e.target.files[0]);
            imageFirstRef.current.src = URL.createObjectURL(e.target.files[1]);
            imageSecondRef.current.src = URL.createObjectURL(e.target.files[2]);
        }
    }

    const defaultThumbnail = images?.[0] ? getImageUrl(images[0], 'products') : '/placeholder.svg';
    const defaultImageFirst = images?.[1] ? getImageUrl(images[1], 'products') : '/placeholder.svg';
    const defaultImageSecond = images?.[2] ? getImageUrl(images[2], 'products') : '/placeholder.svg';

    return (
        <Card
            className="overflow-hidden" x-chunk="dashboard-07-chunk-4"
        >
            <CardHeader>
                <CardTitle>Product Images</CardTitle>
                <CardDescription>
                    Lipsum dolor sit amet, consectetur adipiscing elit
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-2">
                    <img
                        alt="Product image"
                        className="aspect-square w-full rounded-md object-cover"
                        height="300"
                        width="300"
                        ref={thumbnailRef}
                        src={defaultThumbnail}
                    />
                    <div className="grid grid-cols-3 gap-2">
                        <button>
                            <img
                                alt="Product image"
                                className="aspect-square w-full rounded-md object-cover"
                                height="84"
                                width="84"
                                ref={imageFirstRef}
                                src={defaultImageFirst}
                            />
                        </button>
                        <button>
                            <img
                                alt="Product image"
                                className="aspect-square w-full rounded-md object-cover"
                                height="84"
                                width="84"
                                ref={imageSecondRef}
                                src={defaultImageSecond}
                            />
                        </button>
                        <button type='button' onClick={openFolder} className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                            <Upload className="h-4 w-4 text-muted-foreground" />
                            <span className="sr-only">Upload</span>
                        </button>
                        <input ref={ref} onChange={onChange} type="file" name="images" className="hidden" accept='images/*' multiple />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

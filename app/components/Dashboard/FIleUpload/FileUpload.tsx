'use client';
import React from "react";

type FileUploadProps = {
    slug: string;
    type: 'icon' | 'image';
    accept: string;
    onUploaded: (url: string) => void;
};

export default function FileUpload({ slug, type, accept, onUploaded }: FileUploadProps) {
    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if(!file) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('slug', slug);
        formData.append('type', type);

        const response = await fetch('/api/fileUpload', {
            method: 'POST',
            body: formData
        });

        console.log('Upload response status:', response.status);

        if(response.ok) {
            const data = await response.json();
            console.log('Upload success:', data);
            onUploaded(data.url);
        } else {
            const errText = await response.text();
            console.error('Upload error:', errText);
        }
    }

    return <input type="file" accept={accept} onChange={handleFileChange} />;
}
'use client';
import { useState } from "react";

type AddRoomFormProps = {
    onRoomAdded: () => void;
    onCancel: () => void;
};

export default function AddRoomForm({ onRoomAdded, onCancel }: AddRoomFormProps) {
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [summary, setSummary] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const [features, setFeatures] = useState<{ icon: string; label: string}[]>([]);
    const [images, setImages] = useState<{ path: string }[]>([]);

    function addFeature() {
        setFeatures([...features, { icon:'', label: ''}]);
    }

    function updateFeature(index: number, field: 'icon' | 'label', value: string) {
        const copy = [...features];
        copy[index][field] = value;
        setFeatures(copy);
    }

    function addImage() {
        setImages([...images, { path: '' }]);
    }

    function updateImage(index: number, value: string) {
        const copy = [...images];
        copy[index].path = value;
        setImages(copy);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const responce = await fetch('/api/rooms/list', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title,
                slug,
                summary,
                description,
                price: Number(price),
                features,
                images,
            }),
        });

        if (responce.ok) {
            onRoomAdded();
        } else {
            console.error('Ошибка при добавлении номера')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Добавить номер</h2>

            <input type="text" placeholder="Название" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder="Символьный код" value={slug} onChange={(e) => setSlug(e.target.value)} />
            <textarea placeholder="Краткое описание" value={summary} onChange={(e) => setSummary(e.target.value)} /> 
            <input type="number" placeholder="Цена" value={price} onChange={(e) => setPrice(e.target.value)} />       
            
            <div>
                <h3>Особенности</h3>
                {features.map((feature, index) => (
                    <div key={index}>
                        <input type="text" placeholder="Иконка" value={feature.icon} onChange={(e) => updateFeature(index, 'icon', e.target.value)} />
                        <input type="text" placeholder="Название" value={feature.label} onChange={(e) => updateFeature(index, 'label', e.target.value)} />
                    </div>
                ))}
                <button type="button" onClick={addFeature}>
                    + Добавить особенность
                </button>
            </div>

            <div>
                <h3>Фото номера</h3>
                {images.map((image, index) => (
                    <div key={index}>
                        <input type="text" placeholder="Путь к фото" value={image.path} onChange={(e) => updateImage(index, e.target.value)} />
                    </div>
                ))}
                <button type="button" onClick={addImage}>
                    + Добавить фото
                </button>
            </div>

            <div>
                <button type="submit">Сохранить</button>
                <button type="button" onClick={onCancel}>Отменить</button>
            </div>
        </form>
    )
}
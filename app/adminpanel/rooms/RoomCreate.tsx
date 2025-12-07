"use client";

import { transliterate } from "@/lib/utils/transliterate";
import { 
    Create, 
    SimpleForm, 
    TextInput, 
    NumberInput, 
    ArrayInput, 
    SimpleFormIterator, 
    FileInput, 
    FileField, 
    ImageInput, 
    ImageField 
} from "react-admin";


const uploadFile = async (file: File, slug: string, type: 'icon' | 'image') => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("slug", slug);
    formData.append("type", type);

    const res = await fetch("/api/fileUpload", { method: "POST", body: formData });
    
    if (!res.ok) {
         const errorData = await res.json().catch(() => ({ error: res.statusText }));
         throw new Error(`Ошибка загрузки ${type}: ${errorData.error || 'Неизвестная ошибка сервера'}`);
    }
    
    const data = await res.json();
    return data.url;
};

export const RoomCreate = () => {
    const handleSubmit = async (values: any) => {
        try {
            const rawSlug = transliterate(values.title || '');
            const slug = rawSlug.length > 0 ? rawSlug : `temp-${Date.now()}`; 
            
            const features = await Promise.all(
                (values.features || []).map(async (f: any) => {
                    const file = f.newIcon?.rawFile;
                    if (file instanceof File) {
                        try {
                            const url = await uploadFile(file, slug, "icon");
                            return { icon: url, label: f.label };
                        } catch (err) {
                            throw err; 
                        }
                    }
                    return { icon: "", label: f.label };
                })
            );

            const images = await Promise.all(
                (values.images || []).map(async (img: any) => {
                    const file = img.newImage?.rawFile;
                    if (file instanceof File) {
                        try {
                            const url = await uploadFile(file, slug, "image");
                            return { path: url };
                        } catch (err) {
                            throw err; 
                        }
                    }
                    return { path: "" };
                })
            );

            const res = await fetch("/api/rooms", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...values, slug, features, images }), 
            });

            const result = await res.json();
            if (res.ok) {
                alert("Комната успешно создана!");
            } else {
                alert(`Ошибка сохранения комнаты: ${result.error || res.statusText}`);
            }
        } catch (err) {
            console.error("Failed to create room:", err);
            alert(err instanceof Error ? `Не удалось создать комнату: ${err.message}` : "Общая ошибка при создании комнаты");
        }
    };

    return (
        <Create resource="rooms" title="Добавить номер">
            <SimpleForm onSubmit={handleSubmit}>
                <TextInput source="title" label="Название" required /> 
                
                <TextInput source="summary" label="Краткое описание" />
                <TextInput source="description" label="Описание" />
                <NumberInput source="price" label="Цена" />

                <ArrayInput source="features" label="Особенности">
                    <SimpleFormIterator>
                        <TextInput source="label" label="Описание" />
                        <FileInput 
                            source="newIcon" 
                            label="Иконка" 
                            accept={{ 'image/*': ['.png', '.svg'] }}
                        >
                            <FileField source="src" title="title" />
                        </FileInput>
                    </SimpleFormIterator>
                </ArrayInput>

                <ArrayInput source="images" label="Изображения">
                    <SimpleFormIterator>
                        <ImageInput 
                            source="newImage" 
                            label="Изображение" 
                            accept={{ 'image/*': ['.jpeg', '.webp'] }}
                        >
                            <ImageField source="src" title="title" />
                        </ImageInput>
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Create>
    );
};
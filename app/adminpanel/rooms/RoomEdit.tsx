"use client";

import { 
  Edit, 
  SimpleForm, 
  TextInput, 
  NumberInput, 
  ArrayInput, 
  SimpleFormIterator, 
  FileInput, 
  FileField, 
  ImageInput, 
  ImageField,
  UrlField 
} from "react-admin";

export const RoomEdit = () => {
  const handleEditSubmit = async (values: any) => {
    try {
      const slug = values.title.replace(/\s+/g, "-").toLowerCase();

      const features = await Promise.all(
        (values.features || []).map(async (f: any) => {
          const newFile = f.newIcon?.rawFile;

          if (newFile instanceof File) {
            const formData = new FormData();
            formData.append("file", newFile);
            formData.append("slug", slug);
            formData.append("type", "icon");

            const res = await fetch("/api/fileUpload", { method: "POST", body: formData });
            const data = await res.json();
            return { icon: data.url, label: f.label };
          }
          return { icon: f.icon, label: f.label };
        })
      );

      const images = await Promise.all(
        (values.images || []).map(async (img: any) => {
          const newFile = img.newImage?.rawFile;

          if (newFile instanceof File) {
            const formData = new FormData();
            formData.append("file", newFile);
            formData.append("slug", slug);
            formData.append("type", "image");

            const res = await fetch("/api/fileUpload", { method: "POST", body: formData });
            const data = await res.json();
            return { path: data.url };
          }
          return { path: img.path };
        })
      );

      const res = await fetch(`/api/rooms/${values.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, features, images }),
      });

      const result = await res.json();
      if (res.ok) {
        alert("Комната успешно обновлена!");
      } else {
        alert(result.error);
      }
    } catch (err) {
      console.error(err);
      alert("Ошибка при редактировании комнаты");
    }
  };

  return (
    <Edit resource="rooms" title="Редактирование номера">
      <SimpleForm onSubmit={handleEditSubmit}>
        <TextInput source="title" label="Название" />
        <TextInput source="summary" label="Краткое описание" />
        <TextInput source="description" label="Описание" />
        <NumberInput source="price" label="Цена" />

        <ArrayInput source="features" label="Особенности">
          <SimpleFormIterator>
            <TextInput source="label" label="Описание" />
            <ImageField source="icon" label="Текущее изображение" sx={{ '& img': { maxWidth: 50, objectFit: 'contain' } }} />
            <FileInput 
              source="newIcon" 
              label="Загрузить новую иконку" 
              accept={{ 'image/*': ['.png', '.svg'] }}
            >
              <FileField source="src" title="title" />
            </FileInput>
          </SimpleFormIterator>
        </ArrayInput>

        <ArrayInput source="images" label="Изображения">
          <SimpleFormIterator>
            <ImageField source="path" label="Текущее изображение" sx={{ '& img': { maxWidth: 200, objectFit: 'contain' } }} />
            <ImageInput 
              source="newImage" 
              label="Загрузить новое изображение" 
              accept={{ 'image/*': ['.jpeg', '.webp'] }}
            >
              <ImageField source="src" title="title" />
            </ImageInput>
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Edit>
  );
};
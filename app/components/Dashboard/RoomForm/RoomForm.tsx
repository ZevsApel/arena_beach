'use client';
import React, { useState, useEffect } from 'react';
import { transliterate } from '@/lib/utils/transliterate';
import FileUpload from '../FIleUpload/FileUpload';
import Image from 'next/image';

type RoomFormProps = {
  onRoomSaved: () => void;
  onCancel: () => void;
  room?: any; // данные комнаты для редактирования
};

export default function RoomForm({ onRoomSaved, onCancel, room }: RoomFormProps) {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const [features, setFeatures] = useState<{ id?: number; icon: string; label: string }[]>([]);
  const [images, setImages] = useState<{ id?: number; path: string }[]>([]);

  // Инициализация для редактирования
  useEffect(() => {
    if (room) {
      setTitle(room.title);
      setSlug(room.slug);
      setSummary(room.summary || '');
      setDescription(room.description || '');
      setPrice(room.price.toString());
      setFeatures(room.features.map((f: any) => ({ id: f.id, icon: f.icon, label: f.label })));
      setImages(room.images.map((i: any) => ({ id: i.id, path: i.path })));
    }
  }, [room]);

  function addFeature() {
    setFeatures([...features, { icon: '', label: '' }]);
  }

  function updateFeature(index: number, field: 'icon' | 'label', value: string) {
    const copy = [...features];
    copy[index][field] = value;
    setFeatures(copy);
  }

  function removeFeature(index: number) {
    const copy = [...features];
    copy.splice(index, 1);
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

  function removeImage(index: number) {
    const copy = [...images];
    copy.splice(index, 1);
    setImages(copy);
  }

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!room) setSlug(transliterate(newTitle));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const method = room ? 'PUT' : 'POST';
    const url = room ? `/api/rooms/${room.slug}` : '/api/rooms/list';

    const response = await fetch(url, {
      method,
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

    if (response.ok) {
      onRoomSaved();
    } else {
      console.error('Ошибка при сохранении номера');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="room-form">
      <input type="text" placeholder="Название" value={title} onChange={handleTitleChange} />
      <input type="text" placeholder="Символьный код" value={slug} readOnly />
      <textarea
        placeholder="Краткое описание"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <textarea
        placeholder="Полное описание"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Цена"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <div className="features-section">
        <h3>Особенности</h3>
        {features.map((feature, index) => (
          <div key={index} className="feature-item">
            <input
              type="text"
              placeholder="Название"
              value={feature.label}
              onChange={(e) => updateFeature(index, 'label', e.target.value)}
            />
            <FileUpload
              slug={slug}
              type="icon"
              accept="image/svg+xml,image/png"
              onUploaded={(url) => updateFeature(index, 'icon', url)}
            />
            {feature.icon && <Image src={feature.icon} alt="icon preview" width={30} height={30} />}
            <button type="button" onClick={() => removeFeature(index)}>
              Удалить
            </button>
          </div>
        ))}
        <button type="button" onClick={addFeature}>
          + Добавить особенность
        </button>
      </div>

      <div className="images-section">
        <h3>Фото номера</h3>
        {images.map((image, index) => (
          <div key={index} className="image-item">
            <FileUpload
              slug={slug}
              type="image"
              accept="image/jpeg,image/webp"
              onUploaded={(url) => updateImage(index, url)}
            />
            {image.path && <Image src={image.path} alt="preview" width={80} height={80} />}
            <button type="button" onClick={() => removeImage(index)}>
              Удалить
            </button>
          </div>
        ))}
        <button type="button" onClick={addImage}>
          + Добавить фото
        </button>
      </div>

      <div className="form-actions">
        <button type="submit">Сохранить</button>
        <button type="button" onClick={onCancel}>
          Отменить
        </button>
      </div>
    </form>
  );
}

"use client";

import { List, Datagrid, TextField, NumberField, EditButton, DeleteButton } from "react-admin";

export const RoomList = () => (
  <List resource="rooms" title="Номера" perPage={10}>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="title" label="Название" />
      <TextField source="slug" label="Символьный код" />
      <NumberField source="price" label="Цена" />
      <EditButton label="Редактировать" />
      <DeleteButton label="Удалить" mutationMode="pessimistic" />
    </Datagrid>
  </List>
);
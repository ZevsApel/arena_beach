import { Admin, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import polyglotI18nProvider from "ra-i18n-polyglot";
import russianMessages from "ra-language-russian";

import LoginPage from "./LoginPage";
import { authProvider } from "./authProvider";

import { RoomList } from "./rooms/RoomList";
import { RoomEdit } from "./rooms/RoomEdit";
import { RoomCreate } from "./rooms/RoomCreate";

const i18nProvider = polyglotI18nProvider(() => russianMessages, "ru");
const dataProvider = simpleRestProvider("/api");

export default function AdminPanelInner() {
  return (
    <Admin
      authProvider={authProvider}
      loginPage={LoginPage}
      dataProvider={dataProvider}
      i18nProvider={i18nProvider}
    >
      <Resource name="rooms" list={RoomList} edit={RoomEdit} create={RoomCreate} />
    </Admin>
  );
}

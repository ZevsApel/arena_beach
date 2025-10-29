'use client';

import { Provider } from 'react-redux';
import { store } from '@/lib/redux/slice';
import Header from './components/Header/Header';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <Header></Header>
        <Provider store={store}>
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}

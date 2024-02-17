// 'use client';
// import { useRef } from 'react';
// import { Provider } from 'react-redux';
// import { AppStore, makeStore } from './store';
// import { PersistGate } from 'redux-persist/integration/react';

// export default function StoreProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { store, persistor } = makeStore();
//   // const storeRef = useRef(store);
//   const storeRef = useRef<AppStore>({ store, persistor });

//   return<Provider store={storeRef.current}><PersistGate loading={null} persistor={persistor}> {children}</PersistGate></Provider>;
// }
import React from 'react';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { AppStore, makeStore } from './store';
import { PersistGate } from 'redux-persist/integration/react';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { store, persistor } = makeStore();
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = { store, persistor };
  }

  return (
    <Provider store={storeRef.current!.store}>
      <PersistGate loading={null} persistor={storeRef.current!.persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}


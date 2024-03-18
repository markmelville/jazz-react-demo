import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { WithJazz, DemoAuth, ReactAuthHook } from 'jazz-react';
import { LocalNode } from 'cojson';
import './index.css'

const ephemeralAuth: ReactAuthHook = () => ({
  auth: {
    async createNode(_, peers, migration) {
      const { node } = await LocalNode.withNewlyCreatedAccount({
        name: 'ephemeral',
        peers,
        migration
      });
      return node;
    }
  },
  AuthUI: <></>
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WithJazz auth={DemoAuth({ appName: 'My App' })} syncAddress="ws://localhost:4200">
      <App />
    </WithJazz>
  </React.StrictMode>,
)

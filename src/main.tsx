import React from "react";
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Account, CoMap, Profile, co, Me } from "jazz-tools";
import { LocalNode, RawControlledAccount } from "cojson";
import { JazzReact, DemoAuth, ReactAuthHook } from "jazz-react";
import './index.css'

/** The account root is an app-specific per-user private `CoMap`
 *  where you can store top-level objects for that user */
class CustomAccountRoot extends CoMap<CustomAccountRoot> {
  //projects = co.ref(ListOfProjects);
}
class CustomAccount extends Account<CustomAccount> {
  profile = co.ref(Profile);
  root = co.ref(CustomAccountRoot);

  /** The account migration is run on account creation and on every log-in.
   *  You can use it to set up the account root and any other initial CoValues you need.
   */
  migrate = () => {
      if (!this._refs.root) {
          this.root = new CustomAccountRoot(
              {
                  //projects: new ListOfProjects([], { owner: this }),
              },
              { owner: this }
          );
      }
  };
}

const auth = DemoAuth({ appName: "My App" }); //, accountSchema: CustomAccount
const ephemeralAuth: ReactAuthHook<Account> = () => ({
  auth: {
    async createOrLoadAccount(_, initialPeers) {
      const { node } = await LocalNode.withNewlyCreatedAccount({
        name: 'ephemeral',
      });
      for (const peer of initialPeers) {
        //node.syncManager.addPeer(peer);
      }
      return Account.fromRaw(
        node.account as RawControlledAccount
      ) as Account & Me;
    }
  },
  AuthUI: <></>
});
const Jazz = JazzReact({
  auth,
  //apiKey: import.meta.env.VITE_JAZZ_KEY, // can use "PasskeyAuth?"
});
export const { useAccount, useCoState, useAcceptInvite } = Jazz;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Jazz.Provider syncAddress="ws://localhost:4200">
      <App/>
    </Jazz.Provider>
  </React.StrictMode>
);
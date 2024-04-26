import { ID, CoMap, co } from "jazz-tools";
import { useAccount, useCoState } from './main.tsx';
import './App.css'

export class SystemSummary extends CoMap<SystemSummary> {
  prop1 = co.string;
  prop2 = co.string;
}

function App() {
  const { me, logOut } = useAccount();

  return (
    <>
      <h1>All That Jazz</h1>
      <button onClick={logOut}>Log Out</button>
      <DocViewer docId={"co_zTkmq9s27mxqrKbSEKU8sgSqczr" as ID<SystemSummary>} />
      {/* sealer_ key_ */}
    </>
  )
}

export default App

export function DocViewer(props: { docId: ID<SystemSummary> }) {
  const summary = useCoState(SystemSummary, props.docId);
 
  return summary ? <div>
    {
      Object.entries(summary).map(([id,msg]) => (
        <p key={id}>
            {id}: {String(msg)}
        </p>
      ))
    }
  </div> : <div>Loading...</div>;
}

import { useJazz, useAutoSub } from 'jazz-react'
import { CoMap } from 'cojson';
import './App.css'

function App() {
  const { me, logOut } = useJazz()
  console.log(me)

  return (
    <>
      <h1>All That Jazz</h1>
      <button onClick={logOut}>Log Out</button>

      <DocViewer docId={"co_z7qjZ8cmqH6womwRe24H8CJzisC" as CoMap["id"]} />
    </>
  )
}

export default App

export function DocViewer(props: { docId: CoMap['id'] }) {
  const root = useAutoSub(props.docId);
  console.log(root)
 
  return root ? <div>
    {
      Object.entries(root).map(([id,msg]) => (
        <p key={id}>
            {id} {msg?.toString()}
        </p>
      ))
    }
  </div> : <div>Loading...</div>;
}

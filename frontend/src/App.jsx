import { useState } from "react"
import Input from "./components/input"

function App() {

  const [name, setName] = useState('');

  return (
    <div>
      <div className="text-xl p-3">Home Page!</div>
      <div className="p-3 w-[30rem]">
        <Input
          name="name"
          label="label"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
    </div>
  )
}

export default App

import { useState } from "react"

import Input from "@/components/input"
import Button from "@/components/button";

function App() {

  const [name, setName] = useState('');

  return (
    <div>
      <div className="text-xl p-3">Home Page!</div>
      <div className="space-y-5 p-5 w-[30rem]">
        <div>
          <Input
            name="name"
            label="label"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <Button
            onClick={() => console.log('hello')}
          />
        </div>
      </div>
    </div>
  )
}

export default App

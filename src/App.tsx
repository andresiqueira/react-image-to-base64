import { useState } from 'react'
import './App.css'
import { InputFile } from './InputFile'

function App() {
  const [image, setImage] = useState<string>('')
  console.log('state', image)
  return (
    <div className="App">
      <InputFile width={300} height={200} setImage={setImage} />
    </div>
  )
}

export default App

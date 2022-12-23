import { useState } from 'react'
import './App.css'

export const ConvertImage = (image: Blob, callback: (data: string) => void) => {
  const reader = new FileReader()

  reader.onload = () => {
    reader.result
      ? callback(reader.result.toString().replace(/^data:(.*,)?/, ""))
      : false
  }
  reader.onerror = function (error) {
    console.log(error)
  }

  reader.readAsDataURL(image)
}


function App() {
  const [image, setImage] = useState<Blob | null>(null)

  const handleImage = (e: any) => {
    setImage(e.target.files[0])
  }

  image !== null
    ? ConvertImage(image, (data) => {
      const json = {
        image: {
          data
        }
      }
      console.log('callback result', json)
    })
    : false

  return (
    <div className="App">
      <div>
        <input type="file" name="file" onChange={handleImage} />
      </div>
    </div>
  )
}

export default App

import { useState, ChangeEvent } from 'react'

interface InputFileProps {
  width?: number
  height?: number
}

const convertBase64toImage = (source: string, width: number, height: number, callback: (data: string) => void) => {
  const image = new Image(width, height)

  image.crossOrigin = 'Anonymous'
  image.alt = ''

  image.onload = () => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.height = image.height
    canvas.width = image.width
    context?.drawImage(image, 0, 0, image.width, image.height)
    const dataURL = canvas.toDataURL('image/jpeg')
    callback(dataURL)
  }

  image.src = source
}

export const ConvertImageToBase64 = (source: Blob, callback: (data: string) => void) => {
  const reader = new FileReader()

  reader.onload = () => {
    reader.result
      ? callback(reader.result.toString())
      : false
  }

  reader.onerror = function (error) {
    console.log(error)
  }

  reader.readAsDataURL(source)
}

export const InputFile = ({ width = 300, height = 200 }: InputFileProps) => {
  const [image, setImage] = useState<Blob | null>(null)

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files![0])
  }

  image !== null
    ? ConvertImageToBase64(image, (data) => {
      convertBase64toImage(data, width, height, (data) => {
        console.log(data.toString())
      })
    })
    : false

  return (
    <div>
      <input type="file" name="file" onChange={handleImage} />
    </div>
  )
}
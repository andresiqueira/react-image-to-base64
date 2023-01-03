import { ChangeEvent, Dispatch, SetStateAction } from 'react'

interface InputFileProps {
  width?: number
  height?: number
  setImage: Dispatch<SetStateAction<string>>
}

const test = (data: any) => {
  data.replace("data:image/png;base64,", "base:")
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

export const convertImageToBase64 = (source: Blob, callback: (data: string) => void) => {
  const reader = new FileReader()

  reader.onload = () => {
    return reader.result
      ? callback(reader.result.toString())
      : false
  }

  reader.onerror = function (error) {
    console.log(error)
  }

  reader.readAsDataURL(source)
}

export const InputFile = ({ width = 300, height = 200, setImage, ...rest }: InputFileProps) => {

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.files![0] !== null
    ? convertImageToBase64(e.target.files![0], (data) => {
      convertBase64toImage(data, width, height, (data) => {
        return setImage(data.toString())
      })
    })
    : false
  }

  return (
    <div>
      <input type="file" value='' name="file" onChange={handleImage} {...rest}/>
    </div>
  )
}
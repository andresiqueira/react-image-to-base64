import { ChangeEvent, Dispatch, SetStateAction } from 'react'

interface InputFileProps {
  image: string
  width?: number
  height?: number
  setImage: Dispatch<SetStateAction<string>>
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

export const InputFile = ({ width = 300, height = 200, image, setImage, ...rest }: InputFileProps) => {

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.files![0] !== null
      ? convertImageToBase64(e.target.files![0], (data) => {
        convertBase64toImage(data, width, height, (data) => {
          setImage((prevState) => data ? JSON.stringify({ base: data.split(",")[1].toString() }) : prevState)
        })
      })
      : false
  }

  return (
    <div>
      
      {
        image &&
        (
          JSON.parse(image).base
            ? (<img src={`data:image/jpeg;base64, ${JSON.parse(image).base}`} alt='' width={150} height={75} style={{ marginRight: "20px" }} />)
            : (<img src={JSON.parse(image).url} alt='' width={150} height={75} style={{ marginRight: "20px" }} />)
        )
      }

      <input type="file" value='' name="file" onChange={handleImage} {...rest} />
    </div>
  )
}
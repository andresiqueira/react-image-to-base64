import { ChangeEvent } from 'react'
import { useController, Control } from "react-hook-form";

export interface InputFileProps {
  image: string
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

export const InputFileRHF = ({ control, width, height }: { control: Control<InputFileProps>, width: number, height: number }) => {
  const { field } = useController({
    control,
    name: 'image',
  })

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.files![0] !== null
      ? convertImageToBase64(e.target.files![0], (data) => {
        convertBase64toImage(data, width, height, (data) => {
          return field.onChange(data.split(",")[1].toString())
        })
      })
      : false
  }

  return (
    <div>
      <input
        type='file'
        ref={field.ref}
        onChange={(e) => { 
          handleImage(e)
        }}
        onBlur={field.onBlur}
      />
    </div>
  )
}
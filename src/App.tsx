import './App.css'
import { useForm } from "react-hook-form";
import { InputFileRHF } from './InputFileRHF';

function App() {
  const { register, control, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = (data: any) => console.log('hook context data', data);

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputFileRHF width={300} height={200} name='image' control={control} />
        <button type='submit'>ENVIAR</button>
      </form>
    </div>
  )
}

export default App

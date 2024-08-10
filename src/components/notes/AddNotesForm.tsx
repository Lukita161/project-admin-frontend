import { NoteFormData } from "@/types/index"
import { useForm } from "react-hook-form"
import { ErrorMessage } from "../ErrorMessage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createNote } from "@/Api/NoteApi"
import { toast } from "react-toastify"
import { useLocation, useParams } from "react-router-dom"

export const AddNotesForm = ()=> {
    const params = useParams()
    const projectId = params.projectId!

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('viewTask')!

    const initialValues: NoteFormData = {
        content: ''
    }
    const { register, handleSubmit, reset ,formState: {errors} } = useForm({defaultValues: initialValues})

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: createNote,
        onError:(error)=> {
            toast.error(error.message)
        },
        onSuccess:(data) => {
            queryClient.invalidateQueries({queryKey: ['task', taskId]})
            reset()
            toast.success(data)
        }
    })

    const handleAddNote = (formData: NoteFormData) => {
        const data = {projectId, taskId, formData}
        mutate(data)
    }
    return (
        <>
            <form
            className="space-y-5"
            onSubmit={handleSubmit(handleAddNote)}
            noValidate
            >
                <div className="flex flex-col">
                    <label htmlFor="content">Crear nota: </label>
                    <input 
                        className="p-2 w-full border border-gray-300" type="text" id="content" placeholder="Comience a escribir una nota"
                        {...register('content', {required: 'El contenido de la nota es obligatorio'})}
                        />
                        {errors.content && <ErrorMessage>{errors.content.message}</ErrorMessage>}
                    <input type="submit" value="Enviar nota" />
                </div>
            </form>
        </>
    )
}
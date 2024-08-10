import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Project, ProjectFormData } from "@/types/index"
import { ErrorMessage } from "../ErrorMessage"
import { updateProject } from "@/Api/ProjectApi"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

type EditProjectFormProps = {
    data: ProjectFormData,
    projectId: Project['_id']
}

export const EditProjectForm = ({ data, projectId }: EditProjectFormProps)=> {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: {errors} } = useForm({defaultValues: {
        projectName: data.projectName,
        clientName: data.clientName,
        description: data.description
    }})

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: updateProject,
        onError: (error)=> {
            toast.error(error.message)
        },
        onSuccess: (data)=> {
            queryClient.invalidateQueries({queryKey: ['projects']})
            queryClient.invalidateQueries({queryKey: ['editProjects']})
            toast.success(data)
            navigate('/')
        }
    })

    const handleForm = (formData: ProjectFormData)=> {
        const data = {
            formData,
            projectId
        }
        mutate(data)
    }

    return (
        <form onSubmit={handleSubmit(handleForm)}>
            <div className="mb-5 space-y-3">
                <label htmlFor="projectName" className="text-sm uppercase font-bold">
                    Nombre del Proyecto
                </label>
                <input
                    id="projectName"
                    className="w-full p-3  border border-gray-200"
                    type="text"
                    placeholder="Nombre del Proyecto"
                    {...register("projectName", {
                        required: "El Titulo del Proyecto es obligatorio",
                    })}
                />

                {errors.projectName && (
                    <ErrorMessage>{errors.projectName.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="clientName" className="text-sm uppercase font-bold">
                    Nombre Cliente
                </label>
                <input
                    id="clientName"
                    className="w-full p-3  border border-gray-200"
                    type="text"
                    placeholder="Nombre del Cliente"
                    {...register("clientName", {
                        required: "El Nombre del Cliente es obligatorio",
                    })}
                />

                {errors.clientName && (
                    <ErrorMessage>{errors.clientName.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="description" className="text-sm uppercase font-bold">
                    Descripción
                </label>
                <textarea
                    id="description"
                    className="w-full p-3  border border-gray-200"
                    placeholder="Descripción del Proyecto"
                    {...register("description", {
                        required: "Una descripción del proyecto es obligatoria"
                    })}
                />

                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
                <input type="submit" value="Crear projecto" />
            </div>
        </form>
    )
}
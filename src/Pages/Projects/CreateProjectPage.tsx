import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import ProjectForm from "@/components/projects/ProjectForm"
import { ProjectFormData } from "types"
import { createProject } from "@/Api/ProjectApi"
import { toast } from "react-toastify"
import { useMutation } from "@tanstack/react-query"

export const CreateProjectPage = ()=> {
    const navigate = useNavigate()
    const mutation = useMutation({
        mutationFn: createProject,
        onError: (error)=> {
            toast.error(error.message)
            navigate('/')
        },
        onSuccess: (data:string)=> {
            toast.success(data)
            navigate('/')
        }
    })

    const initialValues: ProjectFormData = {
        projectName: "",
        clientName: "",
        description: ""
    }
    const { register, handleSubmit, formState: {errors} } = useForm({defaultValues: initialValues})
    const handleForm = async(formData: ProjectFormData)=> {
        //const data = await createProject(formData)
        mutation.mutate(formData)
    }
    return (
        <div className="max-w-3xl mx-auto">
            <nav className="my-6">
                <Link className="bg-purple-400 p-4 rounded-lg font-bold text-white hover:bg-fuchsia-600 transition-colors" to={'/'}>Atras</Link>
            </nav>
            <div>
                <form onSubmit={handleSubmit(handleForm)}  noValidate>
                    <ProjectForm register={register} errors={errors} />
                    <input className="bg-purple-400 p-4 rounded-lg font-bold text-white hover:bg-fuchsia-600 transition-colors" type="submit" value="Crear projecto" />
                </form>
            </div>
        </div>
    )
}
import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { Navigate } from "react-router-dom"
import { getFullProject } from "@/Api/ProjectApi"
import { AddTaskModal } from "@/components/tasks/AddTaskModal"
import { TaskList } from "@/components/tasks/TaskList"
import { EditTaskData } from "@/components/tasks/EditTaskData"
import TaskModalDetails from "@/components/tasks/TaskModalDetails"
import { useAuth } from "@/hooks/useAuth"
import { isManager } from "@/utils/policies"
import { useMemo } from "react"

export const ProjectDetailPage = ()=> {
    const { data: userData, isLoading: authIsLoading } = useAuth()
    const params = useParams()
    const navigate = useNavigate()
    const projectId = params.projectId!

    const { data, isLoading, isError } = useQuery({
        queryKey: ['editProjects', projectId],
        queryFn: ()=> getFullProject(projectId),
        retry: false
    })

    const canEdit = useMemo(()=> data?.manager === userData?._id ,[data, userData])

    if(isLoading && authIsLoading) return 'Cargando...'
    if(isError) return <Navigate to='/404'/>

    if (data && userData) return (
        <>
            <h1 className="text-4xl font-black text-gray-800">{data.projectName}</h1>
            <p className="text-2xl font-medium text-gray-600 mt-4">{data.description}</p>
            {isManager(data.manager, userData._id) && (
                <nav className="my-5 flex gap-3">
                    <button onClick={()=> navigate('?newTask=true')} className="bg-purple-400 p-4 rounded-lg font-bold text-white hover:bg-fuchsia-600 transition-colors" type="button">Agregar Tarea</button>
                    <Link className="bg-pink-400 p-4 rounded-lg font-bold text-white hover:bg-pink-500 transition-colors" to='team'>Agregar miembros</Link>
                </nav>
            )}
            
            <TaskList tasks={data.tasks} canEdit={canEdit} />
            <AddTaskModal />
            <EditTaskData />
            <TaskModalDetails />
        </>
    )
}
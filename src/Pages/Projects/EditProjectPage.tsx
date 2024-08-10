import { Navigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProjectById } from "@/Api/ProjectApi"
import { EditProjectForm } from "@/components/projects/EditProjectForm"

export const EditProjectPage = ()=> {
    const params = useParams()
    const projectId = params.projectId!

    const { data, isLoading, isError } = useQuery({
        queryKey: ['editProjects', projectId],
        queryFn: ()=> getProjectById(projectId),
        retry: false
    })

    if(isLoading) return 'Cargando...'
    if(isError) return <Navigate to='/404'/>

    if(data) return <EditProjectForm data={data} projectId={projectId} />
}
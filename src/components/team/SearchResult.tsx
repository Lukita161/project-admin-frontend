import { addUserToProject } from "@/Api/TeamApi"
import { TeamMember, User } from "@/types/index"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"

type SearchResultProps = {
    user: TeamMember
    reset: ()=> void
}

export const SearchResult = ({ user, reset }: SearchResultProps)=> {
    const params = useParams()
    const projectId = params.projectId!
    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: addUserToProject,
        onError: (error)=> {
            toast.error(error.message)
        },
        onSuccess:(data)=> {
            queryClient.invalidateQueries({queryKey: ['projectTeam', projectId]})
            reset()
            toast.success(data)
        }
    })
    const handleClick = (id: User['_id'])=> {
        const data = {
            projectId,
            id
        }
        mutate(data)
    }
    return (
        <>
            <p className="text-2xl font-black text-gray-800">Resultado: </p>
            <div className="flex justify-between">
                <p className="text-lg font-bold ">{ user.name }</p>
                <button onClick={()=>handleClick(user._id)} className="font-bold text-fuchsia-700 text-lg">Agregar al proyecto</button>
            </div>
        </>
    )
}
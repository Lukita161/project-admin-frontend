import { deleteNote } from "@/Api/NoteApi"
import { useAuth } from "@/hooks/useAuth"
import { Note } from "@/types/index"
import { formatDate } from "@/utils/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react"
import { useLocation, useParams } from "react-router-dom"
import { toast } from "react-toastify"

type NoteDetailProps = {
    note: Note
}

export const NoteDetail = ({ note }:NoteDetailProps)=> {
    const params = useParams()
    const projectId = params.projectId!
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('viewTask')!

    const { data, isLoading } = useAuth()
    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onError:(error)=> {
            toast.error(error.message)
        },
        onSuccess:(data)=> {
            queryClient.invalidateQueries({queryKey: ['task', taskId]})
            toast.success(data)
        }
    })

    const handleClick = ()=> {
        const data = { projectId, taskId, noteId: note._id }
        mutate(data)
    }

    const canDelete = useMemo(()=> data?._id === note.createdBy._id ,[data, note])

    if(isLoading) return 'Cargando...'
    return (
        <div className="p-3 flex justify-between">
            <div>
                <p>{note.content} por: {''}
                    <span>{note.createdBy.name}</span>
                </p>
                <p>{formatDate(note.createdAt)}</p>
            </div>
            {canDelete && (
                <button onClick={handleClick} className="text-xs p-2 text-white bg-red-500 hover:bg-red-600 transition-colors">Eliminar nota</button>
            )}
        </div>
        
    )
}
import { getMembersOfAProject, removeMemberFromProject } from "@/Api/TeamApi"
import AddMemberModal from "@/components/team/AddMemberModal"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Menu, Transition } from "@headlessui/react"
import { Fragment } from "react/jsx-runtime"
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { User } from "@/types/index"


export const ProjectTeamPage = ()=> {
    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!
    
    const queryClient = useQueryClient()
    
    const {data, isError, isLoading} = useQuery({
        queryKey: ['projectTeam', projectId],
        queryFn: ()=>getMembersOfAProject(projectId),
        retry: false
    })

    const { mutate } = useMutation({
        mutationFn: removeMemberFromProject,
        onError:(error)=> {
            toast.error(error.message)
        },
        onSuccess:(data)=> {
            queryClient.invalidateQueries({queryKey: ['projectTeam', projectId]})
            toast.success(data)
        }
    })


    const handleClick = (id: User['_id'])=> {
        const data = {
            projectId,
            userId: id
        }
        mutate(data)
    }

    if(isLoading) return 'Cargando...'

    if(isError) return <Navigate to={'/404'} />

    if(data) return (
        <>
            <h1 className="text-4xl font-black text-gray-800">Miembros del proyecto</h1>
            <p className="text-2xl font-medium text-gray-600 mt-4">Aqui se muestran todos los participantes de este proyecto</p>
            <nav className="my-5 flex gap-3">
                <button onClick={()=> navigate('?addMember=true')} className="p-4 rounded-sm bg-purple-500 cursor-pointer hover:bg-purple-600 transition-colors" type="button">Agregar colaborador</button>
                <Link to={`/projects/${projectId}`}>Ir al proyecto</Link>
            </nav>

            <h2 className="text-5xl font-black my-10">Miembros actuales</h2>
            {data.length ? (
                <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg">
                    {data?.map((member) => (
                        <li key={member._id} className="flex justify-between gap-x-6 px-5 py-10">
                            <div className="flex min-w-0 gap-x-4">
                                <div className="min-w-0 flex-auto space-y-2">
                                    <p className="text-2xl font-black text-gray-600">
                                        {member.name}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                       {member.email}
                                    </p>
                                </div>
                            </div>
                            <div className="flex shrink-0 items-center gap-x-6">
                                <Menu as="div" className="relative flex-none">
                                    <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                                            <span className="sr-only">opciones</span>
                                            <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                                    </Menu.Button>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                            <Menu.Item>
                                                <button
                                                    onClick={()=>handleClick(member._id)}
                                                    type='button'
                                                    className='block px-3 py-1 text-sm leading-6 text-red-500'
                                                >
                                                    Eliminar del Proyecto
                                                </button>
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='text-center py-20'>No hay miembros en este equipo</p>
            )}

            <AddMemberModal />
        </>
    )
}
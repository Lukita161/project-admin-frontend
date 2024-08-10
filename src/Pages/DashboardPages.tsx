import { Link, Navigate, useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/Api/ProjectApi";
import { useAuth } from "@/hooks/useAuth";
import { isManager } from "@/utils/policies";
import DeleteProjectModal from "@/components/projects/DeleteProjectModal";

export const DashboardPage = () => {
  const navigate = useNavigate()
  const { data: userData, isError, isLoading: authIsLoading } = useAuth()
  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

	if(isError) return <Navigate to={'/auth/login'}/>
  if (isLoading && authIsLoading) return "Cargando...";

  if (data && userData)
    return (
      <>
        <h1 className="font-bold text-3xl uppercase">Mis proyectos</h1>
        <p className="text-lg font-medium text-gray-800">Comience creando proyectos para administrarlos</p>
        <nav className="my-8">
          <Link
            className="bg-purple-400 p-4 rounded-lg font-bold text-white hover:bg-fuchsia-600 transition-colors"
            to={"/projects/create"}
          >
            Crear Proyecto
          </Link>
        </nav>
        {data.length ? (
          <ul
            role="list"
            className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg"
          >
            {data.map((project) => (
              <li
                key={project._id}
                className="flex justify-between gap-x-6 px-5 py-10"
              >
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto space-y-2">
                    {isManager(project.manager, userData._id) ? 
                      <p className="font-medium rounded-lg text-blue-600 border border-blue-500 p-2">Manager</p> :
                      <p className="font-medium rounded-lg text-green-600 border border-green-500 p-2">Miembro del equipo</p>
                    }
                    <Link
                      to={`/projects/${project._id}`}
                      className="text-gray-600 cursor-pointer hover:underline text-3xl font-bold"
                    >
                      {project.projectName}
                    </Link>
                    <p className="text-sm text-gray-400">
                      Cliente: {project.clientName}
                    </p>
                    <p className="text-sm text-gray-400">
                      {project.description}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-x-6">
                  <Menu as="div" className="relative flex-none">
                    <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                      <span className="sr-only">opciones</span>
                      <EllipsisVerticalIcon
                        className="h-9 w-9"
                        aria-hidden="true"
                      />
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
                          <Link
                            to={`/projects/${project._id}`}
                            className="block px-3 py-1 text-sm leading-6 text-gray-900"
                          >
                            Ver Proyecto
                          </Link>
                        </Menu.Item>
                        {isManager(project.manager, userData._id) && (
                          <>
                          <Menu.Item>
                          <Link
                            to={`/projects/${project._id}/edit`}
                            className="block px-3 py-1 text-sm leading-6 text-gray-900"
                            >
                            Editar Proyecto
                          </Link>
                        </Menu.Item>
                        <Menu.Item>
                          <button
                            type="button"
                            className="block px-3 py-1 text-sm leading-6 text-red-500"
                            onClick={() => navigate(location.pathname + `?deleteProject=${project._id}`)}
                          >
                            Eliminar Proyecto
                          </button>
                        </Menu.Item>
                        </>
                        )}
                        
                        </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-800 font-medium">
            Aún no hay proyectos.
            <Link
              className="text-fuchsia-500 font-bold text-center text-lg cursor-pointer hover:text-fuchsia-600"
              to={"projects/create"}
            >
              Crear Proyecto
            </Link>
          </p>
        )}
        <DeleteProjectModal />
      </>
    );
};

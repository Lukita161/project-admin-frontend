import { ToastContainer } from "react-toastify"
import 'react-toastify/ReactToastify.css'
import { Link, Navigate } from "react-router-dom"
import { Outlet } from "react-router-dom"
import Logo from "../components/Logo"
import NavMenu from "@/components/NavMenu"
import { useAuth } from "@/hooks/useAuth"

export const AppLayout = ()=> {
    const { data, isError, isLoading } = useAuth()

    if(isLoading) return "Cargando..."
    if(isError) {
        return <Navigate to={'/auth/login'}/>
    }

    if(data)return (
        <>
            <header className="bg-slate-800 py-5">
                <div className="max-w-3xl mx-auto flex flex-col lg:flex-row justify-between items-center">
                    <div className="w-64">
                        <Link className="cursor-pointer" to={'/'}>
                            <Logo />
                        </Link>
                    </div>
                    <div>
                        <NavMenu name={data.name} />
                    </div>
                    <div>

                    </div>
                </div>
            </header>
            <section className="max-w-screen-2xl mt-10 p-5 mx-auto">
                <Outlet />
            </section>
            <footer className="w-screen">
                <p>Todos los derechos reservados {new Date().getFullYear()}</p>
            </footer>

            <ToastContainer />
        </>
    )
}
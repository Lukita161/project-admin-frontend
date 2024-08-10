import Logo from "@/components/Logo"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"

export const AuthLayout = ()=> {
    return (
        <>
        <div className="min-h-screen bg-gray-800">
            <div className="py-10 lg:py-20 mx-auto w-96">
                <Logo />
                <div className="mt-10">
                    <Outlet />
                </div>
            </div>
        </div>
        <ToastContainer />
        </>
    )
}
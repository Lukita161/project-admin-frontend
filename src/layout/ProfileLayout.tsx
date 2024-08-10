import Tabs from "@/components/Profile/Tab"
import { Outlet } from "react-router-dom"

export const ProfileLayout = ()=> {
    return (
        <>
            <Tabs />

            <Outlet />
        </>
    )
}
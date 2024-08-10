import { useState } from "react"
import NewPasswordToken from "@/components/auth/NewPasswordToken"
import NewPasswordForm from "@/components/auth/NewPasswordForm"
import { ConfirmToken } from "@/types/index"

export const NewPasswordPage = ()=> {
    const [token, setToken] = useState<ConfirmToken['token']>('')
    const [isTokenValid, setIsTokenValid ] = useState(false)
    return (
        <>
        <div>Hola</div>
            {!isTokenValid ? <NewPasswordToken token={token} setToken={setToken} setIsTokenValid={setIsTokenValid} /> : <NewPasswordForm token={token} />}
        </>
    )
}
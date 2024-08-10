import ProfileForm from "@/components/Profile/ProfileForm"
import { useAuth } from "@/hooks/useAuth"

export const ProfilePage = ()=> {
    const { data, isLoading } = useAuth()

    if(isLoading) return 'Cargando...'
    if(data) return (
        <ProfileForm data={data} />
    )
}
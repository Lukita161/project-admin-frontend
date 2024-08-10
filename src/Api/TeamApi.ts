import { api } from "@/lib/axios"
import { isAxiosError } from "axios"
import { Project, TeamMemberForm, TeamMembersSchema, User } from "../types"

export const findUserByEmail = async({formData, projectId} : {formData: TeamMemberForm, projectId: Project['_id']})=> {
    try {
        const url = `/projects/${projectId}/team/find`
        const { data } = await api.post(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const addUserToProject = async({projectId, id} : {id: User['_id'], projectId: Project['_id']})=> {
    try {
        const url = `/projects/${projectId}/team`
        const { data } = await api.post(url,{id})
        console.log(data)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const getMembersOfAProject = async(projectId: Project['_id'])=> {
    try {
        const url = `/projects/${projectId}/team`
        const { data } = await api(url)
        const response = TeamMembersSchema.safeParse(data)
        if(response.success) {
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const removeMemberFromProject = async({projectId, userId}: {projectId:Project['_id'], userId: User['_id']})=> {
    try {
        const url = `/projects/${projectId}/team/${userId}`
        const { data } = await api.delete<string>(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}
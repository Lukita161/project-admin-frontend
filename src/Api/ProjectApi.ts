import { editProjectSchema, Project, ProjectFormData, projectSchema, ProjectsSchema } from "@/types/index"
import { api } from "@/lib/axios"
import { isAxiosError } from "axios"


type ProjectFormTypes = {
    formData: ProjectFormData,
    projectId: Project['_id']
}


export const createProject = async(formData: ProjectFormData)=> {
    try {
        const { data } = await api.post("/projects", formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const getProjects = async()=> {
    try {
        const { data: {data} } = await api("/projects")
        const result = ProjectsSchema.safeParse(data)
        if(result.success) {
            return result.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const getProjectById = async(id: Project['_id']) => {
    try {
        const { data: {data} } = await api(`/projects/${id}`)
        const response = editProjectSchema.safeParse(data)
        if(response.success) {
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const getFullProject = async(id: Project['_id']) => {
    try {
        const { data: {data} } = await api(`/projects/${id}`)
        const response = projectSchema.safeParse(data)
        if(response.success) {
            return response.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const updateProject = async({formData, projectId} : ProjectFormTypes)=> {
    try {
        const { data }  = await api.put<string>(`/projects/${projectId}`, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const deleteProject = async(id: Project['_id'])=> {
    try {
        const { data } = await api.delete<string>(`/projects/${id}`)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}
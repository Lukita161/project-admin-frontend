import { api } from "@/lib/axios";
import { Project, Task, TaskFormData, TaskSchema, TaskStatus } from "../types";
import { isAxiosError } from "axios";

type TaskApiType = {
    formData: TaskFormData
    projectId: Project['_id']
    taskId: Task['_id']
    status: TaskStatus
}

export const createTask = async({formData, projectId}: Pick<TaskApiType, 'formData' | 'projectId'>)=> {
    try {
        const url = `projects/${projectId}/tasks`
        const { data } = await api.post<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const getTaskById = async({ projectId, taskId }: Pick<TaskApiType, 'projectId' | 'taskId'>)=> {
    try {
        const url = `projects/${projectId}/tasks/${taskId}`
        const { data } = await api(url)
        const result = TaskSchema.safeParse(data)
        if(result.success) {
            return result.data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const updateTask = async({projectId, taskId, formData}: Pick<TaskApiType, 'projectId' | 'taskId' | 'formData'>) => {
    try {
        const url = `projects/${projectId}/tasks/${taskId}`
        const { data } = await api.put<string>(url, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const deleteTask = async({ projectId, taskId }: Pick<TaskApiType, 'projectId' | 'taskId'> )=> {
    try {
        const url = `projects/${projectId}/tasks/${taskId}`
        const { data } = await api.delete<string>(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const updateStatus = async({projectId, taskId, status}: Pick<TaskApiType, 'projectId'| 'taskId' | 'status' >) => {
    try {
        const url = `projects/${projectId}/tasks/${taskId}/status`
        const { data } = await api.post<string>(url, {status})
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}
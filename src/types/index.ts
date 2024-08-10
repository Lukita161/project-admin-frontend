import { z } from "zod"

export const authSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    password_confirmation: z.string(),
    current_password: z.string(),
    token: z.string()
})
export type Auth = z.infer<typeof authSchema>

export type UserLoginForm = Pick<Auth, 'email' | 'password'>
export type UserRegistrationForm = Pick<Auth, 'name' | 'email' | 'password' | 'password_confirmation' >
export type ConfirmToken = Pick<Auth, 'token'>
export type ForgotPasswordForm = Pick<Auth, 'email'>
export type NewPasswordForm = Pick<Auth, 'password' | 'password_confirmation'>
export type CheckPasswordForm = Pick<Auth, 'password'>

export type RequestConfirmationCodeForm = Pick<Auth, 'email'>

export const UserSchema = authSchema.pick({
    name: true,
    email: true
}).extend({
    _id: z.string()
})

export type User = z.infer<typeof UserSchema>

export type UpdateCurrentUserPasswordForm = Pick<Auth, 'current_password'|'password'|'password_confirmation'>

export type UserProfileForm = Pick<User, 'email' | 'name'>


export const noteSchema = z.object({
    _id: z.string(),
    content: z.string(),
    createdBy: UserSchema,
    task: z.string(),
    createdAt: z.string()
})

export const TaskStatusSchema = z.enum(["pending", "onHold","inProgress","underReview","completed"])
export const TaskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    project: z.string(),
    status: TaskStatusSchema,
    completedBy: z.array(z.object({
        _id: z.string(),
        user: UserSchema,
        status: TaskStatusSchema
    })),
    note: z.array(noteSchema.extend({createdBy: UserSchema})),
    createdAt: z.string(),
    updatedAt: z.string()
})




export const taskProjectSchema = TaskSchema.pick({
    _id: true,
    name: true,
    description: true,
    status: true,
})


export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    manager: z.string(UserSchema.pick({_id:true})),
    tasks: z.array(taskProjectSchema),
    team: z.array(z.string(UserSchema.pick({
        _id:true
    })))
})



export const ProjectsSchema = z.array(
    projectSchema.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true,
        manager: true,
    })
)

export const editProjectSchema = projectSchema.pick({
    projectName: true,
    clientName: true,
    description: true
})

export type Note = z.infer<typeof noteSchema>

export type NoteFormData = Pick<Note, 'content'>

export const TeamMemberSchema = UserSchema.pick({
    _id: true,
    email: true,
    name: true
})
export type TeamMember = z.infer<typeof TeamMemberSchema>
export type TeamMemberForm = Pick<TeamMember, 'email'>

export const TeamMembersSchema = z.array(TeamMemberSchema)


export type TaskStatus = z.infer<typeof TaskStatusSchema> 


export type Task = z.infer<typeof TaskSchema>

export type TaskFormData = Pick<Task, 'name' | 'description'>

export type TaskProject = z.infer<typeof taskProjectSchema>

export type Project = z.infer<typeof projectSchema>

export type ProjectFormData = Pick<Project, 'clientName' | 'description' | 'projectName'>
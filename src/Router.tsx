import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardPage } from "./Pages/DashboardPages";
import { AppLayout } from "./layout/AppLayout";
import { CreateProjectPage } from "@/Pages/Projects/CreateProjectPage";
import { EditProjectPage } from "./Pages/Projects/EditProjectPage";
import { ProjectDetailPage } from "./Pages/Projects/ProjectDetailPage";
import { AuthLayout } from "@/layout/AuthLayout";
import  LoginPage  from "@/Pages/Auth/LoginPage";
import RegisterPage from "./Pages/Auth/RegisterPage";
import  ConfirmAccountPage  from "./Pages/Auth/ConfirmAccountPage";
import RequestNewCodePage from "./Pages/Auth/RequestNewCodePage";
import ForgotPasswordPage from "./Pages/Auth/ForgotPassword";
import { NewPasswordPage } from "./Pages/Auth/NewPasswordPage";
import { ProjectTeamPage } from "./Pages/Projects/ProjectTeamPage";
import { ProfilePage } from "./Pages/Profile/ProfilePage";
import ChangePasswordPage from "./Pages/Profile/ChangePasswordPage";
import { ProfileLayout } from "./layout/ProfileLayout";
import { NotFound } from "./Pages/NotFound";

export const Router = ()=> {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<DashboardPage />} index />
                    <Route path="/projects/create" element={<CreateProjectPage />} />
                    <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
                    <Route path="/projects/:projectId/edit" element={<EditProjectPage />} />
                    <Route path="/projects/:projectId/team" element={<ProjectTeamPage />} />
                    <Route element={<ProfileLayout />}>
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/profile/change-password" element={<ChangePasswordPage />} />
                    </Route>
                </Route>
                
                <Route element={<AuthLayout />}>
                    <Route path="/auth/login" element={<LoginPage />} />
                    <Route path="/auth/register" element={<RegisterPage />} />
                    <Route path="/auth/confirm-account" element={<ConfirmAccountPage />} />
                    <Route path="/auth/request-code" element={<RequestNewCodePage />} />
                    <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/auth/new-password" element={<NewPasswordPage />} /> 
                </Route>
                <Route element={<AuthLayout />}>
                    <Route path="/404" element={<NotFound />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
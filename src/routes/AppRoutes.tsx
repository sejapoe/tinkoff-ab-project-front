import {useRoutes} from "react-router-dom";
import {RootSectionView, SectionView} from "../features/section/components/SectionLoader";
import {TopicView} from "../features/topic/components/TopicView";
import {MainLayout} from "../ui/MainLayout";
import {LoginForm} from "../features/auth/components/LoginForm";
import {SignUpForm} from "../features/auth/components/SignUpForm";

export const AppRoutes = () => {
    return useRoutes([
        {
            path: "/*",
            element: <MainLayout/>,
            children: [
                {
                    path: "",
                    element: <RootSectionView/>
                },
                {
                    path: "sections/:id",
                    element: <SectionView/>
                },
                {
                    path: "topics/:id",
                    element: <TopicView/>
                },
                {
                    path: "login",
                    element: <LoginForm/>
                },
                {
                    path: "signup",
                    element: <SignUpForm/>
                }
            ]
        }
    ]);
}
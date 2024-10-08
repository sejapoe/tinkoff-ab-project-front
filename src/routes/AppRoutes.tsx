import {useRoutes} from "react-router-dom";
import {RootSectionView, SectionView} from "../features/section/components/SectionLoader";
import {TopicView} from "../features/topic/components/TopicView";
import {MainLayout} from "../ui/MainLayout";
import {LoginForm} from "../features/auth/components/LoginForm";
import {SignUpForm} from "../features/auth/components/SignUpForm";
import {Profile} from "../features/profile/components/Profile";
import {ProfileEdit} from "../features/profile/components/ProfileEdit";
import {Settings} from "../features/settings/components/Settings";
import {AllNewsPage} from "../features/news/components/AllNewsPage";
import {NewsPage} from "../features/news/components/NewsPage";

export const AppRoutes = () => {
    return useRoutes([
        {
            path: "/*",
            element: <MainLayout/>,
            children: [
                {
                  path: "",
                  element: <AllNewsPage/>
                },
                {
                    path: "news/:newsId",
                    element: <NewsPage/>
                },
                {
                    path: "sections",
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
                    path: "profile",
                    element: <Profile/>
                },
                {
                    path: "profile/edit",
                    element: <ProfileEdit/>
                },
                {
                    path: "profile/:id",
                    element: <Profile/>
                },
                {
                    path: "settings",
                    element: <Settings/>
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
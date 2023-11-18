import {useRoutes} from "react-router-dom";
import {RootSectionView, SectionView} from "../features/section/components/SectionView";
import {TopicView} from "../features/topic/components/TopicView";

export const AppRoutes = () => {
    return useRoutes([
        {
            path: "/",
            element: <RootSectionView/>
        },
        {
            path: "/sections/:id",
            element: <SectionView/>
        },
        {
            path: "/topics/:id",
            element: <TopicView/>
        }
    ]);
}
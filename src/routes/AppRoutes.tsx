import {useRoutes} from "react-router-dom";
import {RootSectionView, SectionView} from "../features/section/components/SectionView";

export const AppRoutes = () => {
    return useRoutes([
        {
            path: "/",
            element: <RootSectionView/>
        },
        {
            path: "/sections/:id",
            element: <SectionView/>
        }
    ]);
}
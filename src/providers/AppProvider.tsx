import {QueryClientProvider} from "./QueryClientProvider";
import {BrowserRouter} from "react-router-dom";
import {AppRoutes} from "../routes/AppRoutes";

export const AppProvider = () => {
    return (
        <QueryClientProvider>
            <BrowserRouter>
                <AppRoutes/>
            </BrowserRouter>
        </QueryClientProvider>
    )
}
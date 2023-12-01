import {Location} from "react-router-dom";

export const getPathWithRedirect = (basePath: string, location: Location) => `${basePath}?redirect_uri=${location.pathname}`;
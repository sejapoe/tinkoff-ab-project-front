import {Api, HttpResponse} from "./Api";

export interface ProblemDetailDto {
    /** @format uri */
    type?: string;
    title?: string;
    /** @format int32 */
    status?: number;
    detail?: string;
    /** @format uri */
    instance?: string;
    properties?: Record<string, object>;
}

type GenericErrorModel = HttpResponse<unknown, ProblemDetailDto>

const api = new Api<string>({
    baseApiParams: {
        format: "json"
    },
    securityWorker: (token) => {
        return token ? {headers: {Authorization: `Bearer ${token}`}} : {};
    }
})

export default api
export type {
    GenericErrorModel
}
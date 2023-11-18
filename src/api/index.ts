import {Api, ContentType, HttpResponse} from "./Api";

type GenericErrorModel = HttpResponse<unknown, String>

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
/* eslint-disable */
/* tslint:disable */

/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface UpdateTriggerRequestDto {
    trigger_key: string;
    group: string;
    cron: string;
}

export interface TriggerResponseDto {
    trigger_key?: string;
    job_key?: string;
    cron?: string;
}

export interface UpdatePostRequestDto {
    /** @format int64 */
    parent_id: number;
    /** @format int64 */
    author_id: number;
    is_anonymous?: boolean;
    /** @format int64 */
    id: number;
    /**
     * @minLength 0
     * @maxLength 200
     */
    text: string;
}

export interface DocumentResponseDto {
    original_name?: string;
    /** @format int64 */
    id?: number;
    filename?: string;
    type?: "FILE" | "IMAGE";
}

export interface PostResponseDto {
    /** @format int64 */
    parent_id?: number;
    is_author?: boolean;
    is_anonymous?: boolean;
    /** @format int64 */
    author_id?: number;
    author_name?: string;
    /** @format date-time */
    created_at?: string;
    /** @format int64 */
    id?: number;
    text?: string;
    documents?: DocumentResponseDto[];
}

export interface CreateTopicRequestDto {
    /** @format int64 */
    parentId: number;
    name: string;
    /** @format int64 */
    authorId: number;
    /**
     * @minLength 0
     * @maxLength 200
     */
    text: string;
    /**
     * @maxItems 5
     * @minItems 0
     */
    files?: File[];
}

export interface ShortTopicResponseDto {
    /** @format int64 */
    id?: number;
    name?: string;
}

export interface CreateSectionRequestDto {
    /** @format int64 */
    parent_id: number;
    name: string;
}

export interface SectionMultiPageResponseDto {
    /** @format int32 */
    pageNumber?: number;
    /** @format int32 */
    pageSize?: number;
    /** @format int32 */
    totalPages?: number;
    /** @format int64 */
    totalElements?: number;
    subsections?: ShortSectionResponseDto[];
    topics?: ShortTopicResponseDto[];
}

export interface SectionResponseDto {
    /** @format int64 */
    id?: number;
    name?: string;
    parent?: ShortSectionResponseDto;
    page?: SectionMultiPageResponseDto;
    rights?: SectionRightsDto;
}

export interface SectionRightsDto {
    canCreateSubsections?: boolean;
    canCreateTopics?: boolean;
}

export interface ShortSectionResponseDto {
    /** @format int64 */
    id?: number;
    name?: string;
}

export interface CreatePostRequestDto {
    /** @format int64 */
    parentId: number;
    /** @format int64 */
    authorId: number;
    /**
     * @minLength 0
     * @maxLength 200
     */
    text: string;
    /**
     * @maxItems 5
     * @minItems 0
     */
    files?: File[];
    isAnonymous?: boolean;
}

export interface CreateNewsRequestDto {
    name: string;
    /**
     * @minLength 0
     * @maxLength 200
     */
    text: string;
    /**
     * @maxItems 5
     * @minItems 0
     */
    files?: File[];
}

export interface NewsResponseDto {
    /** @format int64 */
    post_id?: number;
    /** @format date-time */
    created_at?: string;
    /** @format int64 */
    id?: number;
    title?: string;
    text?: string;
    files?: DocumentResponseDto[];
}

export interface CreateNewsCommentRequestDto {
    /** @format int64 */
    newsId: number;
    /**
     * @minLength 0
     * @maxLength 200
     */
    text: string;
    isAnonymous?: boolean;
}

export interface NewsCommentResponseDto {
    /** @format int64 */
    threadId?: number;
    post?: PostResponseDto;
}

export interface CreateCommentInThreadRequestDto {
    /** @format int64 */
    threadId: number;
    /**
     * @minLength 0
     * @maxLength 200
     */
    text: string;
    isAnonymous?: boolean;
}

export interface SignUpRequestDto {
    confirm_password?: string;
    name?: string;
    password?: string;
}

export interface JwtResponseDto {
    /** @format int64 */
    account_id?: number;
    username?: string;
    token?: string;
    roles?: string[];
}

export interface JwtRequestDto {
    name?: string;
    password?: string;
}

export interface AccountResponseDto {
    /** @format int64 */
    id?: number;
    name?: string;
    displayName?: string;
    description?: string;
    gender?: "NOT_SPECIFIED" | "MALE" | "FEMALE" | "APACHE_HELICOPTER";
    avatar?: DocumentResponseDto;
    enabled?: boolean;
    roles?: string[];
}

export interface UpdateAccountRequestDto {
    /** @format int64 */
    id?: number;
    name: string;
    description?: string;
    gender?: "NOT_SPECIFIED" | "MALE" | "FEMALE" | "APACHE_HELICOPTER";
    /** @format binary */
    avatar?: File;
}

export interface PageResponseDtoPostResponseDto {
    /** @format int32 */
    number?: number;
    /** @format int32 */
    size?: number;
    /** @format int32 */
    totalPages?: number;
    /** @format int64 */
    totalElements?: number;
    content?: PostResponseDto[];
}

export interface TopicResponseDto {
    /** @format int64 */
    parent_id?: number;
    /** @format int64 */
    id?: number;
    name?: string;
    posts?: PageResponseDtoPostResponseDto;
}

export interface PageResponseDtoShortNewsResponseDto {
    /** @format int32 */
    number?: number;
    /** @format int32 */
    size?: number;
    /** @format int32 */
    totalPages?: number;
    /** @format int64 */
    totalElements?: number;
    content?: ShortNewsResponseDto[];
}

export interface ShortNewsResponseDto {
    /** @format int64 */
    id?: number;
    title?: string;
}

export interface PageResponseDtoNewsCommentResponseDto {
    /** @format int32 */
    number?: number;
    /** @format int32 */
    size?: number;
    /** @format int32 */
    totalPages?: number;
    /** @format int64 */
    totalElements?: number;
    content?: NewsCommentResponseDto[];
}

export interface PageResponseDtoAccountResponseDto {
    /** @format int32 */
    number?: number;
    /** @format int32 */
    size?: number;
    /** @format int32 */
    totalPages?: number;
    /** @format int64 */
    totalElements?: number;
    content?: AccountResponseDto[];
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
    /** set parameter to `true` for call `securityWorker` for this request */
    secure?: boolean;
    /** request path */
    path: string;
    /** content type of request body */
    type?: ContentType;
    /** query params */
    query?: QueryParamsType;
    /** format of response (i.e. response.json() -> format: "json") */
    format?: ResponseFormat;
    /** request body */
    body?: unknown;
    /** base url */
    baseUrl?: string;
    /** request cancellation token */
    cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
    baseUrl?: string;
    baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
    securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
    customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
    data: D;
    error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
    Json = "application/json",
    FormData = "multipart/form-data",
    UrlEncoded = "application/x-www-form-urlencoded",
    Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
    public baseUrl: string = "http://localhost:8080";
    private securityData: SecurityDataType | null = null;
    private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
    private abortControllers = new Map<CancelToken, AbortController>();
    private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

    private baseApiParams: RequestParams = {
        credentials: "same-origin",
        headers: {},
        redirect: "follow",
        referrerPolicy: "no-referrer",
    };

    constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
        Object.assign(this, apiConfig);
    }

    public setSecurityData = (data: SecurityDataType | null) => {
        this.securityData = data;
    };

    protected encodeQueryParam(key: string, value: any) {
        const encodedKey = encodeURIComponent(key);
        return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
    }

    protected addQueryParam(query: QueryParamsType, key: string) {
        return this.encodeQueryParam(key, query[key]);
    }

    protected addArrayQueryParam(query: QueryParamsType, key: string) {
        const value = query[key];
        return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
    }

    protected toQueryString(rawQuery?: QueryParamsType): string {
        const query = rawQuery || {};
        const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
        return keys
            .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
            .join("&");
    }

    protected addQueryParams(rawQuery?: QueryParamsType): string {
        const queryString = this.toQueryString(rawQuery);
        return queryString ? `?${queryString}` : "";
    }

    private contentFormatters: Record<ContentType, (input: any) => any> = {
        [ContentType.Json]: (input: any) =>
            input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
        [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
        [ContentType.FormData]: (input: any) =>
            Object.keys(input || {}).reduce((formData, key) => {
                const property = input[key];
                if (property === null || property === undefined) return formData;

                if (Array.isArray(property) && property.every(item => item instanceof File)) {
                    property.forEach(value => {
                        formData.append(key, value)
                    })
                    return formData
                }

                formData.append(
                    key,
                    property instanceof Blob
                        ? property
                        : typeof property === "object"
                            ? JSON.stringify(property)
                            : `${property}`,
                );
                return formData;
            }, new FormData()),
        [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
    };

    protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
        return {
            ...this.baseApiParams,
            ...params1,
            ...(params2 || {}),
            headers: {
                ...(this.baseApiParams.headers || {}),
                ...(params1.headers || {}),
                ...((params2 && params2.headers) || {}),
            },
        };
    }

    protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
        if (this.abortControllers.has(cancelToken)) {
            const abortController = this.abortControllers.get(cancelToken);
            if (abortController) {
                return abortController.signal;
            }
            return void 0;
        }

        const abortController = new AbortController();
        this.abortControllers.set(cancelToken, abortController);
        return abortController.signal;
    };

    public abortRequest = (cancelToken: CancelToken) => {
        const abortController = this.abortControllers.get(cancelToken);

        if (abortController) {
            abortController.abort();
            this.abortControllers.delete(cancelToken);
        }
    };

    public request = async <T = any, E = any>({
                                                  body,
                                                  secure,
                                                  path,
                                                  type,
                                                  query,
                                                  format,
                                                  baseUrl,
                                                  cancelToken,
                                                  ...params
                                              }: FullRequestParams): Promise<HttpResponse<T, E>> => {
        const secureParams =
            ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
                this.securityWorker &&
                (await this.securityWorker(this.securityData))) ||
            {};
        const requestParams = this.mergeRequestParams(params, secureParams);
        const queryString = query && this.toQueryString(query);
        const payloadFormatter = this.contentFormatters[type || ContentType.Json];
        const responseFormat = format || requestParams.format;

        return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
            ...requestParams,
            headers: {
                ...(requestParams.headers || {}),
                ...(type && type !== ContentType.FormData ? {"Content-Type": type} : {}),
            },
            signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
            body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
        }).then(async (response) => {
            const r = response as HttpResponse<T, E>;
            r.data = null as unknown as T;
            r.error = null as unknown as E;

            const data = !responseFormat
                ? r
                : await response[responseFormat]()
                    .then((data) => {
                        if (r.ok) {
                            r.data = data;
                        } else {
                            r.error = data;
                        }
                        return r;
                    })
                    .catch((e) => {
                        r.error = e;
                        return r;
                    });

            if (cancelToken) {
                this.abortControllers.delete(cancelToken);
            }

            if (!response.ok) throw data;
            return data;
        });
    };
}

/**
 * @title OpenAPI definition
 * @version v0
 * @baseUrl http://localhost:8080
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    settings = {
        /**
         * No description
         *
         * @tags settings
         * @name UpdateTrigger
         * @request PUT:/settings/job
         */
        updateTrigger: (data: UpdateTriggerRequestDto, params: RequestParams = {}) =>
            this.request<TriggerResponseDto, any>({
                path: `/settings/job`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),
    };
    post = {
        /**
         * @description Получение поста
         *
         * @tags post
         * @name Get1
         * @request GET:/post
         */
        get1: (
            query: {
                /** @format int64 */
                id: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<PostResponseDto, PostResponseDto>({
                path: `/post`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * @description Обновление поста
         *
         * @tags post
         * @name Update
         * @request PUT:/post
         */
        update: (data: UpdatePostRequestDto, params: RequestParams = {}) =>
            this.request<PostResponseDto, PostResponseDto>({
                path: `/post`,
                method: "PUT",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * @description Удаление своего поста
         *
         * @tags post
         * @name Delete1
         * @request DELETE:/post
         */
        delete1: (
            query: {
                /** @format int64 */
                id: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<number, number>({
                path: `/post`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * @description Создание поста
         *
         * @tags post
         * @name CreateWithAttachments
         * @request POST:/post/withattach
         */
        createWithAttachments: (data: CreatePostRequestDto, params: RequestParams = {}) =>
            this.request<PostResponseDto, PostResponseDto>({
                path: `/post/withattach`,
                method: "POST",
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * @description Удаление поста администратором
         *
         * @tags post
         * @name DeleteAdmin
         * @request DELETE:/post/admin
         */
        deleteAdmin: (
            query: {
                /** @format int64 */
                id: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<number, number>({
                path: `/post/admin`,
                method: "DELETE",
                query: query,
                ...params,
            }),
    };
    topic = {
        /**
         * @description Создание топика
         *
         * @tags topic
         * @name Create
         * @request POST:/topic
         */
        create: (data: CreateTopicRequestDto, params: RequestParams = {}) =>
            this.request<ShortTopicResponseDto, ShortTopicResponseDto>({
                path: `/topic`,
                method: "POST",
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * @description Удаление топика
         *
         * @tags topic
         * @name Delete
         * @request DELETE:/topic
         */
        delete: (
            query: {
                /** @format int64 */
                id: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<number, number>({
                path: `/topic`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * @description Получение топика
         *
         * @tags topic
         * @name Get
         * @request GET:/topic/{id}
         */
        get: (
            id: number,
            query?: {
                /** @format int32 */
                pageNumber?: number;
                /** @format int32 */
                forPage?: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<TopicResponseDto, TopicResponseDto>({
                path: `/topic/${id}`,
                method: "GET",
                query: query,
                ...params,
            }),
    };
    sections = {
        /**
         * @description Получение корневого раздела
         *
         * @tags section
         * @name GetRootSection
         * @request GET:/sections
         */
        getRootSection: (
            query?: {
                /** @format int32 */
                pageNumber?: number;
                /** @format int32 */
                forPage?: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<SectionResponseDto, SectionResponseDto>({
                path: `/sections`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * @description Создание раздела
         *
         * @tags section
         * @name CreateSection
         * @request POST:/sections
         */
        createSection: (data: CreateSectionRequestDto, params: RequestParams = {}) =>
            this.request<SectionResponseDto, ShortSectionResponseDto>({
                path: `/sections`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * @description Получение раздела по ID
         *
         * @tags section
         * @name GetSection
         * @request GET:/sections/{id}
         */
        getSection: (
            id: number,
            query?: {
                /** @format int32 */
                pageNumber?: number;
                /** @format int32 */
                forPage?: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<SectionResponseDto, SectionResponseDto>({
                path: `/sections/${id}`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * @description Удаление раздела
         *
         * @tags section
         * @name DeleteSection
         * @request DELETE:/sections/{id}
         */
        deleteSection: (id: number, params: RequestParams = {}) =>
            this.request<void, void>({
                path: `/sections/${id}`,
                method: "DELETE",
                ...params,
            }),
    };
    news = {
        /**
         * No description
         *
         * @tags news
         * @name GetAllNews
         * @request GET:/news
         */
        getAllNews: (
            query?: {
                /** @format int32 */
                pageNumber?: number;
                /** @format int32 */
                forPage?: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<PageResponseDtoShortNewsResponseDto, any>({
                path: `/news`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * @description Создание новости
         *
         * @tags news
         * @name CreateNews
         * @request POST:/news
         */
        createNews: (data: CreateNewsRequestDto, params: RequestParams = {}) =>
            this.request<NewsResponseDto, any>({
                path: `/news`,
                method: "POST",
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags news
         * @name CreateComment
         * @request POST:/news/comments
         */
        createComment: (data: CreateNewsCommentRequestDto, params: RequestParams = {}) =>
            this.request<NewsCommentResponseDto, any>({
                path: `/news/comments`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags news
         * @name CreateComment1
         * @request POST:/news/comments/thread
         */
        createThreadComment: (data: CreateCommentInThreadRequestDto, params: RequestParams = {}) =>
            this.request<PostResponseDto, any>({
                path: `/news/comments/thread`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags news
         * @name GetNews
         * @request GET:/news/{newsId}
         */
        getNews: (newsId: number, params: RequestParams = {}) =>
            this.request<NewsResponseDto, any>({
                path: `/news/${newsId}`,
                method: "GET",
                ...params,
            }),

        /**
         * No description
         *
         * @tags news
         * @name GetComments
         * @request GET:/news/{newsId}/comments
         */
        getComments: (
            newsId: number,
            query?: {
                /** @format int32 */
                pageNumber?: number;
                /** @format int32 */
                forPage?: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<PageResponseDtoNewsCommentResponseDto, any>({
                path: `/news/${newsId}/comments`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * No description
         *
         * @tags news
         * @name GetThreadComments
         * @request GET:/news/comments/{threadId}
         */
        getThreadComments: (
            threadId: number,
            query?: {
                /** @format int32 */
                pageNumber?: number;
                /** @format int32 */
                forPage?: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<PageResponseDtoPostResponseDto, any>({
                path: `/news/comments/${threadId}`,
                method: "GET",
                query: query,
                ...params,
            }),
    };
    files = {
        /**
         * No description
         *
         * @tags storage-controller
         * @name UploadFile
         * @request POST:/files
         */
        uploadFile: (
            data: {
                /** @format binary */
                file: File;
            },
            params: RequestParams = {},
        ) =>
            this.request<void, any>({
                path: `/files`,
                method: "POST",
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * No description
         *
         * @tags storage-controller
         * @name ServeFile
         * @request GET:/files/{filename}
         */
        serveFile: (filename: string, params: RequestParams = {}) =>
            this.request<File, any>({
                path: `/files/${filename}`,
                method: "GET",
                ...params,
            }),
    };
    auth = {
        /**
         * No description
         *
         * @tags auth
         * @name SignUp
         * @request POST:/auth/signup
         */
        signUp: (data: SignUpRequestDto, params: RequestParams = {}) =>
            this.request<JwtResponseDto, any>({
                path: `/auth/signup`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),

        /**
         * No description
         *
         * @tags auth
         * @name Login
         * @request POST:/auth/login
         */
        login: (data: JwtRequestDto, params: RequestParams = {}) =>
            this.request<JwtResponseDto, any>({
                path: `/auth/login`,
                method: "POST",
                body: data,
                type: ContentType.Json,
                ...params,
            }),
    };
    account = {
        /**
         * @description Повышение пользователя
         *
         * @tags account
         * @name Promote
         * @request PATCH:/account/{id}/promote
         */
        promote: (id: number, params: RequestParams = {}) =>
            this.request<AccountResponseDto, any>({
                path: `/account/${id}/promote`,
                method: "PATCH",
                ...params,
            }),

        /**
         * @description Повышение пользователя
         *
         * @tags account
         * @name Demote
         * @request PATCH:/account/{id}/demote
         */
        demote: (id: number, params: RequestParams = {}) =>
            this.request<AccountResponseDto, any>({
                path: `/account/${id}/demote`,
                method: "PATCH",
                ...params,
            }),

        /**
         * @description Редактирование аккаунта
         *
         * @tags account
         * @name UpdateAccount
         * @request PATCH:/account/
         */
        updateAccount: (data: UpdateAccountRequestDto, params: RequestParams = {}) =>
            this.request<AccountResponseDto, AccountResponseDto>({
                path: `/account/`,
                method: "PATCH",
                body: data,
                type: ContentType.FormData,
                ...params,
            }),

        /**
         * @description Получение всех аккаунтов
         *
         * @tags account
         * @name GetAll
         * @request GET:/account
         */
        getAll: (
            query?: {
                /** @format int32 */
                pageNumber?: number;
                /** @format int32 */
                forPage?: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<PageResponseDtoAccountResponseDto, PageResponseDtoAccountResponseDto>({
                path: `/account`,
                method: "GET",
                query: query,
                ...params,
            }),

        /**
         * @description Удаление аккаунта
         *
         * @tags account
         * @name Delete2
         * @request DELETE:/account
         */
        delete2: (
            query: {
                /** @format int64 */
                id: number;
            },
            params: RequestParams = {},
        ) =>
            this.request<number, number>({
                path: `/account`,
                method: "DELETE",
                query: query,
                ...params,
            }),

        /**
         * @description Получение аккаунта
         *
         * @tags account
         * @name Get2
         * @request GET:/account/{id}
         */
        get2: (id: number, params: RequestParams = {}) =>
            this.request<AccountResponseDto, AccountResponseDto>({
                path: `/account/${id}`,
                method: "GET",
                ...params,
            }),
    };
    images = {
        /**
         * No description
         *
         * @tags storage-controller
         * @name ServeImage
         * @request GET:/images/{filename}
         */
        serveImage: (filename: string, params: RequestParams = {}) =>
            this.request<File, any>({
                path: `/images/${filename}`,
                method: "GET",
                ...params,
            }),
    };
}

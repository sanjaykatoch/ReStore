import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { URLSearchParams } from "url";
import { history } from "../..";
import { PaginatedResponse } from "../model/Pagination";

axios.defaults.baseURL = "https://localhost:5000/api/";
axios.defaults.withCredentials = true;

const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(response => {
    sleep();
    const pagination = response.headers["pagination"];
    if (pagination) {
        response.data = new PaginatedResponse(response.data, JSON.parse(pagination));
        console.log(response);
        return response;
    }
    return response
}, (error: AxiosError) => {
    const { data, status } = error.response as any;
    // toast.error(data);
    switch (status) {
        case 400:
            if (data.errors) {
                const modelStateErrors: string[] = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat();
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data);
            break;
        case 500:
            history.push('ServerError', data);
            // history.push({
            //     pathname: '/ServerError',

            // });
            //toast.error(data.title);
            break;
        default:
            break;

    }
    return Promise.reject(error.response);
})

const request = {
    get: (url: string, params?: URLSearchParams) => axios.get(url, { params }).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),

}

const Account = {
    login: (values: any) => request.post("account/login", values),
    register: (values: any) => request.post("account/register", values),
    currentUser: () => request.get("account/currentUser")
}

const TestErrors = {
    get400Error: () => request.get("Buggy/bad-request"),
    get401Error: () => request.get("Buggy/unauthorized"),
    get404Error: () => request.get("Buggy/not-found"),
    get500Error: () => request.get("Buggy/server-error"),
    getValidationError: () => request.get("Buggy/validation-error")
};
const Catalog = {
    list: (params: URLSearchParams) => request.get("product", params),
    details: (id: number) => request.get(`product/${id}`),
    fetchFilters: () => request.get('product/filters')
}

const Basket = {
    get: () => request.get("Basket"),
    addItem: (productId: number, quantity = 1) => request.post(`Basket?productId=${productId}&quantity=${quantity}`, {
        withCredentials: true
    }),
    removeItem: (productId: number, quantity = 1) => request.delete(`Basket?productId=${productId}&quantity=${quantity}`)
}

const agent = {
    Catalog,
    TestErrors,
    Basket,
    Account
}


export default agent;
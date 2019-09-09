import axios from "axios";
import { Service } from "axios-middleware";
import { dispatch } from "../store/state";

const service = new Service(axios);
service.register({
    onSync(promise) {
        promise.catch((error) => {
            if (error.response.status === 500){
                dispatch({ type: "showSnackbar", data: { show: true, message: "Something went wrong", variant: "error" } });
            }
        });
        return promise;
    }
});

export const api = axios.create({
    withCredentials: true,
    baseURL: "https://auth.ctsbaltic.com/api/"
 //   baseURL: "http://localhost:51581/api/"
});
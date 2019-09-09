import { useGlobalState } from "./state";

export interface ISnackbar {
    show: boolean;
    variant: string;
    message: string;
}

export const initialSnackbarState: ISnackbar = {
    show: false,
    variant: "",
    message: ""
}

export type SnackbarAction = HideSnackbarAction | ShowSnackbarAction;

type HideSnackbarAction = { type: "hideSnackbar", data: string };
type ShowSnackbarAction = { type: "showSnackbar", data: ISnackbar };

export const snackbarReducer = (state: ISnackbar = null, action: SnackbarAction) => {
    switch (action.type) {
        case "showSnackbar": return action.data;
        case "hideSnackbar": return { show: false, variant: action.data, message: "" };
        default: return state;
    }
};


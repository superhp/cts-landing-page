import { combineReducers } from "redux";
import { createStore, UseGlobalState } from "react-hooks-global-state/dist/index";
import { Dispatch } from "react";
import { SnackbarAction, ISnackbar, snackbarReducer, initialSnackbarState } from "./snackbarReducer";
// 1. Add new reducer action type, i.e. type ActionTypes = StepAction | NewReducerAction
type ActionTypes = SnackbarAction ;

// 2. Add new reducer state type, i.e. type StateTypes = {settings: ISettings, step: StepTypes, newReducer: INewStateType};
type StateTypes = {snackbar: ISnackbar };

// 3. Register new reducer
const combinedReducer = combineReducers({
    snackbar: snackbarReducer
});

// 4. Create initial state for the new recuder with the same object name as in step 3
const produceInitialState = async () => {

    return {
        snackbar: initialSnackbarState,
    };
};

// eslint-disable-next-line import/no-mutable-exports
export let dispatch: Dispatch<ActionTypes>;

// eslint-disable-next-line import/no-mutable-exports
export let useGlobalState: UseGlobalState<StateTypes>;

export const createGlobalStore = async () => {
    const initialState = await produceInitialState();
    const store = createStore(
        combinedReducer,
        initialState
    );

    // eslint-disable-next-line prefer-destructuring
    dispatch = store.dispatch;
    // eslint-disable-next-line prefer-destructuring
    useGlobalState = store.useGlobalState;
    return store;
};


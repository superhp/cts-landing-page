import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { SnackbarContentWrapper } from "./snackbarContentWrapper";
import { ISnackbar } from "../../store/snackbarReducer";
import { dispatch, useGlobalState } from "../../store/state";

export const Snackbars = (props: ISnackbar) => {
    const [snackbar] = useGlobalState("snackbar");

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                }}
                open={props.show}
                autoHideDuration={4000}
                onClose={() => dispatch({ type: "hideSnackbar", data: snackbar.variant })}

            >
                <SnackbarContentWrapper
                    onClose={() => dispatch({ type: "hideSnackbar", data: snackbar.variant })}
                    variant={props.variant}
                    message={props.message}
                />
            </Snackbar>
        </div>
    );
}
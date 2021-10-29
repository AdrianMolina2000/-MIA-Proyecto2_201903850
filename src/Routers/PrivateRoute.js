import { Redirect, Route } from "react-router";
import useAuth from "../Auth/useAuth";
import { Grid, Button} from '@material-ui/core';


export default function PrivateRoute({ component: Component, ...rest }) {
    const auth = useAuth();

    return (
        <Route {...rest}>
            <Grid container justifyContent="flex-end" style={{ marginTop: "50px", color: "#494949" }}>
                <Button onClick={auth.logout} variant="outlined">
                    Cerrar Sesion
                </Button>
            </Grid>
            {auth.user ?
                <Component />
                :
                <Redirect to="/" />
            }
        </Route>
    )
}
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Paper, Grid, Typography} from '@material-ui/core';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import useAuth from "../Auth/useAuth";
import { useHistory } from 'react-router-dom';




const useStyles = makeStyles(theme => ({
    root:{
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh'
    },

    container:{
        height: '60%',
        marginTop: theme.spacing(10),
        [theme.breakpoints.down(400 + theme.spacing(2)+2)]:{
            marginTop: 0,
            width: '100%',
            height: '100%'
        }
    },
    div:{
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    form:{
        width: '100%',
        marginTop: theme.spacing(1)
    },
    button:{
        margin: theme.spacing(3,0,2)
    },
    error:{
        color: 'red',
        fontFamily: 'Arial',
        fontSize: '14px'
    }

}))
const Login = () => {
    const [body, setBody] = useState({nickname:'', password:''});
    const [loginStatus, setLoginStatus] = useState('');
    const classes = useStyles();
    const auth = useAuth();
    const otra = useHistory();

    const handleChange = e =>{
        setBody({
            ...body, [e.target.name]: e.target.value
        })
    }

    const onSubmit = e =>{
        e.preventDefault();
        axios.post("http://localhost:5670/auth", body)
        .then((response)=>{
            if(typeof(response.data) === typeof(" ")){
                setLoginStatus("Usuario o Contraseña Incorrectos")
            }else{
                setLoginStatus("");
                auth.login({id:response.data[0][0], user:response.data[0][1], dep:response.data[0][3]});
                if(response.data[0][2] === 1){
                    otra.push("/CargarDatos");
                }else if(response.data[0][2] === 2){
                    otra.push("/Coordinador");
                }else if(response.data[0][2] === 3){
                    otra.push("/Revisor");
                }else if(response.data[0][2] === 4){
                    otra.push("/Aplicante");
                }
            }
        });
    }

    return (
        <Grid container component='main' className={classes.root}>
            <Container component={Paper} elevation={24} maxWidth='xs' className={classes.container}>
                <div className={classes.div}>
                    <Typography component='h1' variant='h3'>Log in</Typography>
                    <form className={classes.form}>
                        <TextField
                            fullWidth
                            autoFocus
                            color='primary'
                            margin='normal'
                            variant='outlined'
                            label='Nickname'
                            name='nickname'
                            value={body.nickname}
                            onChange={handleChange}
                            />
                        <TextField
                            fullWidth
                            type='password'
                            color='primary'
                            margin='normal'
                            variant='outlined'
                            label='password'
                            name='password'
                            value={body.password}
                            onChange={handleChange}
                        />
                        <Typography variant='h4' className={classes.error}>{loginStatus}</Typography>
                        <Button
                            fullWidth
                            variant='outlined'
                            color='primary'
                            className={classes.button}
                            onClick={onSubmit}
                        >
                            Ingresar
                        </Button>
                    </form>
                </div>
            </Container>
        </Grid>
    );
}
export default Login;
import React from "react";
import { withStyles } from '@material-ui/core/styles';
import { Grid, Card, TextField, Button } from "@material-ui/core";
import { Link } from 'react-router-dom';
import axios from 'axios';
const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});


class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            username: "",
            password: ""
        }
        this.onChange = this.onChange.bind(this);
        this.onChangee = this.onChangee.bind(this);
        this.submitLogin = this.submitLogin.bind(this);

    }

    onChange(e)  {
        this.setState({
            username: e.target.value
        })
    }
    onChangee(e)  {
        this.setState({
            password: e.target.value
        })
    }

    submitLogin() {
        axios.post('/login', {
            username: this.state.username,
            password: this.state.password
        }).then(() => {

            window.location.href = '/main';
        }).catch((err) => {
            alert('password or username is wrong');
            alert(err)
        });
    }

    render() {
        const { classes } = this.props
        console.log(this.state.password)
        return (
            <div style={{ marginBottom: "325px" }}>
                <Grid container justify="space-around" alignItems="center" direction="column">

                    <Grid item xs={6} >
                        <img alt=""

                            style={{
                                height: "250px",
                                width: "250px",
                                margin: "40px",
                                marginBottom: "20px"
                            }}
                            src={require('../assets/logo.png')} />
                    </Grid>

                    <Grid item xs={6}>
                        <Card style={{ padding: 30 }}>
                            <Grid container direction="column" alignItems="center">
                                <Grid item >
                                    <TextField
                                        label="User Name"
                                        placeholder="User Name"
                                        margin="normal"
                                        className={classes.textField}
                                        onChange={this.onChange}
                                    />
                                </Grid>
                                <Grid item >

                                    <TextField
                                        id="password-input"
                                        label="Password"
                                        type="password"
                                        className={classes.textField}
                                        autoComplete="current-password"
                                        margin="normal"
                                        onChange={this.onChangee}
                                    />
                                </Grid>
                                <Grid item >
                                    <Button variant="contained"
                                        color="primary" className={classes.button} onClick={this.submitLogin}>
                                        Login

                                 </Button>

                                </Grid>

                                Dont have an account yet?  <a href="/signup" variant="contained"
                                    color="primary" className={classes.button}>Sign up</a>

                            </Grid>

                        </Card>

                    </Grid>

                </Grid>



            </div>
        )
    }
}

export default withStyles(styles)(Login)
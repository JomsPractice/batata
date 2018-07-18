import React from "react";
import { withStyles } from '@material-ui/core/styles';
import { Grid, Card, TextField, Button } from "@material-ui/core"
import { Link } from 'react-router-dom'
import axios from 'axios'
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
            userName: "",
            password: "",
            confirmPass:"",
            fullName:"",
            Email:""
        }
        this.submitRegister = this.submitRegister.bind(this)
    }

    submitRegister () {
        if(this.state.password === this.state.confirmPass){
        axios.post('/signup', {
            username: this.state.userName,
            password: this.state.password,
            email:this.state.Email,
            fullName:this.state.fullName
        })
            .then(() => {
                // window.location.href = '/home';
              }).catch(() => {
                alert('username is exist');
              });
        }else{
            alert("password doesn't match!")
        }      
    }


    render() {
        const { classes } = this.props
        console.log(this.state)
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
                            src={{uri : 'data:image/jpeg;base64,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'}} />
                    </Grid>

                    <Grid item xs={6}>
                        <Card style={{ padding: 30 }}>
                            <Grid container direction="column" alignItems="center">
                                <Grid item >
                                    <TextField
                                        label="Full Name"
                                        placeholder="Full Name"
                                        margin="normal"
                                        className={classes.textField}
                                        onChange={(e)=>this.setState({fullName:e.target.value})}
                                    />
                                </Grid>
                                 <Grid item >
                                    <TextField
                                        label="username"
                                        placeholder="username"
                                        margin="normal"
                                        className={classes.textField}
                                        onChange={(e)=>this.setState({userName:e.target.value})}
                                    />
                                </Grid>
                                 <Grid item >
                                    <TextField
                                        label="Email"
                                        placeholder="Email"
                                        margin="normal"
                                        className={classes.textField}
                                        onChange={(e)=>this.setState({Email:e.target.value})}
                                    />
                                </Grid>
                                <Grid item >

                                    <TextField
                                        id="password-input"
                                        label="Password"
                                        type="password"
                                        className={classes.textField}
                                        autoComplete="current-password"
                                        onChange={(e)=>this.setState({password:e.target.value})}
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item >

                                    <TextField
                                        id="password-input"
                                        label="confirm passowrd"
                                        type="passowrd"
                                        className={classes.textField}
                                        autoComplete="current-password"
                                        onChange={(e)=>this.setState({confirmPass:e.target.value})}
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid item >
                                <Button 
                                    variant="contained"
                                    onClick={this.submitRegister}
                                    color="primary" className={classes.button}>
                                    Register
                                 </Button>
                                 
                                </Grid>

                              
                            </Grid>

                        </Card>

                    </Grid>

                </Grid>
                
              

            </div>
        )
    }
}

export default withStyles(styles)(Login)
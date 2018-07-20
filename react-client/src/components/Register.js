import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, TextField, Button, Checkbox } from '@material-ui/core';
import Axios from 'axios';
import DatePicker from 'react-date-picker';
import moment from 'moment';



const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 5,
        textAlign: "center"
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    button: {
        margin: theme.spacing.unit,
    },
});
class Register extends React.Component {
    constructor() {
        super()
        this.state = {
            type: "",
            model: "",
            data: undefined,
            startDate: moment(),
            checked: false

        }
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
    }
    handleChange(date) {
        this.setState({
            startDate: date,
        });
        console.log(date)
    }

    componentWillMount() {
        Axios.get("/home")
            .then((res) => {
                console.log(res.data)
                this.setState({ data: res.data })
            }).catch((err) => { console.log(err) })
    }
    onSubmit() {
        var that = this
        if (that.state.type.length && that.state.model.length)
            Axios.post("/home", {
                type: that.state.type,
                model: that.state.model,
                time: that.state.startDate,
                underMaintainace: that.state.checked
            }).then(() => {
                console.log("saved")
            }).catch((err) => {
                console.log(err)
            })
    }
    handleToggle() {
        this.setState({ checked: !this.state.checked })
    }


    render() {
        const { classes } = this.props
        return (
            <div>
                <Paper className={classes.root} elevation={5}>
                    <p>Regester a machine</p>
                    <Grid container justify='center' alignItems="center" direction="column">
                        <Grid item xs={3}>
                            <TextField
                                label="Type"
                                placeholder="Type"
                                margin="normal"
                                onChange={(e) => this.setState({ type: e.target.value })}
                                className={classes.textField}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                label="model"
                                placeholder="model"
                                margin="normal"
                                className={classes.textField}
                                onChange={(e) => this.setState({ model: e.target.value })}
                            />
                        </Grid>

                        <DatePicker
                            selected={this.state.date}
                            onChange={this.handleChange}
                        />
                        <p>Under Maintainace?</p>
                        <Checkbox
                            onChange={this.handleToggle.bind(this)}
                            checked={this.state.checked}
                        />
                    </Grid>
                    <Button variant="contained"
                        color="primary" className={classes.button} onClick={this.onSubmit}>
                        Submit
                    </Button>
                </Paper>
            </div>
        )
    }
}
Register.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Register)
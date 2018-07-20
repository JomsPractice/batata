import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, TextField, Button } from '@material-ui/core';
import Axios from 'axios';



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
class Search extends React.Component {
    constructor() {
        super()
        this.state = {
            type: "",
            model: "",
            data: undefined,
        }
        this.onSubmit = this.onSubmit.bind(this)
    }
    onSubmit() {
        var that = this
        if (that.state.type.length && that.state.model.length)
            Axios.post("/search", {
                type: that.state.type,
                model: that.state.model,
            }).then((res) => {
                that.setState({ data: res.data })
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
    }


    render() {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <p>Search for a machine</p>
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
                </Grid>
                <Button variant="contained"
                    color="primary" className={classes.button} onClick={this.onSubmit}>
                    Submit
                    </Button>
                    <Grid item xs={4}>
                    </Grid> 
            </div>
        )
    }
}
Search.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Search)
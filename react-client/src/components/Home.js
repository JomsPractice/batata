import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Register from "./Register";
import Search from './Search'

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

class TabsWrappedLabel extends React.Component {
    constructor() {
        super()
        this.state = {
            value: 'one',
        };
    }


    handleChange (event, value)  {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={value} onChange={this.handleChange.bind(this)}>
                        <Tab value="one" label="Register a machine" />
                        <Tab value="two" label="Search for a machine" />
                        <Tab value="three" label="Delete a machine" />
                    </Tabs>
                </AppBar>
                {value === 'one' && <Register />}
                {value === 'two' && <Search />}
                {value === 'three' && <TabContainer>Item Three</TabContainer>}
            </div>
        );
    }
}

TabsWrappedLabel.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TabsWrappedLabel);
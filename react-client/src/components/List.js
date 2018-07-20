import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

class CheckboxListSecondary extends React.Component {
    constructor() {
        super()
        this.state = {
            checked: false,
        }
    }
    ;

    handleToggle() {

        this.setState({
            checked: !this.state.checked,
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <List>
                        <ListItem key={this.props.key} dense button className={classes.listItem}>
                            <Avatar alt="" src={this.props.src} />
                            <ListItemText primary={this.props.type} />
                            <ListItemSecondaryAction>
                                <Checkbox
                                    onChange={this.handleToggle.bind(this)}
                                    checked={this.props.checked}
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                </List>
            </div>
        );
    }
}

CheckboxListSecondary.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxListSecondary);
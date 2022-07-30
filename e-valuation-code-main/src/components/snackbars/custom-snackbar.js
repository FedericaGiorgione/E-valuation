import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  snackbar: {
    [theme.breakpoints.down('xs')]: {
      bottom: props => props.bottom,
      // parametro bottom per impostare 
      // la distanza dal fondo della pagina
    },
  },
}));

export default function CustomSnackbar(props) {
    const {setVisible, visible, title, autoHideDuration=1800, severity='success'} = props
    const classes = useStyles(props);
    //useStyles serve ???
  
    const handleClose = () => {
      setVisible(false);
    };
  
    return (
      <div>
        <Snackbar 
          open={visible}
          autoHideDuration={autoHideDuration}
          onClose={handleClose}
          className={classes.snackbar}
        >
          <Alert onClose={handleClose} severity={severity}>
            {title}
          </Alert>
        </Snackbar>
      </div>
    );
  }




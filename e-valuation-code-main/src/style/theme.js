import amber from '@material-ui/core/colors/amber'
import indigo from '@material-ui/core/colors/indigo'

const theme = {
  palette: {
    primary: indigo,
    secondary: {
      // orange,
      ...amber,
      main: '#ffc107',
      contrastText: '#fff'
    },
    background: {
      default: '#EAEAEA'
    }
  }
}

export default theme

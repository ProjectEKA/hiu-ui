import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: '#c8c8c8',
        padding: theme.spacing(1,2),
        textTransform:'uppercase',
        borderTopLeftRadius:theme.spacing(0.625),
        fontSize:'0.875rem',
        marginBottom: theme.spacing(0.25)
    },
    description: {
        textTransform:'none',
        marginLeft:theme.spacing(4),
        fontWeight: '400',
        fontSize: '0.875rem'
    }
}));

export default useStyles;
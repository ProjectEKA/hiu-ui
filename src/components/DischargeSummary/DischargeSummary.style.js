import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: '#c8c8c8',
        padding: theme.spacing(1,2),
        borderRadius:theme.spacing(0.625),
        marginBottom: theme.spacing(0.25)
    },
    title: {
        letterSpacing: '1px',
        lineHeight: '1.5rem',
        textTransform:'uppercase',
    },
    description: {
        fontWeight: '400',
        fontSize: '0.875rem',
    },
    label: {
      fontWeight: '500',
    },
    period: {
      lineHeight: '1.5rem',
    },
}));

export default useStyles;

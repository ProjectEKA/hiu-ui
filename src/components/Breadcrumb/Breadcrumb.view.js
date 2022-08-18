import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Config from "../../Config";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#f1f1f1',
    padding: theme.spacing(1),
  },
}));

const Breadcrumb = () => {
  const classes = useStyles();
  return (
    <Breadcrumbs className={classes.container} aria-label="breadcrumb">
      <Link color="inherit" href={Config.BASE_NAME}>
        Consent List
      </Link>
      <Typography color="textPrimary">Health Data</Typography>
    </Breadcrumbs>
  );
};

export default Breadcrumb;

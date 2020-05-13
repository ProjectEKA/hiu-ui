import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { formatDateString } from '../common/HealthInfo/FhirResourcesUtils';

const useStyles = makeStyles((theme) => ({
  table: {
    clear: 'both',
    backgroundColor: theme.palette.primary.main,
  },
  title: {
    textTransform: 'uppercase',
  },
}));

const ConsentsListTable = ({ loadConsents, consentsList }) => {
  const classes = useStyles();
  const [refreshCounter, setRefreshCounter] = useState(0);
  useEffect(() => {
    loadConsents();
  }, [refreshCounter]);

  const headerRow = {
    name: 'Name',
    jataayuId: 'Jataayu ID',
    requestStatus: 'Request Status',
    consentGrantedDate: 'Consent granted on',
    consentExpiryDate: 'Consent expiry on',
    consentCreatedDate: 'Consent created on',
  };

  function isGrantedConsent(status) {
    return status === 'GRANTED';
  }

  function getPatientFullName(patient) {
    return `${patient.firstName} ${patient.lastName}`;
  }

  return (
    <div style={{ maxWidth: '100%' }}>
      <MaterialTable
        options={{
          headerStyle: {
            backgroundColor: '#009688',
            color: '#FFF',
          },
        }}
        className={classes.table}
        columns={[
          { title: headerRow.name, field: 'name' },
          { title: headerRow.jataayuId, field: 'id' },
          { title: headerRow.requestStatus, field: 'status' },
          { title: headerRow.consentGrantedDate, field: 'grantedOn' },
          { title: headerRow.consentExpiryDate, field: 'expiredOn' },
          { title: headerRow.consentCreatedDate, field: 'createdOn' },
          { title: '', field: 'navLink', width: 50 },
        ]}
        data={consentsList.map((consent) => ({
          name: getPatientFullName(consent.patient),
          id: consent.patient.id,
          status: isGrantedConsent(consent.status)
            ? 'Consent granted'
            : 'Request sent',
          grantedOn: isGrantedConsent(consent.status)
            ? formatDateString(consent.approvedDate)
            : '-',
          expiredOn: isGrantedConsent(consent.status)
            ? formatDateString(consent.expiredDate)
            : '-',
          createdOn: formatDateString(consent.createdDate),
          navLink: isGrantedConsent(consent.status) ? (
            <Link to={`/health-info/${consent.id}`}>
              <ArrowForwardIosIcon color="primary" />
            </Link>
          ) : (
            ''
          ),
        }))}
        title={(
          <Typography className={classes.title} variant="h5">
            Consent List
          </Typography>
        )}
        actions={[
          {
            icon: 'refresh',
            tooltip: 'Refresh',
            isFreeAction: true,
            onClick: () => setRefreshCounter(refreshCounter + 1)
          }
        ]}
      />
    </div>
  );
};

const consentShape = PropTypes.shape({
  id: PropTypes.string,
  patient: PropTypes.shape({
    id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }),
  status: PropTypes.string,
  approvedDate: PropTypes.string,
  expiredDate: PropTypes.string,
  createdDate: PropTypes.string,
});

ConsentsListTable.propTypes = {
  loadConsents: PropTypes.func.isRequired,
  consentsList: PropTypes.arrayOf(consentShape).isRequired,
};

export default ConsentsListTable;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { formatDateString } from '../common/HealthInfo/FhirResourcesUtils';
import compareDates from '../common/DateUtil';

const useStyles = makeStyles(theme => ({
  table: {
    clear: 'both',
    backgroundColor: theme.palette.primary.main
  },
  title: {
    textTransform: 'uppercase'
  }
}));

const ConsentsListTable = ({ loadConsents, consentsList, loading }) => {
  const classes = useStyles();
  const [refreshCounter, setRefreshCounter] = useState(0);
  useEffect(() => {
    loadConsents();
  }, [refreshCounter]);

  const headerRow = {
    name: 'Name',
    jataayuId: 'Patient Identifier',
    requestStatus: 'Request Status',
    consentGrantedDate: 'Consent granted on',
    consentExpiryDate: 'Consent expiry on',
    consentCreatedDate: 'Consent created on'
  };

  function getStatusText(status) {
    switch (status.toUpperCase()) {
      case 'GRANTED':
        return 'Consent Granted';
      case 'POSTED':
        return 'Request Initiated';
      case 'ERRORED':
        return 'Request failed';
      case 'DENIED':
        return 'Request Denied';
      case 'REVOKED':
      return 'Consent Revoked';
      case 'EXPIRED':
      return 'Consent Expired';
      default:
        return 'Request sent';
    }
  }

  function isGranted(status) {
    return status.toUpperCase() == 'GRANTED';
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
            color: '#FFF'
          }
        }}
        isLoading={loading}
        className={classes.table}
        columns={[
          { title: headerRow.name, field: 'name' },
          { title: headerRow.jataayuId, field: 'id' },
          { title: headerRow.requestStatus, field: 'status' },
          {
            title: headerRow.consentCreatedDate,
            field: 'createdOn',
            customSort: (a, b) => compareDates(a.createdOn, b.createdOn)
          },
          {
            title: headerRow.consentGrantedDate,
            field: 'grantedOn',
            customSort: (a, b) => compareDates(a.grantedOn, b.grantedOn)
          },
          {
            title: headerRow.consentExpiryDate,
            field: 'expiredOn',
            customSort: (a, b) => compareDates(a.expiredOn, b.expiredOn)
          },
          { title: '', field: 'navLink', width: 50 }
        ]}
        data={consentsList
          .sort((a, b) => {
            const dateA = new Date(a.createdDate);
            const dateB = new Date(b.createdDate);
            return dateB - dateA;
          })
          .map(consent => ({
            name: getPatientFullName(consent.patient),
            id: consent.patient.id,
            status: getStatusText(consent.status),
            grantedOn: isGranted(consent.status)
              ? formatDateString(consent.approvedDate, true)
              : '-',
            expiredOn: isGranted(consent.status)
              ? formatDateString(consent.expiredDate, true)
              : '-',
            createdOn: formatDateString(consent.createdDate, true),
            navLink: isGranted(consent.status) ? (
              <Link to={`/health-info/${consent.consentRequestId}`}>
                <ArrowForwardIosIcon color="primary" />
              </Link>
            ) : (
              ''
            )
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
    lastName: PropTypes.string
  }),
  status: PropTypes.string,
  approvedDate: PropTypes.string,
  expiredDate: PropTypes.string,
  createdDate: PropTypes.string
});

ConsentsListTable.propTypes = {
  loadConsents: PropTypes.func.isRequired,
  consentsList: PropTypes.arrayOf(consentShape).isRequired,
  loading: PropTypes.bool
};

ConsentsListTable.defaultProps = {
  loading: false
};

export default ConsentsListTable;

import { connect } from 'react-redux';
import LandingPage from './LandingPage';
import { onCreateConsentResetState } from '../../redux/actions/createConsentActions';
import { onSearchResetState } from '../../redux/actions/searchPatientIdActions';
import { loadConsents } from '../../redux/actions/loadConsentsActions';
import { fetchValueSetsRequest as loadConfigValueSets } from '../../redux/actions/initAppActions';
import { fetchConfigRequest as loadCMConfigurations } from '../../redux/actions/configAppActions';
import getNestedObject from '../../utils/getNestedObject';

const mapStateToProps = (state) => ({
  success: getNestedObject(state, 'createConsent.success'),
});

const mapDispatchToProps = {
  onCreateConsentResetState,
  onSearchResetState,
  loadConsents,
  loadConfigValueSets,
  loadCMConfigurations,
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);

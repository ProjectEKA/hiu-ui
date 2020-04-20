import { connect } from "react-redux";
import LandingPage from "./LandingPage";
import { onCreateConsentResetState } from "../../redux/actions/createConsentActions";
import { onSearchResetState } from "../../redux/actions/searchPatientIdActions";
import { loadConsents } from "../../redux/actions/loadConsentsActions";
import { fetchValueSetsRequest as loadConfigValueSets } from "../../redux/actions/initAppActions"

const mapStateToProps = state => ({
  success: state.createConsent.success
});

const mapDispatchToProps = {
  onCreateConsentResetState,
  onSearchResetState,
  loadConsents,
  loadConfigValueSets
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);

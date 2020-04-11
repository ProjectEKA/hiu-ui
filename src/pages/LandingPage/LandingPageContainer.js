import { connect } from "react-redux";
import LandingPage from "./LandingPage";
import { onCreateConsentResetState } from "../../redux/actions/createConsentActions";
import { onSearchResetState } from "../../redux/actions/searchPatientIdActions";
import { loadConsents } from "../../redux/actions/loadConsentsActions";

const mapStateToProps = state => ({
  success: state.createConsent.success
});

const mapDispatchToProps = {
  onCreateConsentResetState,
  onSearchResetState,
  loadConsents
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);

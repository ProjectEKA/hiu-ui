import { connect } from "react-redux";
import LandingPage from "./LandingPage";
import { onCreateConsentResetState } from "../../redux/actions/createConsentActions";
import { onSearchResetState } from "../../redux/actions/searchPatientIdActions";

const mapStateToProps = state => ({
  success: state.createConsent.success
});

const mapDispatchToProps = {
  onCreateConsentResetState,
  onSearchResetState
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);

import { connect } from "react-redux";
import LandingPage from "./LandingPage";
import { onCreateConsentResetState } from "../../redux/actions/createConsentActions";

const mapStateToProps = state => ({
  success: state.createConsent.success
});

const mapDispatchToProps = {
  onCreateConsentResetState
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);

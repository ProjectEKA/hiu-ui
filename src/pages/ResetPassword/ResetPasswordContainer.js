import _ from 'lodash';
import { connect } from 'react-redux';
import ResetPassword from './ResetPassword';
import { onResetPassword } from '../../redux/actions/onResetPasswordActions';

const mapStateToProps = (state) => ({
  error: _.get(state, 'resetPassword.error'),
  errorMessage: _.get(state, 'resetPassword.errorMessage'),
});

const mapDispatchToProps = {
  onResetPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);

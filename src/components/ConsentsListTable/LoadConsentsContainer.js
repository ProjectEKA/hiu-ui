import { connect } from 'react-redux';
import ConsentsListTable from './ConsentsListTable';
import { loadConsents } from '../../redux/actions/loadConsentsActions';
import getNestedObject from '../../utils/getNestedObject';

const mapStateToProps = (state) => ({
  consentsList: getNestedObject(state, 'loadConsents.consentsList'),
});

const mapDispatchToProps = {
  loadConsents,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsentsListTable);

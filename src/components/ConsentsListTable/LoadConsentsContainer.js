import React from "react";
import { connect } from "react-redux";
import ConsentsListTable from "./ConsentsListTable";
import { loadConsents } from "../../redux/actions/loadConsentsActions";

const mapStateToProps = state => ({
  consentsList: state.loadConsents.consentsList
});

const mapDispatchToProps = {
  loadConsents
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsentsListTable);

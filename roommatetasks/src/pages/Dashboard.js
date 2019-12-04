import React from 'react';
import { connect } from 'react-redux';

const Dashboard = ({ email }) => {
  return (
    <div>
      <h2>Dashboard</h2>
      <div>Welcome {email}</div>
    </div>
  );
};

export default connect(state => ({
  email: state.userReducer.email,
}))(Dashboard);

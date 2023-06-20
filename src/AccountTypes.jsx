import React from "react";

const AccountTypes = ({ accountType, types }) => {
  const getAccountTypeTitle = () => {
    const matchingType = types.find((accType) => accType.id === accountType);
    return matchingType ? matchingType.title : null;
  };

  return <div>{getAccountTypeTitle()}</div>;
};

export default AccountTypes;
  
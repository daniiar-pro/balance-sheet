import React, { useState, useEffect } from "react";
import axios from "axios";
import AccountTypes from "./AccountTypes";
import ErrorMessage from "./components/ErrorMessage";
import LoadingSpinner from "./components/LoadingSpinner";
import { X_APIKEY, ACCOUNTS_URL, ACC_TYPES } from "./utility/constants";

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [accountTypes, setAccountTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const [accountsResponse, accountTypesResponse] = await Promise.all([
          axios.get(ACCOUNTS_URL, { headers: { "x-apikey": X_APIKEY } }),
          axios.get(ACC_TYPES, { headers: { "x-apikey": X_APIKEY } }),
        ]);

        setAccounts(accountsResponse.data);
        setAccountTypes(accountTypesResponse.data);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAccountData();
  }, []);

  const renderTable = () => {
    if (loading) {
      return <LoadingSpinner />;
    } else if (errorMessage) {
      return <ErrorMessage message={errorMessage} />;
    } else {
      return (
        <table className="accounts-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Profit &amp; Loss</th>
              <th>Account Type</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account.id}>
                <td>{account.name}</td>
                <td>
                  {account.currency} {account.profitLoss}
                </td>
                <td>
                  <AccountTypes
                    accountType={account.accountType}
                    types={accountTypes}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {renderTable()}
    </div>
  );
};

export default Accounts;

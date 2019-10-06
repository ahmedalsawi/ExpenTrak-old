import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import apiObject from "api/index";

function TransactionsListView({ transactions }) {
  return (
    <div>
      <ul className="list-group list-group-flush">
        {transactions.map(item => (
          <li key={item._id} className="list-group-item">
            <Link to={`transactions/${item._id}`}>
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{item.name}</h5>
                <small>{item.amount} fdfdfd</small>
              </div>
              <p></p>
              <small></small>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TransactionsList(props) {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let didCancel = false;

    async function fetchData() {
      setIsLoading(true);
      setIsError(false);

      try {
        const data = await apiObject.transactionAPI.getAllRes();
        if (!didCancel) setTransactions(data);
      } catch (err) {
        console.log(err);
        setIsError(true);
      }

      setIsLoading(false);
    }

    fetchData();

    return () => {
      didCancel = true;
    };
  }, []);

  const view =
    transactions.length === 0 ? (
      <p>No Transaction</p>
    ) : (
      <TransactionsListView transactions={transactions} />
    );

  return (
    <React.Fragment>
      {isError ? <h1>Error</h1> : isLoading ? <div>Loading ...</div> : view}
    </React.Fragment>
  );
}

export default TransactionsList;

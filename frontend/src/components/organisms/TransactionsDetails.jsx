import React, { useState, useEffect } from "react";

import apiObject from "api/index";

import NotFound404Page from "components/pages/NotFound404Page";

import TransactionsForm from "components/organisms/TransactionsForm";

function TransactionsDetailsView({ transaction, onDelete, onEdit }) {
  return (
    <div>
      <button onClick={onDelete}>Delete</button>
      <button onClick={onEdit}>Edit</button>
      <p>Name: {transaction.name} </p>
      <p>Amount: {transaction.amount}</p>
      <p>Date: {transaction.date}</p>
    </div>
  );
}

function TransactionsDetails(props) {
  const [transaction, setTransaction] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    let didCancel = false;

    async function fetchData() {
      setIsLoading(true);
      setIsError(false);

      try {
        const data = await apiObject.transactionAPI.getOneRes(
          props.match.params.Id
        );
        if (!didCancel) setTransaction(data);
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
  }, [props.match.params.Id]);

  const onDelete = async () => {
    try {
      await apiObject.transactionAPI.deleteOneRes(transaction._id);
      props.history.push("/transactions");
    } catch (err) {
      console.log(err);
    }
  };

  const onEdit = async () => {
    setIsEdit(true);
  };

  const view = isEdit ? (
    <TransactionsForm transaction={transaction} {...props} />
  ) : (
    <TransactionsDetailsView
      transaction={transaction}
      onDelete={onDelete}
      onEdit={onEdit}
    />
  );

  return (
    <React.Fragment>
      {isError ? (
        <NotFound404Page />
      ) : isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div>{view}</div>
      )}
    </React.Fragment>
  );
}

export default TransactionsDetails;

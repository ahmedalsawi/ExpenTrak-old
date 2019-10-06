import {
  API
} from "./APIUtils"

const apiObject = {
  transactionAPI: new API("/api/transactions"),
  labelsAPI: new API("/api/labels"),
  accountsAPI: new API("/api/accounts")
}

export default apiObject;
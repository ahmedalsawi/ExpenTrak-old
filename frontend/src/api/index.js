import {
  API
} from "./APIUtils"

const apiObject = {
  transactionAPI: new API("/api/transactions")
}

export default apiObject;
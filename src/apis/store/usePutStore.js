import { useMutation } from "@tanstack/react-query"
import { fetchInstance } from "../instance"

async function putStore(store) {
  const requestBody = {
    Name: store.Name,
    Address: store.Address,
    phoneNumber: store.phoneNumber,
  }

  const response = await fetchInstance().post("/store/edit", requestBody)
  return response.data
}

const usePutStore = () => {
  const { mutate, status } = useMutation(putStore, {
    onSuccess: (data) => {
      console.log("Store successfully registered:", data)
    },
    onError: (err) => {
      console.error("Error while registering store:", err)
    },
  })

  return {
    mutate,
    status,
  }
}

export default usePutStore

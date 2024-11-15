import { useMutation } from "@tanstack/react-query"
import { fetchInstance } from "../instance"

async function postStore(store) {
  const requestBody = {
    marketName: store.marketName,
    address: store.address,
    phoneNumber: store.phoneNumber,
  }

  const response = await fetchInstance().post("/store", requestBody)
  return response.data
}

const usePostStore = (store) => {
  const { mutate, status } = useMutation({
    mutationFn: () => postStore(store),
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

export default usePostStore

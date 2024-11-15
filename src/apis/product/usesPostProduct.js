import { useMutation } from "@tanstack/react-query"
import { fetchInstance } from "../instance"

async function postProduct(search) {
  const requestBody = {
    name: search.name,
    price: search.price,
    imageUrl: search.imageUrl,
    description: search.description,
    expirationDate: search.expirationDate,
    number: search.number,
    marketId: search.marketId,
  }

  const response = await fetchInstance().post("/food/register", requestBody)
  return response.data
}

const usePostProduct = (search) => {
  const { mutate, status } = useMutation({
    mutationFn: () => mutationpostProduct(search),
    onSuccess: (data) => {
      console.log("Product successfully registered:", data)
    },
    onError: (err) => {
      console.error("Error while registering product:", err)
    },
  })

  return {
    mutate,
    status,
  }
}

export default usePostProduct

import { useMutation } from "@tanstack/react-query"
import { fetchInstance } from "../instance"

async function deleteProduct(foodId) {
  const response = await fetchInstance().delete(`/food/${foodId}`)
  return response.data
}

const useDeleteProduct = () => {
  const { mutate, status } = useMutation(deleteProduct, {
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

export default useDeleteProduct

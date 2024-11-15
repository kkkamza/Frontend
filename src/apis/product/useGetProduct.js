import { useQuery } from "@tanstack/react-query"

import { fetchInstance } from "../instance"
import QUERY_KEYS from "../queryKeys"

async function getProduct(foodId) {
  const response = await fetchInstance().get(`/food/${foodId}`)
  return response.data
}

const useGetProduct = (foodId) => {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.PRODUCT_DETAIL, foodId],
    queryFn: () => getProduct(foodId),
  })

  return { data }
}

export default useGetProduct

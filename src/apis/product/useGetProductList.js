import { useQuery } from "@tanstack/react-query"

import { fetchInstance } from "../instance"
import QUERY_KEYS from "../queryKeys"

async function getProductList() {
  const response = await fetchInstance().get("/food/list")
  return response.data
}

const useGetProductList = () => {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.PRODUCT_LIST],
    queryFn: () => getProduct(foodId),
  })

  return { data }
}

export default useGetProductList

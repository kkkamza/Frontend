import { useQuery } from "@tanstack/react-query"

import { fetchInstance } from "../instance"
import QUERY_KEYS from "../queryKeys"

async function getDonate() {
  const response = await fetchInstance().get("/main")
  return response.data
}

const useGetProduct = () => {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.DONATE],
    queryFn: () => getDonate(),
  })

  return { data }
}

export default useGetProduct

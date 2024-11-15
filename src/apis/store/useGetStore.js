import { useSuspenseQuery } from "@tanstack/react-query"

import { fetchInstance } from "../instance"
import QUERY_KEYS from "../queryKeys"

async function getStore(marketId) {
  const response = await fetchInstance().get(`/store/${marketId}`)
  return response.data
}

const useGetStore = (marketId) => {
  const { data } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.STORE_DETAIL, marketId],
    queryFn: () => getStore(marketId),
  })

  return { data }
}

export default useGetStore

import { useQuery } from "@tanstack/react-query"

import { fetchInstance } from "../instance"
import QUERY_KEYS from "../queryKeys"

async function getStoreList() {
  const response = await fetchInstance().get("/store/list")
  return response.data
}

const useGetStoreList = () => {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.STORE_LIST],
    queryFn: () => getStoreList(),
  })

  return { data }
}

export default useGetStoreList

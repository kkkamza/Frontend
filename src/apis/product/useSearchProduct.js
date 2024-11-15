import { useSuspenseQuery } from "@tanstack/react-query"

import { fetchInstance } from "../instance"
import QUERY_KEYS from "../queryKeys"

async function getSearch(search) {
  const response = await fetchInstance().get("/food/search", {
    params: {
      query: search,
    },
  })
  return response.data
}

const useSearchProduct = (search) => {
  const { data } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.SEARCH_LIST, search],
    queryFn: () => getSearch(search),
  })

  return { data }
}

export default useSearchProduct

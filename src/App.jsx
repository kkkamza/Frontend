import { QueryClientProvider } from "@tanstack/react-query"
import queryClient from "./apis/queryClient"
import Routes from "./routes"

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes />
      </QueryClientProvider>
    </>
  )
}

export default App

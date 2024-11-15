import styled from "@emotion/styled"
import React, { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { useSearchParams } from "react-router-dom"
import useDeleteProduct from "../../apis/product/useDeleteProduct"
import useSearchProduct from "../../apis/product/useSearchProduct"

const SearchPageContent = () => {
  const [searchParams] = useSearchParams()
  const initialSearchWord = searchParams.get("query") || ""
  console.log(initialSearchWord)

  const { data } = useSearchProduct(initialSearchWord)

  console.log(data)

  const { mutate } = useDeleteProduct(1)

  const test = mutate()

  return (
    <Wrapper>
      {data?.map((product) => (
        <div key={product.id}>
          <div>{product.name}</div>
          <div>{product.price}</div>
          <div>{product.description}</div>
        </div>
      ))}
    </Wrapper>
  )
}

const SearchPage = () => {
  return (
    <ErrorBoundary fallback={<div>Error...</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <Wrapper>
          <SearchPageContent />
        </Wrapper>
      </Suspense>
    </ErrorBoundary>
  )
}

export default SearchPage

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`

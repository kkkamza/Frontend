import styled from "@emotion/styled"
import React from "react"
import { FoodItem } from "./FoodItem"

const randomItem = [
  {
    name: "랜덤박스 A",
    price: 10000,
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1679957333039-285fb913aa2b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fCVFQiVBQyVCQyVFQyU5RCU4QyVFRCU5MSU5QyVFQiVCMCU5NSVFQyU4QSVBNHxlbnwwfHwwfHx8MA%3D%3D",
    description: "사과, 배, 감 등.. 다양한 과일",
    number: 10,
    marketId: 1,
  },
  {
    name: "랜덤박스 B",
    price: 20000,
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1679957333039-285fb913aa2b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fCVFQiVBQyVCQyVFQyU5RCU4QyVFRCU5MSU5QyVFQiVCMCU5NSVFQyU4QSVBNHxlbnwwfHwwfHx8MA%3D%3D",
    description: "사과, 배, 감 등.. 다양한 과일",
    number: 5,
    marketId: 2,
  },
  {
    name: "랜덤박스 C",
    price: 30000,
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1679957333039-285fb913aa2b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fCVFQiVBQyVCQyVFQyU5RCU4QyVFRCU5MSU5QyVFQiVCMCU5NSVFQyU4QSVBNHxlbnwwfHwwfHx8MA%3D%3D",
    description: "사과, 배, 감 등.. 다양한 과일",
    number: 8,
    marketId: 3,
  },
  {
    name: "랜덤박스 D",
    price: 50000,
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1679957333039-285fb913aa2b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fCVFQiVBQyVCQyVFQyU5RCU4QyVFRCU5MSU5QyVFQiVCMCU5NSVFQyU4QSVBNHxlbnwwfHwwfHx8MA%3D%3D",
    description: "사과, 배, 감 등.. 다양한 과일",
    number: 3,
    marketId: 4,
  },
]
const RandomBox = () => {
  return (
    <Wrapper>
      {randomItem.map((item, index) => (
        <FoodItem
          key={index}
          name={item.name}
          price={item.price}
          imageUrl={item.imageUrl}
          description={item.description}
          number={item.number}
          marketId={item.marketId}
        />
      ))}
    </Wrapper>
  )
}

export default RandomBox

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 20%;
  width: 100%;
  gap: 20px;
`

import styled from "@emotion/styled"
import React from "react"

export const FoodItem = ({ name, price, imageUrl, description, number }) => {
  return (
    <Wrapper>
      <ImageWrapper>
        <Image src={imageUrl} alt={name} />
      </ImageWrapper>
      <ContentWrapper>
        <FoodName>{name}</FoodName>
        <FoodPrice>{price.toLocaleString()}원</FoodPrice>
        <FoodDescription>{description}</FoodDescription>
        <FoodQuantity>수량: {number}개</FoodQuantity>
      </ContentWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 300px;
  max-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  overflow: hidden; /* 넘치는 부분을 숨깁니다 */

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
`

const ImageWrapper = styled.div`
  width: 100%;
  height: 200px; /* 이미지 영역의 높이를 고정 */
  overflow: hidden;
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* 이미지 크기를 비율에 맞게 잘라서 맞춤 */
  border-radius: 8px;
`

const ContentWrapper = styled.div`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 각 요소 간 균등한 간격을 두기 */
`

const FoodName = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* 긴 텍스트는 '...' 으로 표시 */
`

const FoodPrice = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #ff5722;
  margin-bottom: 8px;
  text-align: center;
`

const FoodDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
  text-align: center;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis; /* 긴 설명은 '...' 으로 표시 */
`

const FoodQuantity = styled.p`
  font-size: 14px;
  color: #333;
  text-align: center;
`

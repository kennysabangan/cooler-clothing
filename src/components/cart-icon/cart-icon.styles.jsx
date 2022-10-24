import styled from 'styled-components';

import { ReactComponent as ShoppingSvg } from '../../assets/shopping-bag.svg';

export const ShoppingIcon = styled(ShoppingSvg)`
  width: 24px;
  height: 24px;
`

export const CartIconContainer = styled.div`
  width: 25px;
  height: 25px;
  margin-left: 15px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 1px;
  cursor: pointer;
`

export const ItemCount = styled.span`
  position: absolute;
  font-size: 10px;
  font-weight: bold;
  bottom: 2px;
`

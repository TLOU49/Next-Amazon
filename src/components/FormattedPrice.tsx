import React from 'react'
interface Props {
    amount: number;
}

const FormattedPrice = ({amount}: Props) => {
    const formattedAmount = new Number(amount).toLocaleString("en-UK", {
        style: "currency",
        currency: "Zar", 
        minimumFractionDigits: 2,
    });
  return (
    <span>{formattedAmount}</span>
  )
}

export default FormattedPrice

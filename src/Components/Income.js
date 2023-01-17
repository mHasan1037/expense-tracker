import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import style from './income.module.css'
import IncomePie from './IncomePie'

const Income = ({incomeData, onTotalIncomeChange}) => {
  const [totalAmount, setTotalAmount] = useState(0)
  const [displayData, setDisplayData] = useState([])
  const [chartData, setCartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Income',
        data: [],
        backgroundColor: ['green', 'purple', 'blue', 'red', 'yellow']
      }
    ]
  })

  const deleteIncome = (id) => {
    const deletedIncome = displayData.find(data => data.id === id);
    const deletedAmount = deletedIncome.amount;
    setTotalAmount(prevAmount => prevAmount - deletedAmount)
    setDisplayData(prevData => prevData.filter(data => data.id !== id));
    onTotalIncomeChange(deletedAmount)
  }

  useEffect(()=>{
    if (!incomeData.amount) return;
    setTotalAmount(totalAmount + incomeData.amount)
    setDisplayData((prevData)=> [...prevData, incomeData])
  }, [incomeData])

  useEffect(()=>{
    setCartData({
      labels: displayData.map((data) => data.income),
      datasets: [
        {
          data: displayData.map((data) => data.amount),
          backgroundColor: ['green', 'purple', 'blue', 'red', 'yellow']
        }
      ]
    })
  }, [displayData])

  return (
    <div className={style.container}>
       <div className={totalAmount > 0 ? style.main : style.mainBlock}>
           <h1>Total Income: ${totalAmount}</h1>
           <div className={style.incomeContainer}>
                {displayData.map((data, idx)=>{
                    const {total, type, date, amount, income, id} = data
                  return (
                    <div key={id} className={style.incomeBox}>
                        <div className={style.incomeDetail}>
                          <h3>{income}</h3>
                          <div className={style.amountBox}>
                            <span>${amount}</span>
                            <span>{date}</span>
                          </div>
                        </div>
                        <button onClick={()=> deleteIncome(id)} className="Deletebtn">
                          <AiFillDelete />
                        </button>
                    </div>
                  )
                })}
           </div>
       </div>

       {/*
         Chart of income ....
       */}

       <div>
          <IncomePie chartData={chartData} />
       </div>
    </div>
  )
}

export default Income
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import style from './expense.module.css'
import ExpensePie from './ExpensePie'

const Expense = ({expenseData, onTotalExpenseChange}) => {
  const [totalExpense, setTotalExpense] = useState(0)
  const [displayData, setDisplayData] = useState([])
  const [chartData, setCartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Expense',
        data: [],
        backgroundColor: ['green', 'purple', 'blue', 'red', 'yellow']
      }
    ]
  })

  const deleteExpense = (id) =>{
    const deleteExpense = displayData.find(data => data.id === id)
    const deleteCost = deleteExpense.amount
    setTotalExpense(prevExp => prevExp - deleteCost)
    setDisplayData(prevData => prevData.filter(data => data.id !== id))
    onTotalExpenseChange(deleteCost)
  }

  useEffect(()=>{
    if (!expenseData.amount) return;
    setTotalExpense(totalExpense + expenseData.amount)
    setDisplayData((prevData)=> [...prevData, expenseData])
  }, [expenseData])


  useEffect(()=>{
    const categories = {};

    displayData.forEach((data) => {
      const { amount, category } = data;
      if (categories[category]) {
        categories[category] += amount;
      } else {
        categories[category] = amount;
      }
    });

    setCartData({
      labels: Object.keys(categories),
      datasets: [
        {
          data: Object.values(categories),
          backgroundColor: ['green', 'purple', 'blue', 'red', 'yellow']
        }
      ]
    })
  }, [displayData])


  return (
    <div className={style.container}>
       <div className={totalExpense > 0 ? style.main : style.mainBlock}>
           <h1>Total Expense: ${totalExpense}</h1>
           <div className={style.expenseContainer}>
                {displayData.map((data, idx)=>{
                    const {total, type, date, amount, category, id} = data
                  return (
                    <div key={id} className={style.expenseBox}>
                        <div className={style.expenseDetail}>
                          <h3>{category}</h3>
                          <div className={style.costBox}>
                            <span>${amount}</span>
                            <span>{date}</span>
                          </div>
                        </div>
                        <button onClick={()=> deleteExpense(id)} className="Deletebtn">
                          <AiFillDelete />
                        </button>
                    </div>
                  )
                })}
           </div>
       </div>

        {/*
         Chart of expense ....
       */}

       <div>
          <ExpensePie chartData={chartData}/>
       </div>
    </div>
  )
}

export default Expense
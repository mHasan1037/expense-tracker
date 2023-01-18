import React, { useState } from 'react'
import Expense from './Expense'
import style from './expenseTracker.module.css'
import Income from './Income'
import Main from './Main'

const ExpenseTracker = () => {
  const [incomeData, setIncomeData] = useState({})
  const [expenseData, setExpenseData] = useState({})
  const [totalIncome, setTotalIncome] = useState(0)
  const [totalExpense, setTotalExpense] = useState(0)

  const handleTotalAmountChange = (totalInc) =>{
      setTotalIncome(totalInc)
  }


  const handleTotalExpenseChange = (totalExp) =>{
     setTotalExpense(totalExp)
  }


  const getData = (data) =>{
    data.type === 'income' ? setIncomeData(data) : setExpenseData(data)
  }

 
  return (
    <div className={style.container}>
        {
          <>
            <Income incomeData={incomeData} onTotalIncomeChange={handleTotalAmountChange} />
            <Main getData={getData} totalIncome={totalIncome} totalExpense={totalExpense} />
            <Expense  expenseData={expenseData} onTotalExpenseChange={handleTotalExpenseChange}/>
          </>  
        }
    </div>
  )
}

export default ExpenseTracker
import React, { useEffect } from 'react'
import { useState } from 'react'
import main from './main.module.css'

const Main = ({ getData, totalIncome, totalExpense }) => {
  const [total, setTotal] = useState(parseInt(0))
  const [type, setType] = useState('income')
  const [date, setDate] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Rent')
  const [income, setIncome] = useState('')
  const [id, setId] = useState(Date.now())

  const changeType = (e) =>{
    setType(e.target.value)
  }

  const handleDate = (e) =>{
    setDate(e.target.value)
  }

  const handleAmount = (e) =>{
    setAmount(parseInt(e.target.value))
  }

  const handleCategory = (e) =>{
    setCategory(e.target.value)
  }

  const handleIncome = (e) =>{
    setIncome(e.target.value)
  }


  const handleSubmit = (e) =>{
       e.preventDefault()  
       setId(Date.now())
       getData({total, type, date, amount, category , income, id})
       
       type === 'income' ? setTotal(parseInt(total + amount)) : setTotal(parseInt(total - amount))
       setAmount('')
       setIncome('')
       setDate('')
  }

  useEffect(()=>{
    if(!category){
      setCategory('Rent')
    }
  }, [category])



  useEffect(() => {
    setTotal(prev => prev + totalExpense)
  }, [totalExpense]);

  useEffect(() => {
    setTotal(prev => prev - totalIncome)
  },[totalIncome]);

    

  return (
    <div className={main.container}>
        <h1 className={main.headline}>Expense Tracker</h1>
        <h2>{total >= 0 ? `Total Balance: $${total}` : `Your debt: $${total}`}</h2>
        <hr style={{margin: '20px 0'}}/>

        <form className={main.form} onSubmit={handleSubmit}>
            <div className={main.typeBox}>
                 <div>
                     <label htmlFor='type'>Type:</label>
                     <select id='type' name='type' value={type} onChange={changeType} >
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                     </select>
                 </div>
                 <div>
                    {type === 'income' && (
                      <div>
                         <label>Income:</label>
                         <input type='text' value={income} onChange={handleIncome}/>
                      </div>
                    )}
                    {type === 'expense' && (
                      <div>
                         <label htmlFor='category'>Category:</label>
                         <select onChange={handleCategory}>
                            <option value='Rent'>Rent</option>
                            <option value='Food'>Food</option>
                            <option value='Transport'>Transport</option>
                            <option value='Health'>Health</option>
                            <option value='Utility'>Utility</option>
                            <option value='Other'>Other</option>
                         </select>
                      </div>
                    )}
                 </div>
            </div>
           
            { /*
              Amount and date section
             */}
           
            <div className={main.amountDate}>
                 <div>
                    <label>Amount:</label>
                    <input type="number" value={amount} onChange={handleAmount} required/>
                 </div>
                 <div>
                    <label>Date:</label>
                    <input type="date" value={date} onChange={handleDate} required/>
                 </div>
            </div>

            <button type='submit' className={main.create}>CREATE</button>
        </form>
    </div>
  )
}

export default Main
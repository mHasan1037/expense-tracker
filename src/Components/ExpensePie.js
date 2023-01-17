import React from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as chartjs } from "chart.js/auto"

const ExpensePie = ({ chartData }) => {
  return (
    <Pie data={chartData} />
  )
}

export default ExpensePie
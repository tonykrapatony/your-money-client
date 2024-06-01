import React, { useEffect, useState } from 'react'
import { PieChart, Pie, ResponsiveContainer, Tooltip, LineChart, XAxis, YAxis, CartesianGrid, Legend, Line, Cell, Bar, BarChart, Rectangle, Label } from 'recharts';
import { useGetUserStatisticsByCategoriesQuery, useGetUserStatisticsQuery } from '../../../../redux/statisticApi';
import { useGetUserIncomeQuery } from '../../../../redux/incomesApi';
import { useGetUserExpenseQuery } from '../../../../redux/expensesApi';
import { categories, categoriesColors } from '../../../../helpers/categories';

import s from './Statistics.module.scss'


const CustomTooltip = ({ active, payload, label }) => {
  console.log('active = ', active);
  console.log('payload = ', payload);
  console.log('label = ', label);
  if (active && payload && payload.length) {
    return (
      <div className={s.custom_tooltip}>
        <p className="label">{`${payload[0].payload.title} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};


export default function Statistics({ userId }) {
  const { data: statistics, isSuccess: isStatisticsSuccess, isErrorStatistics } = useGetUserStatisticsQuery(userId);
  const { data: categoriesStatistics, isSuccess: isCatStatisticsSuccess, isErrorCatStatistics } = useGetUserStatisticsByCategoriesQuery(userId);
  const { data: incomes, isSuccess: isIncomesSuccess, isErrorIncomes } = useGetUserIncomeQuery(userId);
  const { data: expanses, isSuccess: isExpansesSuccess, isErrorExpanses } = useGetUserExpenseQuery(userId);
  console.log(statistics)



  return (
    <div className={s.statistics}>
      <div className={s.title}>
        <p>Statistics</p>
      </div>
      <div className={s.statistics_row}>
        <div className={s.statistics_col}>
          <div className={s.title}>
            <p>Incomes graph</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart width={730} height={250} data={statistics?.incomes} syncId="anyId"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#419741" strokeWidth={3}/>
              <Bar/>
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className={s.statistics_col}>
          <div className={s.title}>
            <p>Expanses graph</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart width={730} height={250} data={statistics?.expense} syncId="anyId"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#ff9e9c" strokeWidth={3}/>
              <Bar/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className={s.statistics_row}>
        <div className={s.statistics_col}>
          <div className={s.title}>
            <p>Graph of expenses by category</p>
          </div>
          <ResponsiveContainer width="100%" height={500}>
            <PieChart width="100%" height={400}>
              <Tooltip content={<CustomTooltip />} />
              <Label content={<CustomTooltip />}/>
              {categoriesStatistics && <Pie data={categoriesStatistics} dataKey="value" cx="50%" cy="50%" outerRadius={200} fill="#ff9e9c">
                {categories.map((category, index) => {
                  return categoriesStatistics.map((item) => {
                    if (category === item.title) {
                      return <Cell key={`cell-${categoriesColors[index]}`} fill={`${categoriesColors[index]}`}/>
                    }
                  })
                })}
              </Pie>}
            </PieChart>
          </ResponsiveContainer>

          {categoriesStatistics && categories.map((category, index) => {
            return categoriesStatistics.map((item) => {
              if (category === item.title) {
                return <p> {item.title} fill={`${categoriesColors[index]}`}</p>
              }
            })
          })}
        </div>
        <div className={s.statistics_col}>
          <ResponsiveContainer width="100%" height={500}>
            <PieChart width="100%" height={400}>
              <Tooltip content={<CustomTooltip />} />
              <Label content={<CustomTooltip />}/>
              <Pie data={statistics?.expense} dataKey="value" cx="50%" cy="50%" outerRadius={200} fill="#ff9e9c" />
              <Pie data={statistics?.incomes} dataKey="value" cx="50%" cy="50%" innerRadius={210} outerRadius={250} fill="#419741" label />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  )
}

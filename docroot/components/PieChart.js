import React from 'react'
import dynamic from 'next/dynamic'
    
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const PieChart = ({data}) => {

  const Low = data.filter(item => item.fieldData['severity'].includes('Low')).length
  const Medium = data.filter(item => item.fieldData['severity'].includes('Medium')).length
  const High = data.filter(item => item.fieldData['severity'].includes('High')).length

  // console.log("Low",Low,"Medium",Medium,"High",High);

  const pieChart = [Low,Medium,High]

  return (
    <div>
        <Chart
        type='pie'
        height={300}
        width={300}
        series={pieChart}
        options={{
            labels:['Low','Medium','High'],
            colors:['#22C348','#F8C51B','#CC0905'],
            legend: {
              position: 'bottom'
            },
            noData: {
              text: "No Data Found",
              align: 'center',
              verticalAlign: 'middle',
              offsetX: 0,
              offsetY: 0,
            }
        }}
        >
        </Chart>
    </div>
  )
}

export default PieChart
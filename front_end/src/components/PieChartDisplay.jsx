import { PieChart, Pie, Cell, Legend } from 'recharts';
import './pie.css'
const COLORS = ['#00C49F', '#FF8042', '#FFBB28'];

export default function PieChartDisplay({ income, expenses }) {
  const data = [
    { name: 'Income', value: income },
    { name: 'Expenses', value: expenses },
    { name: 'Remaining', value: income - expenses },
  ];

  return (
    <div className='pie' style={{ textAlign: 'center'  }}>
      <h3 style={{ fontSize: '28px', marginBottom: '20px' }}>pie chart</h3>
      <PieChart width={500} height={400} >
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          label
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </div>
  );
}

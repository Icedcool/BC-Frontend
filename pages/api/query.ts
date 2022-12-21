// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  transactions: any[]
}
console.log(process.env.MYSQLPASSWORD)

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'bc1.c6g7dlo9dbal.us-east-1.rds.amazonaws.com',
  user     : 'tableau',
  password : MYSQLPASSWORD,
  database : 'finance'
});

connection.connect();

connection.query('Select cs.id as sowID, c.ClientName, cs.AmtUSDC, cs.Currency, cs.Sponsor, cs.BudgetURL, cs.SOWURL, cs.StartDate, cs.EndDate, cs.Completed, cs.ClientID, cs.ProjectTeamPercent from Clients c left join ClientSOW cs on c.id = cs.ClientID ', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

connection.end();

const DUMMY = { transactions: [{id:'John Doe'},{id:'John Doe'},{id:'John Doe'}] };


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json(DUMMY)
}

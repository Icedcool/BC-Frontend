// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  transactions: any[]
}
console.log(process.env.MYSQLPASSWORD)

// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'bc1.c6g7dlo9dbal.us-east-1.rds.amazonaws.com',
//   user     : 'me',
//   password : 'secret',
//   database : 'my_db'
// });

// connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

// connection.end();

const DUMMY = { transactions: [{id:'John Doe'},{id:'John Doe'},{id:'John Doe'}] };


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json(DUMMY)
}

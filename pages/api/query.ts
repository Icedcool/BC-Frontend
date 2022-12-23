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
  password : process.env.MYSQLPASSWORD,
  database : 'finance'
});

connection.connect();

export interface RowDataPacket {
    sowID: number,
    ClientName: string,
    AmtUSDC: number,
    Currency: string,
    Sponsor: string,
    BudgetURL: string,
    SOWURL: string|null,
    StartDate: any,
    EndDate: any,
    Completed: number,
    ClientID: number,
    ProjectTeamPercent: any
}

let data: unknown;
connection.query('Select cs.id as sowID, c.ClientName, cs.AmtUSDC, cs.Currency, cs.Sponsor, cs.BudgetURL, cs.SOWURL, cs.StartDate, cs.EndDate, cs.Completed, cs.ClientID, cs.ProjectTeamPercent from Clients c left join ClientSOW cs on c.id = cs.ClientID ', function (error:unknown, results:RowDataPacket[]) {
  if (error) throw error;
  console.log(results[0] as RowDataPacket);
  data = results as RowDataPacket[]
});

connection.end();




export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json(data)
}

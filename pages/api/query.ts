// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql2/promise';

type Data = {
  transactions: any[]
}

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

async function fetchRows() {
  try {
    const connection = await mysql.createConnection({
      host     : 'bc1.c6g7dlo9dbal.us-east-1.rds.amazonaws.com',
      user     : 'tableau',
      password : process.env.MYSQLPASSWORD,
      database : 'finance'
    });
    const [ rows ] = await connection.query('Select cs.id as sowID, c.ClientName, cs.AmtUSDC, cs.Currency, cs.Sponsor, cs.BudgetURL, cs.SOWURL, cs.StartDate, cs.EndDate, cs.Completed, cs.ClientID, cs.ProjectTeamPercent from Clients c left join ClientSOW cs on c.id = cs.ClientID ');
    connection.end();
    return rows;
  } catch (err: unknown) {
    console.error('Error: ', err);
  } 
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await fetchRows();
    console.log(data);
    res.status(200).json(data)
  } catch (err: unknown) {
    res.status(400).json({ message: err })
  }
}

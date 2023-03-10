import Head from 'next/head'
//import Image from 'next/image'
import { Inter } from '@next/font/google'
//import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
// import fake from "../data/fake.json"

interface RowDataPacket{
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

function Table() {
  // TODO: replace any with a real type.
  const [data, setData] = useState<any>()
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(null);
  const [tableHeaders, setTableHeaders] = useState<string[]>();

  useEffect(() => {
    setLoading(true)
    // fetch('/api/query')
    //   .then((res) => {console.log(res);return res.text()})
    //   .then((data) => {
    //     // console.log(data)
    //     setData(data)
    //     setLoading(false)
    //   })

    fetch('/api/query')
      .then((res) => res.json())
      .then((d) => {
        setTableHeaders(Object.keys(d[0]));
        setData(d);
      })
      .catch((err) => console.error("Error: ", err))
      .finally(() => setLoading(false))
    // const [first] = fake;
    // setTableHeaders(Object.keys(first))
    // setData(fake);
    setLoading(false);
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>

  return (
    <table>
      <thead>
        <tr>
          { tableHeaders?.map((header: string, index: number) => (<td key={index}>{ header }</td>))}
        </tr>
      </thead>
      <tbody>
          {/* TODO: replace any with a real type */}
          {/* TODO: figure out why the rows are not rendering */}
          { data.map((row: RowDataPacket, i: number) => <tr key={i}>
            { Object.values(row).map((s, j) => <td key={j}>{s}</td>)}
          </tr>)}
      </tbody>
    </table>
  )
}

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>BC Frontend</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Table />
      </main>
    </>
  )
}

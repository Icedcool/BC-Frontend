import Head from 'next/head'
//import Image from 'next/image'
import { Inter } from '@next/font/google'
//import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
interface Data {
  transactions:{id:string}[]
}

function Profile() {
  const [data, setData] = useState<Data|null>(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('/api/query')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>


  return (
    <div>
      {data.transactions.map((tx) => <div>{tx.id}</div>)}
    </div>
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
        <Profile />
      </main>
    </>
  )
}

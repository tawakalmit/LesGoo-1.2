import Homepage from './homepage'
import Head from 'next/head'

export default function Home() {
  return (
    <>
    <Head>
      <title>LesGoo | Make Your Roadtrip Easier</title>
      <link rel="icon" href="/icon.png" />
    </Head>
    <Homepage />
    </>
  )
}

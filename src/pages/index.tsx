import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/pages/Home.module.css'

import { api } from '../services/api'
import { DevForm } from '../components/DevForm'
import { DevItem } from '../components/DevItem'

// interface Devs {
//   id: number;
//   avatar_url: string;
//   name: string;
//   techs: [string]
//   github_username: string
//   bio: string;
// }

// interface HomeProps {
//   devs: [Devs]
// }

export default function Home() {
  const [devs, setDevs] = useState([])

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs')

      setDevs(response.data)
    }

    loadDevs()
  }, [])

  async function handleAddDev(data) {
    const response = await api.post('/devs', data)
    setDevs([...devs, response.data])
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev.id} dev={dev} />
          ))}

        </ul>
      </main>
    </div>
  )
}

// export const getServerSideProps: GetServerSideProps = async () => {

//   return {
//     props: {
//       devs: response.data ?? []
//     }
//   }
// }
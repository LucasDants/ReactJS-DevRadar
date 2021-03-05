import { useState, useEffect } from 'react'

import styles from '../styles/components/DevForm.module.css'

export function DevForm({ onSubmit }) {
    const [github_username, setGithubUsername] = useState('');
    const [techs, setTechs] = useState('');
    const [latitude, steLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords
                steLatitude(String(latitude))
                setLongitude(String(longitude))

            },
            (err) => {
                console.log(err)
            },
            {
                timeout: 30000,
            }
        )
    }, []);

    async function handleSubmit(e) {
        e.preventDefault()

        await onSubmit({
            github_username,
            techs,
            latitude: Number(latitude),
            longitude: Number(longitude),
        })

        setGithubUsername('')
        setTechs('')

    }

    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <div className={styles.inputBlock}>
                <label htmlFor="github_username">Usuário do Github</label>
                <input
                    name="github_username"
                    id="github_username"
                    required
                    value={github_username}
                    onChange={e => setGithubUsername(e.target.value)}
                />
            </div>

            <div className={styles.inputBlock}>
                <label htmlFor="techs">Tecnologias</label>
                <input
                    name="techs"
                    id="techs"
                    required
                    value={techs}
                    onChange={e => setTechs(e.target.value)}
                />
            </div>

            <div className={styles.inputGroup}>
                <div className={styles.inputBlock}>
                    <label htmlFor="latitude">Latitude</label>
                    <input
                        type="number"
                        name="latitude"
                        id="latitude"
                        required value={latitude}
                        onChange={e => setLongitude(e.target.value)}
                    />
                </div>

                <div className={styles.inputBlock}>
                    <label htmlFor="longitude">Longitude</label>
                    <input
                        type="number"
                        name="longitude"
                        id="longitude"
                        required value={longitude}
                        onChange={e => steLatitude(e.target.value)}
                    />
                </div>
            </div>

            <button type="submit">Salvar</button>
        </form>
    )
}
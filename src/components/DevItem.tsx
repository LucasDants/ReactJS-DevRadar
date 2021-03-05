
import styles from '../styles/components/DevItem.module.css'

interface DevItemProps {
    dev: Dev
}

interface Dev {
    avatar_url: string;
    name: string;
    techs: [string]
    github_username: string
    bio: string;

}

export function DevItem({ dev }: DevItemProps) {
    return (
        <li className={styles.devItem}>
            <header>
                <img src={dev.avatar_url} alt={dev.name} />
                <div className={styles.userInfo}>
                    <strong>{dev.name}</strong>
                    <span>{dev.techs.join(', ')}</span>
                </div>
            </header>
            <p>{dev.bio}</p>
            <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no Github</a>
        </li>
    )
}

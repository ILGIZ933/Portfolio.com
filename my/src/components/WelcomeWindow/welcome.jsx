import React from 'react'
import css from './welcome.module.css'
import { useNavigate } from 'react-router-dom'
import light from '../../effects/Rectangle 8.svg'

export const Welcome = () => {
    const navigate = useNavigate()

    const goHomePage = () => {
        navigate('/HomePage')
    }

    return (
        <div className={css.welcomeWindow}>
            <img src={light} className={css.light} />
            <h1 className={css.HiText}>HI!</h1>
            <div className={css.textBlock}>
                <span>Welcome to by personal website.</span>
                <p>I have created this website to feel like a game/sci-fi interface. All text inside tries to reflect this.</p>
                <p>You will find ‘achievements’ or ‘quests’ that show the progress in my professional life and are related to what I am working on.</p>
                <button onClick={goHomePage} className={css.systemBtn}>enter the system</button>
            </div>
        </div>
    )
}
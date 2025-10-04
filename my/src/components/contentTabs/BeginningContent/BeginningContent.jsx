import React from 'react'
import css from './BeginningContent.module.css'

export const BeginningContent = () => {
    const homeBg = '../img/bgContent.svg'

    return (
        <div className={css.content} style={{ backgroundImage: `url(${homeBg})` }}>
            <span className={css.contentTextSpan}>
                swimming through a vast network of interconnected devices and servers, spreading joy and whimsy to users across the globe
            </span>
            <p className={css.contentTextP}>Artwork generated with midjourney</p>
        </div>
    )
}
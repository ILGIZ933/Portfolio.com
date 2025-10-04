import React, { useContext, useMemo, useState } from "react";
import css from './AchievementsContent.module.css'
import { AchievementsContext } from "./ContextControlAchievements";
import { useOutletContext } from "react-router-dom";

export const AchievementsContent = () => {
    const {playClick} = useOutletContext()

    const { achievements } = useContext(AchievementsContext);

    const total = achievements.length;
    const achievedCount = useMemo(
        () => achievements.filter((a) => a.status === "achieved").length,
        [achievements]
    );
    const progress = Math.round((achievedCount / total) * 100);

    const radius = 15.9155;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    const achievedList = achievements
        .filter((a) => a.status === "achieved")
        .slice(0, 3);

    const toBeAchievedList = achievements
        .filter((a) => a.status !== "achieved")
        .slice(0, 2);

    const [activeStates, setActiveStates] = useState({
        achieved: false,
        inProgress: false,
        todo: false,
    });

    const toggleActive = (key) => {
        setActiveStates(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className={css.content}>
            <span className={css.achievementsText}>achievements</span>
            <aside className={css.leftPart}>
                <div className={css.achievementsResults}>
                    <svg viewBox="0 0 36 36" className={css.circularChart}>
                        <path
                            className={css.circleBg}
                            d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                            className={css.circle}
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                    </svg>
                    <div className={css.progressTextNum}>
                        {achievedCount}/{total}
                        <br />
                    </div>
                    <span className={css.progressText}>Progress</span>
                </div>
                <span className={css.leftPartText}>
                    <span>I have created a set of achievements for myself and I use this page to track them.</span>

                    <span>If you want to give me a challenge and rate it, please feel free to submit it with the button below!</span>
                </span>
                <button className={css.challengeBtn} onClick={()=> {playClick()}}>Challenge me</button>
            </aside>
            <div className={css.contentAchievements}>
                <span className={css.achievedText}>Achieved:</span>
                <div className={css.achievedContent}>
                    {achievedList.length > 0 ? (
                        achievedList.map((a) => (
                            <div key={a.id} className={`${css.card} ${css[a.status]}  ${css[a.rarity]}`}>
                                <div className={`${css.borderDiv} ${css[a.rarity]}`}></div>
                                <div className={css.achievementLine}></div>
                                <img src={a.icon} className={css.iconsAchievements} />
                                <div className={`${css.rarityAchievements} ${css[a.rarity]}`}>{a.rarity}</div>
                                <span className={`${css.titleAchievements} ${css[a.rarity]}`}>{a.title}</span>
                                <span className={css.descriptionAchievements}>{a.description}</span>
                                <div className={`${css.bgDate} ${css[a.rarity]}`}></div>
                                <span className={css.achieveDate}><span>achieved:</span><span>{a.date}</span></span>
                            </div>
                        ))
                    ) : (
                        <p className={css.noAchievements}>Not achievements yet</p>
                    )}
                </div>

                <div className={css.toBeAchievedContent}>
                    <span className={css.toBeAchievedText}>To be achieved:</span>
                    {toBeAchievedList.length > 0 ? (
                        toBeAchievedList.map((a) => (
                            <div key={a.id} className={`${css.card} ${css[a.status]} ${css[a.rarity]}`}>
                                <div className={css.borderDiv}></div>
                                <div className={css.achievementLine}></div>
                                <img src={a.icon} className={css.iconsAchievements} />
                                <div className={`${css.rarityAchievements} ${css[a.rarity]}`}>{a.rarity}</div>
                                <span className={`${css.titleAchievements} ${css[a.rarity]}`}>{a.title}</span>
                                <span className={css.descriptionAchievements}>{a.description}</span>
                                <div className={`${css.bgDate} ${css[a.rarity]}`}></div>
                                <span className={css.achieveDate}>{a.date}</span>
                            </div>
                        ))
                    ) : (
                        <p className={css.noAchievements}>All achievements unlocked!</p>
                    )}
                </div>
                <aside className={css.rightPart}>
                    <div onClick={() => {toggleActive("achieved");playClick()}}>
                        <button></button>
                        <span>achieved</span>
                        {activeStates.achieved && <div className={css.activeBtn}></div>}
                    </div>
                    <div onClick={() => {toggleActive("inProgress");playClick()}}>
                        <button ></button>
                        <span>in progress</span>
                        {activeStates.inProgress && <div className={css.activeBtn}></div>}
                    </div>
                    <div onClick={() => {toggleActive("todo");playClick()}}>
                        <button></button>
                        <span>todo</span>
                        {activeStates.todo && <div className={css.activeBtn}></div>}
                    </div>
                </aside>
            </div>
        </div>
    )
}

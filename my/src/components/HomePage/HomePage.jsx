import React, { useEffect, useRef, useState } from 'react';
import css from './HomePage.module.css';
import bgMusicFile from '../../../src/audio/Reset. Restart. Refocus..mp3';
import clickSoundFile from '../../audio/Cyberpunk 2077 SFX Scanning open (Sound Effect).mp3';
import lightEffect from '../../effects/Rectangle 8.svg';
import { gsap } from 'gsap'
import { RoughEase } from "gsap/EasePack";
gsap.registerPlugin(RoughEase);
import {
    BeginningContent,
    LogsContent,
    AchievementsContent,
    CreationsContent,
    GamesContent
} from '../contentTabs'
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { addLog } from '../../services/logService';



export const HomePage = () => {
    const avatar = '/img/avatar.jpg';
    const rewardOne = '/rewards/Screenshot 2023-03-17 at 07.13 1.svg';
    const rewardTwo = '/rewards/Screenshot 2023-03-17 at 07.14 1.svg';
    const [serverTime, setServerTime] = useState("");
    const [localTime, setLocalTime] = useState("");
    const [activeNav, setActiveNav] = useState("beginning");
    const navRefs = useRef({});
    const [indicatorPos, setIndicatorPos] = useState(0);
    const [indicatorWidth, setIndicatorWidth] = useState(0);
    const [soundEffects, setSoundEffects] = useState(() => localStorage.getItem("soundEffects") === "true");
    const [music, setMusic] = useState(() => localStorage.getItem("music") === "true");
    const [activeVariant, setActiveVariant] = useState("span");
    const bgMusicRef = useRef(new Audio(bgMusicFile));
    const clickSoundRef = useRef(new Audio(clickSoundFile));
    const [openModal, setOpenModal] = useState(false);
    const contentRef = useRef(null);
    const modalRef = useRef(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});
    const [openConnection, setOpenConnection] = useState(false)
    const [openCredits, setOpenCredits] = useState(false)
    const navigate = useNavigate()
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname.split("/").pop();
        if (["beginning", "logs", "achievements", "creations", "games"].includes(path)) {
            setActiveNav(path);
        }
    }, [location.pathname]);

    const handleNavClick = (nav) => {
        setActiveNav(nav);
        playClick();
        navigate(`/HomePage/${nav}`);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!openConnection) return;

            if (e.key === "Escape") {
                setOpenConnection(false);
                playClick();
            }

            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [openConnection]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!openModal) return;

            if (e.key === "Escape") {
                setOpenModal(false);
                playClick();
            }

            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [openModal, name, email, message]);

    const handleSubmit = async () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = true;
        if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = true;
        if (!message.trim()) newErrors.message = true;
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                await fetch("http://localhost:3001/send-message", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, message })
                });
                setName("");
                setEmail("");
                setMessage("");
                setOpenConnection(false);
                setErrors({});
            } catch (err) {
                console.error("Ошибка отправки:", err);
            }
        }
    };


    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!openCredits) return;

            if (e.key === "Escape") {
                setOpenCredits(false);
                playClick();
            }

            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [openCredits]);

    useEffect(() => {
        if (openCredits) {
            gsap.to(contentRef.current, {
                duration: 0.8,
                rotateY: -35,
                scale: 0.7,
                x: 120,
                ease: "power3.inOut",
                transformPerspective: 1200,
                transformOrigin: "center"
            });

            gsap.fromTo(
                modalRef.current,
                { autoAlpha: 0, scale: 0.8, y: 50 },
                { duration: 0.6, autoAlpha: 1, scale: 1, y: 0, ease: "power3.out" }
            );
        } else {
            gsap.to(contentRef.current, {
                duration: 0.8,
                rotateY: 0,
                scale: 1,
                x: 0,
                filter: "blur(0px) brightness(1)",
                ease: "power3.inOut"
            });
        }
    }, [openCredits]);

    useEffect(() => {
        if (openConnection) {
            gsap.to(contentRef.current, {
                duration: 0.8,
                rotateY: -35,
                scale: 0.7,
                x: 120,
                ease: "power3.inOut",
                transformPerspective: 1200,
                transformOrigin: "center"
            });

            gsap.fromTo(
                modalRef.current,
                { autoAlpha: 0, scale: 0.8, y: 50 },
                { duration: 0.6, autoAlpha: 1, scale: 1, y: 0, ease: "power3.out" }
            );
        } else {
            gsap.to(contentRef.current, {
                duration: 0.8,
                rotateY: 0,
                scale: 1,
                x: 0,
                filter: "blur(0px) brightness(1)",
                ease: "power3.inOut"
            });
        }
    }, [openConnection]);

    useEffect(() => {
        if (openModal) {
            const date = new Date().toISOString();
            addLog(date);
        }
    }, [openModal]);

    useEffect(() => {
        if (openConnection) {
            const date = new Date().toISOString();
            addLog(date);
        }
    }, [openConnection]);

    useEffect(() => {
        if (openModal) {
            gsap.to(contentRef.current, {
                duration: 0.8,
                rotateY: -35,
                scale: 0.7,
                x: 120,
                ease: "power3.inOut",
                transformPerspective: 1200,
                transformOrigin: "center"
            });

            gsap.fromTo(
                modalRef.current,
                { autoAlpha: 0, scale: 0.8, y: 50 },
                { duration: 0.6, autoAlpha: 1, scale: 1, y: 0, ease: "power3.out" }
            );
        } else {
            gsap.to(contentRef.current, {
                duration: 0.8,
                rotateY: 0,
                scale: 1,
                x: 0,
                filter: "blur(0px) brightness(1)",
                ease: "power3.inOut"
            });
        }
    }, [openModal]);

    useEffect(() => {
        const bgMusic = bgMusicRef.current;
        bgMusic.loop = true;
        bgMusic.volume = 0.2;
        if (music) {
            bgMusic.play().catch(() => console.log("Автовоспроизведение заблокировано браузером"));
        } else {
            bgMusic.pause();
            bgMusic.currentTime = 0;
        }
        localStorage.setItem("music", music);
    }, [music]);

    useEffect(() => {
        localStorage.setItem("soundEffects", soundEffects);
    }, [soundEffects]);

    const playClick = () => {
        if (soundEffects) {
            clickSoundRef.current.currentTime = 0;
            clickSoundRef.current.play();
        }
    };

    useEffect(() => {
        const current = navRefs.current[activeNav];
        if (current) {
            setIndicatorPos(current.offsetLeft);
            setIndicatorWidth(current.offsetWidth);
        }
    }, [activeNav]);

    const CheckIcon = (
        <svg width="30" height="30" viewBox="0 0 24 24">
            <path d="M9.99999 15.172L19.192 5.979L20.607 7.393L9.99999 18L3.63599 11.636L5.04999 10.222L9.99999 15.172Z" />
        </svg>
    );

    const CrossIcon = (
        <svg width="30" height="30" viewBox="0 0 24 24">
            <path d="M12 10.586L16.95 5.63599L18.364 7.04999L13.414 12L18.364 16.95L16.95 18.364L12 13.414L7.04999 18.364L5.63599 16.95L10.586 12L5.63599 7.04999L7.04999 5.63599L12 10.586Z" />
        </svg>
    );

    useEffect(() => {
        const update = () => {
            const server = new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Bishkek", hour: "2-digit", minute: "2-digit" });
            const local = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
            setServerTime(server);
            setLocalTime(local);
        };
        update();
        const now = new Date();
        const msToNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
        const timeout = setTimeout(() => {
            update();
            const interval = setInterval(update, 60000);
            return () => clearInterval(interval);
        }, msToNextMinute);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className={css.HomePage}>
            <div ref={contentRef} className={css.pageContent} >
                <img src={lightEffect} className={css.lightEffect} />
                <div className={css.LevelUser}><span>0</span><p>Level</p></div>
                <div className={css.CoinsUser}>
                    <button>
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.147 10.595V6.448H0V4.147H4.147V0H6.461V4.147H10.608V6.448H6.461V10.595H4.147Z" fill="#E84A4A" />
                        </svg>
                    </button>
                    <span>0</span>
                    <p>coins awarded</p>
                </div>
                <span className={css.creditsUser} onClick={() => {
                    setOpenCredits(true);
                    playClick()
                }}>credits</span>
                <div className={css.timesUser}>
                    <div className={css.serverTime}><span>SERVER TIME:</span> {serverTime}</div>
                    <div className={css.LocalTime}><span>LOCAL TIME:</span> {localTime}</div>
                </div>

                <aside className={css.asideLeft}>
                    <div className={css.avatar}>
                        <div className={css.borderTopLeft}></div>
                        <div className={css.borderTopRight}></div>
                        <div className={css.borderBottomLeft}></div>
                        <div className={css.borderBottomRight}></div>
                        <img src={avatar} className={css.avatarImg} />
                    </div>
                    <div className={css.BioUser}><span>name</span><p>sandybaev ilgiz</p></div>
                    <div className={css.occupation}><span>occupation</span><p>full stack</p></div>
                    <div className={css.corporation}><span>corporation</span><p>none</p></div>
                    <div className={css.availability}>
                        <span>availability</span>
                        <p onClick={() => {
                            setOpenModal(true);
                            playClick()
                        }}>
                            <span>open for hire</span>
                            <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M2.00095 10.1675L6.5981 1.83465L16.1131 2.01982L21.0702 10.6056L16.473 18.9385L6.95798 18.7533L2.00095 10.1675ZM6.01408 0.823093L16.6969 1.03099L22.2184 10.5945L17.057 19.9501L6.37418 19.7422L0.852702 10.1787L6.01408 0.823093ZM6.50186 21.8333L1.55774 30.3968L6.50186 38.9603L16.3901 38.9603L21.3342 30.3968L16.3901 21.8333L6.50186 21.8333ZM16.9675 20.8333L5.92451 20.8333L0.403035 30.3968L5.92451 39.9603L16.9675 39.9603L22.4889 30.3968L16.9675 20.8333ZM23.9656 11.7506L19.0215 20.3141L23.9656 28.8776L33.8539 28.8776L38.798 20.3141L33.8539 11.7506L23.9656 11.7506ZM34.4312 10.7506L23.3883 10.7506L17.8668 20.3141L23.3883 29.8776L34.4312 29.8776L39.9527 20.3141L34.4312 10.7506Z"
                                />
                            </svg>
                        </p>
                    </div>
                    <div className={css.social}>
                        <span>social</span>
                        <p onClick={() => {
                            setOpenConnection(true);
                            playClick()
                        }}><span>open connection</span><svg width="24" height="21" viewBox="0 0 14 21" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.34102 10.03L13.684 14.373L8.02802 20.029H6.02802V13.343L1.66402 17.707L0.249023 16.293L6.02802 10.515V9.54499L0.249023 3.76499L1.66402 2.35099L6.02802 6.71499V0.0289917H8.02802L13.684 5.68599L9.34102 10.03ZM8.02802 11.544V17.201L10.856 14.373L8.02802 11.544ZM8.02802 8.51399L10.856 5.68599L8.02802 2.85799V8.51499V8.51399Z" />
                            </svg>
                        </p>
                    </div>
                    <div className={css.motto}><span>Motto:</span><p>Saepe omnis neque numquam recusandae laudantium.</p></div>
                </aside>

                <div className={css.content} >
                    <div className={css.borderTopLeft}></div>
                    <div className={css.borderTopRight}></div>
                    <div className={css.borderBottomLeft}></div>
                    <div className={css.borderBottomRight}></div>


                    <Outlet context={{ playClick }} />


                    <div className={css.navBar}>
                        {["beginning", "logs", "achievements", "creations", "games"].map(nav => (
                            <div
                                key={nav}
                                ref={el => navRefs.current[nav] = el}
                                className={`${css[nav.charAt(0).toUpperCase() + nav.slice(1)]} ${activeNav === nav ? css.Active : ""}`}
                                onClick={() => handleNavClick(nav)}
                            >
                                <div className={css.lineNav}></div>
                                <div className={css.navText}>
                                    <span>
                                        <span>{nav}</span>
                                        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M2.00095 10.1675L6.5981 1.83465L16.1131 2.01982L21.0702 10.6056L16.473 18.9385L6.95798 18.7533L2.00095 10.1675ZM6.01408 0.823093L16.6969 1.03099L22.2184 10.5945L17.057 19.9501L6.37418 19.7422L0.852702 10.1787L6.01408 0.823093ZM6.50186 21.8333L1.55774 30.3968L6.50186 38.9603L16.3901 38.9603L21.3342 30.3968L16.3901 21.8333L6.50186 21.8333ZM16.9675 20.8333L5.92451 20.8333L0.403035 30.3968L5.92451 39.9603L16.9675 39.9603L22.4889 30.3968L16.9675 20.8333ZM23.9656 11.7506L19.0215 20.3141L23.9656 28.8776L33.8539 28.8776L38.798 20.3141L33.8539 11.7506L23.9656 11.7506ZM34.4312 10.7506L23.3883 10.7506L17.8668 20.3141L23.3883 29.8776L34.4312 29.8776L39.9527 20.3141L34.4312 10.7506Z"
                                            />
                                        </svg>
                                    </span>
                                    <p><span>Suscipit est consequatur nemo voluptatem est labore saepe.</span></p>
                                </div>
                            </div>
                        ))}
                        <div className={css.navIndicator} style={{ left: indicatorPos, width: indicatorWidth }}></div>
                    </div>
                </div>

                <aside className={css.asideRight}>
                    <div className={css.line}></div>
                    <div onClick={playClick} className={css.variantsQuest}>
                        <span className={`${css.variant} ${activeVariant === "span" ? css.active : ""}`} onClick={() => setActiveVariant("span")}>
                            <span>active quest</span>
                            {activeVariant === "span" && (
                                <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M2.00095 10.1675L6.5981 1.83465L16.1131 2.01982L21.0702 10.6056L16.473 18.9385L6.95798 18.7533L2.00095 10.1675ZM6.01408 0.823093L16.6969 1.03099L22.2184 10.5945L17.057 19.9501L6.37418 19.7422L0.852702 10.1787L6.01408 0.823093ZM6.50186 21.8333L1.55774 30.3968L6.50186 38.9603L16.3901 38.9603L21.3342 30.3968L16.3901 21.8333L6.50186 21.8333ZM16.9675 20.8333L5.92451 20.8333L0.403035 30.3968L5.92451 39.9603L16.9675 39.9603L22.4889 30.3968L16.9675 20.8333ZM23.9656 11.7506L19.0215 20.3141L23.9656 28.8776L33.8539 28.8776L38.798 20.3141L33.8539 11.7506L23.9656 11.7506ZM34.4312 10.7506L23.3883 10.7506L17.8668 20.3141L23.3883 29.8776L34.4312 29.8776L39.9527 20.3141L34.4312 10.7506Z"
                                    />
                                </svg>
                            )}
                        </span>
                        <p className={`${css.variant} ${activeVariant === "p" ? css.active : ""}`} onClick={() => setActiveVariant("p")}>
                            <span>the react skill-up line</span>
                            {activeVariant === "p" && (
                                <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M2.00095 10.1675L6.5981 1.83465L16.1131 2.01982L21.0702 10.6056L16.473 18.9385L6.95798 18.7533L2.00095 10.1675ZM6.01408 0.823093L16.6969 1.03099L22.2184 10.5945L17.057 19.9501L6.37418 19.7422L0.852702 10.1787L6.01408 0.823093ZM6.50186 21.8333L1.55774 30.3968L6.50186 38.9603L16.3901 38.9603L21.3342 30.3968L16.3901 21.8333L6.50186 21.8333ZM16.9675 20.8333L5.92451 20.8333L0.403035 30.3968L5.92451 39.9603L16.9675 39.9603L22.4889 30.3968L16.9675 20.8333ZM23.9656 11.7506L19.0215 20.3141L23.9656 28.8776L33.8539 28.8776L38.798 20.3141L33.8539 11.7506L23.9656 11.7506ZM34.4312 10.7506L23.3883 10.7506L17.8668 20.3141L23.3883 29.8776L34.4312 29.8776L39.9527 20.3141L34.4312 10.7506Z"
                                    />
                                </svg>
                            )}
                        </p>
                    </div>
                    <div className={css.questName}><span>quest name</span><p>React website</p></div>
                    <div className={css.goalText}><span>goal</span><p>Build this website. Implement a full react website with multiple routers, UI elements and tricky styling. Make it all work great!</p></div>
                    <div className={css.rewards}>
                        <span className={css.rewardsText}>rewards</span>
                        <div><img src={rewardOne} alt="" /><p>+5</p></div>
                        <div><img src={rewardTwo} alt="" /><p>+25</p></div>
                    </div>

                    <div className={css.visualSettings}>
                        <div className={css.soundEffects} style={{ opacity: soundEffects ? 1 : 0.5, border: '1px solid `${soundEffects}? "#E84A4A" : "#262626" `' }}>
                            <span>sound effects</span>
                            <button onClick={() => setSoundEffects(!soundEffects)} style={{ border: `1px solid ${soundEffects ? "#E84A4A" : "#262626"}` }}>
                                {soundEffects ? CheckIcon : CrossIcon}
                            </button>
                        </div>
                        <div className={css.music} style={{ opacity: music ? 1 : 0.5 }}>
                            <span>music</span>
                            <button onClick={() => setMusic(!music)} style={{ border: `1px solid ${music ? "#E84A4A" : "#262626"}` }}>
                                {music ? CheckIcon : CrossIcon}
                            </button>
                        </div>
                        <div className={css.visualSettingsOpen}>
                            <span>visual settings</span>
                            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_3_372)">
                                    <path d="M3.34006 17C2.91733 16.269 2.58873 15.4875 2.36206 14.674C2.85537 14.4231 3.26965 14.0406 3.55909 13.5689C3.84852 13.0972 4.00183 12.5546 4.00203 12.0011C4.00224 11.4477 3.84934 10.905 3.56026 10.433C3.27118 9.96106 2.85718 9.57828 2.36406 9.32701C2.8161 7.69249 3.67679 6.19996 4.86506 4.99001C5.32915 5.29173 5.86768 5.45917 6.42104 5.47379C6.9744 5.48841 7.52101 5.34964 8.00039 5.07284C8.47977 4.79604 8.87321 4.392 9.13719 3.90545C9.40116 3.41889 9.52537 2.86878 9.49606 2.31601C11.1382 1.89163 12.8613 1.89232 14.5031 2.31801C14.474 2.87077 14.5985 3.4208 14.8626 3.90721C15.1268 4.39363 15.5204 4.79748 15.9999 5.07407C16.4794 5.35065 17.026 5.48919 17.5793 5.47436C18.1327 5.45952 18.6711 5.29189 19.1351 4.99001C19.7141 5.58001 20.2281 6.25101 20.6601 7.00001C21.0931 7.74901 21.4171 8.53001 21.6381 9.32601C21.1448 9.57691 20.7305 9.95938 20.441 10.4311C20.1516 10.9028 19.9983 11.4454 19.9981 11.9989C19.9979 12.5523 20.1508 13.0951 20.4399 13.567C20.7289 14.039 21.1429 14.4217 21.6361 14.673C21.184 16.3075 20.3233 17.8001 19.1351 19.01C18.671 18.7083 18.1324 18.5408 17.5791 18.5262C17.0257 18.5116 16.4791 18.6504 15.9997 18.9272C15.5204 19.204 15.1269 19.608 14.8629 20.0946C14.599 20.5811 14.4748 21.1312 14.5041 21.684C12.862 22.1084 11.1388 22.1077 9.49706 21.682C9.52611 21.1292 9.40166 20.5792 9.13748 20.0928C8.8733 19.6064 8.4797 19.2025 8.00023 18.9259C7.52076 18.6494 6.97412 18.5108 6.42079 18.5257C5.86746 18.5405 5.32902 18.7081 4.86506 19.01C4.27405 18.407 3.76166 17.7316 3.34006 17ZM9.00006 17.196C10.0657 17.8106 10.8669 18.797 11.2501 19.966C11.7491 20.013 12.2501 20.014 12.7491 19.967C13.1325 18.7979 13.9341 17.8114 15.0001 17.197C16.0653 16.5807 17.3206 16.3795 18.5251 16.632C18.8151 16.224 19.0651 15.789 19.2731 15.334C18.4525 14.4174 17.9992 13.2302 18.0001 12C18.0001 10.74 18.4701 9.56301 19.2731 8.66601C19.0636 8.21115 18.8125 7.77664 18.5231 7.36801C17.3193 7.62032 16.0649 7.41948 15.0001 6.80401C13.9344 6.18938 13.1332 5.20299 12.7501 4.03401C12.2511 3.98701 11.7501 3.98601 11.2511 4.03301C10.8677 5.20215 10.0661 6.18857 9.00006 6.80301C7.93484 7.41932 6.67954 7.62053 5.47506 7.36801C5.18563 7.77629 4.93519 8.21087 4.72706 8.66601C5.54763 9.58257 6.00094 10.7698 6.00006 12C6.00006 13.26 5.53006 14.437 4.72706 15.334C4.93653 15.7889 5.1876 16.2234 5.47706 16.632C6.68078 16.3797 7.93527 16.5805 9.00006 17.196ZM12.0001 15C11.2044 15 10.4413 14.6839 9.87874 14.1213C9.31613 13.5587 9.00006 12.7957 9.00006 12C9.00006 11.2044 9.31613 10.4413 9.87874 9.87869C10.4413 9.31608 11.2044 9.00001 12.0001 9.00001C12.7957 9.00001 13.5588 9.31608 14.1214 9.87869C14.684 10.4413 15.0001 11.2044 15.0001 12C15.0001 12.7957 14.684 13.5587 14.1214 14.1213C13.5588 14.6839 12.7957 15 12.0001 15ZM12.0001 13C12.2653 13 12.5196 12.8946 12.7072 12.7071C12.8947 12.5196 13.0001 12.2652 13.0001 12C13.0001 11.7348 12.8947 11.4804 12.7072 11.2929C12.5196 11.1054 12.2653 11 12.0001 11C11.7348 11 11.4805 11.1054 11.293 11.2929C11.1054 11.4804 11.0001 11.7348 11.0001 12C11.0001 12.2652 11.1054 12.5196 11.293 12.7071C11.4805 12.8946 11.7348 13 12.0001 13Z" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_3_372">
                                        <rect width="24" height="24" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                    </div>
                </aside>
            </div>
            <div onClick={() => setOpenCredits(false)}></div>
            {(openModal || openConnection) && (
                <div ref={modalRef} className={css.modalOverlay}>
                    <span className={css.modalSpan}>{openModal ? "open for hire" : "connect with me"}</span>
                    <p className={css.modalP}>{openModal ? "I would love to hear about your projects!" : "wanna chat? Or just share something cool?"}</p>
                    <div className={css.modalWind}>
                        <div className={css.modalBorder}></div>
                        <div className={css.userNameModal}>
                            <span>How should I call you?</span>
                            <input placeholder='your name' value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={errors.name ? css.invalidInput : ""} />
                        </div>
                        <div className={css.userSendingModal}>
                            <span>Sending from</span>
                            <input placeholder={openModal ? 'your.name@acme.com' : 'your.name@example.com'} value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={errors.email ? css.invalidInput : ""} />
                        </div>
                        <div className={css.userWriteModal}>
                            <span>transmitted data</span>
                            <textarea placeholder='Hi, I write to you about ...' value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className={errors.message ? css.invalidInput : ""} />                        </div>
                    </div>
                    <div className={css.modalBtns}>
                        <button className={css.sendMessageBtn} onClick={() => {
                            handleSubmit()
                            playClick()
                        }}>send message [enter]</button>
                        <button className={css.cancelBtn} onClick={() => {
                            { openModal ? setOpenModal(false) : setOpenConnection(false) };
                            addLog(new Date().toISOString())
                            playClick()
                        }}>discard [esc]</button>
                    </div>
                </div>
            )}
            {
                openCredits && (
                    <div ref={modalRef} className={css.modalOverlay}>
                        <span className={css.closeCredits} onClick={() => {
                            setOpenCredits(false)
                            playClick()
                        }}>X</span>
                        <div className={css.creditContent}>
                            <div className={css.HeaderText}>
                                <span>Credits</span>
                                <p>Everything involved in this project</p>
                            </div>
                            <div className={css.creditsLine}></div>
                            <div className={css.creditsText}>
                                <div className={css.leftPart}>
                                    <span>developed by</span>
                                    <span>designed by</span>
                                    <span>visual assets</span>
                                    <span>audio effects</span>
                                    <span>music</span>
                                </div>
                                <div className={css.rightPart}>
                                    <span><span>ILGIZ SANDYBAEV </span></span>
                                    <span>alex dimitrov @xavortm</span>
                                    <span><span>homepage view, achievements by midjourney</span>

                                        <span>icons from remixicons and fontawesome</span>

                                        <span>hexagons by @xavortm</span></span>
                                    <span>click, hover, typing and all other audio effects by mixkit.co</span>
                                    <span><span>“tea Fragrance” by Adeline Yeo (HP), Never forget</span>

                                        <span>“pressure” by Eggy Toast, Shed Roof</span>

                                        <span>“We were kids” by HolinzaPATREON, never forget</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

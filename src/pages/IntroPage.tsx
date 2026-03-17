import buttonBoxLeft from "../assets/icons/button-box-left.svg"
import buttonBoxRight from "../assets/icons/button-box-right.svg"
import introBtn from "../assets/icons/intro.svg"
import rectangleLeft from "../assets/icons/rectangle-left.svg";
import rectangleRight from "../assets/icons/rectangle-right.svg";
import "../styles/intro.css"
import { useNavigate } from "react-router-dom";

export default function IntroPage() {
    const navigate = useNavigate();
    
    return (
        <div className="intro-container">
            <header className="intro-header">
                <div className="intro-brand">
                    <span className="intro-logo">SKINSTRIC</span>
                    <img className="intro-tag" src={introBtn} alt="Intro" />
                </div>
                <button>ENTER CODE</button>
            </header>

            <main className="intro-main">
            <div className="intro-actions">
                <button className="intro-action intro-action--left" type="button">
                <img
                    className="intro-action__frame"
                    src={rectangleLeft}
                    alt=""
                    aria-hidden="true"
                />
                <div className="intro-action__content intro-action__content--left">
                    <img
                    className="intro-action__icon"
                    src={buttonBoxLeft}
                    alt=""
                    aria-hidden="true"
                    />
                    <span>DISCOVER A.I.</span>
                </div>
                </button>

                <button className="intro-action intro-action--right" type="button">
                <img
                    className="intro-action__frame"
                    src={rectangleRight}
                    alt=""
                    aria-hidden="true"
                />
                <div className="intro-action__content intro-action__content--right" onClick={() => navigate("/analysis")}>
                    <span>TAKE TEST</span>
                    <img
                    className="intro-action__icon"
                    src={buttonBoxRight}
                    alt=""
                    aria-hidden="true"
                    />
                </div>
                </button>
            </div>

            <div className="intro-heading-wrap">
                <h1>
                Sophisticated skincare
                </h1>
            </div>

            <p className="intro-footer-text">
                SKINSTRIC DEVELOPED AN A.I. THAT CREATES A HIGHLY-PERSONALIZED ROUTINE
                TAILORED TO WHAT YOUR SKIN NEEDS.
            </p>
            </main>
        </div>
    );
}
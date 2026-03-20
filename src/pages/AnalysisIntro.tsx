import { useState } from "react";
import { useNavigate } from "react-router-dom";
import introBtn from "../assets/icons/intro.svg";
import buttonBoxLeft from "../assets/icons/button-box-left.svg";
import buttonBoxRight from "../assets/icons/button-box-right.svg";
import "../styles/analysisintro.css";

type Step = "name" | "city" | "loading" | "complete";

export default function AnalysisIntro() {
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>("name");
  const [inputValue, setInputValue] = useState("");
  const [, setName] = useState("");
  const [, setCity] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmed = inputValue.trim();
    if (!trimmed) return;

    if (step === "name") {
      setName(trimmed);
      setInputValue("");
      setStep("city");
      return;
    }

    if (step === "city") {
      setCity(trimmed);
      setInputValue("");
      setStep("loading");

      await new Promise<void>((resolve) => {
        setTimeout(resolve, 1500);
      });

      setStep("complete");
    }
  }

  const titleText = step === "name" ? "Introduce Yourself" : "your city name";

  return (
    <div className="analysis-container">
      <header className="analysis-header">
        <div className="analysis-brand">
          <span className="analysis-logo">SKINSTRIC</span>
          <img className="analysis-tag" src={introBtn} alt="Intro" />
        </div>

        <button type="button" className="analysis-code-btn">
          ENTER CODE
        </button>
      </header>

      <div className="analysis-top-label">TO START ANALYSIS</div>

      <main className="analysis-main">
        <div className="analysis-rotating-stack">
          <div className="analysis-frame analysis-frame--1" />
          <div className="analysis-frame analysis-frame--2" />
          <div className="analysis-frame analysis-frame--3" />

          {step === "loading" ? (
            <div className="analysis-loading">
              <p className="analysis-loading-text">Processing submission</p>
              <div className="analysis-loading-dots">
                <span />
                <span />
                <span />
              </div>
            </div>
          ) : step === "complete" ? (
            <div className="analysis-complete">
              <h2 className="analysis-complete-title">Thank you!</h2>
              <p className="analysis-complete-text">Proceed for the next step</p>
            </div>
          ) : (
            <form className="analysis-content" onSubmit={handleSubmit}>
              <p className="analysis-click-label">CLICK TO TYPE</p>

              <input
                className="analysis-input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={titleText}
                aria-label={titleText}
                autoFocus
              />
            </form>
          )}
        </div>
      </main>

      <button
        className="analysis-back"
        type="button"
        onClick={() => navigate(-1)}
      >
        <img src={buttonBoxLeft} alt="" aria-hidden="true" />
        <span>BACK</span>
      </button>

      {step === "complete" && (
        <button
          className="analysis-proceed"
          type="button"
          onClick={() => navigate("/upload")}
        >
          <span>PROCEED</span>
          <img src={buttonBoxRight} alt="" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
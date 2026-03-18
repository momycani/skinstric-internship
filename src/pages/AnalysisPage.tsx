import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import introBtn from "../assets/icons/intro.svg";
import buttonBoxLeft from "../assets/icons/button-box-left.svg";
import buttonBoxRight from "../assets/icons/button-box-right.svg";
import "../styles/analysis.css";

type Metric = "race" | "age" | "sex";

function toPercent(num: number) {
  return Number((num * 100).toFixed(2));
}

function sortData(obj: Record<string, number>) {
  return Object.entries(obj)
    .map(([label, value]) => ({
      label,
      value: toPercent(value),
    }))
    .sort((a, b) => b.value - a.value);
}

function formatLabel(label: string) {
  const map: Record<string, string> = {
    black: "Black",
    white: "White",
    "southeast asian": "Southeast asian",
    "south asian": "South asian",
    "latino hispanic": "Latino hispanic",
    "east asian": "East asian",
    "middle eastern": "Middle eastern",
    male: "Male",
    female: "Female",
  };

  return map[label.toLowerCase()] || label;
}

export default function AnalysisPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const analysis = location.state?.analysis?.data;

  const [showDemographics, setShowDemographics] = useState(false);
  const [activeMetric, setActiveMetric] = useState<Metric>("race");

  const raceData = useMemo(() => {
    if (!analysis?.race) return [];
    return sortData(analysis.race).map((item) => ({
      ...item,
      label: formatLabel(item.label),
    }));
  }, [analysis]);

  const ageData = useMemo(() => {
    if (!analysis?.age) return [];
    return sortData(analysis.age);
  }, [analysis]);

  const sexData = useMemo(() => {
    if (!analysis?.gender) return [];
    return sortData(analysis.gender).map((item) => ({
      ...item,
      label: formatLabel(item.label),
    }));
  }, [analysis]);

  const [selectedRace, setSelectedRace] = useState<string | null>(null);
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [selectedSex, setSelectedSex] = useState<string | null>(null);

  const effectiveRace = selectedRace || raceData[0]?.label || "";
  const effectiveAge = selectedAge || ageData[0]?.label || "";
  const effectiveSex = selectedSex || sexData[0]?.label || "";

  const current =
    activeMetric === "race"
      ? {
          title: effectiveRace,
          percent: raceData.find((x) => x.label === effectiveRace)?.value || 0,
          sideTitle: "RACE",
          data: raceData,
        }
      : activeMetric === "age"
      ? {
          title: `${effectiveAge} y.o.`,
          percent: ageData.find((x) => x.label === effectiveAge)?.value || 0,
          sideTitle: "AGE",
          data: ageData,
        }
      : {
          title: effectiveSex.toUpperCase(),
          percent: sexData.find((x) => x.label === effectiveSex)?.value || 0,
          sideTitle: "SEX",
          data: sexData,
        };

  if (!analysis) {
    return (
      <div className="analysis-page">
        <header className="analysis-header">
          <div className="analysis-brand">
            <span className="analysis-logo">SKINSTRIC</span>
            <img className="analysis-tag" src={introBtn} alt="Intro" />
          </div>

          <button type="button" className="analysis-code-btn">
            ENTER CODE
          </button>
        </header>

        <div className="analysis-empty">
          <h2>No analysis data found.</h2>
          <button type="button" onClick={() => navigate("/upload")}>
            Go back to upload
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="analysis-page">
      <header className="analysis-header">
        <div className="analysis-brand">
          <span className="analysis-logo">SKINSTRIC</span>
          <img className="analysis-tag" src={introBtn} alt="Intro" />
        </div>

        <button type="button" className="analysis-code-btn">
          ENTER CODE
        </button>
      </header>

      {!showDemographics ? (
        <>
          <section className="analysis-intro">
            <h2>A.I. ANALYSIS</h2>
            <p>
              A.I. HAS ESTIMATED THE FOLLOWING.
              <br />
              FIX ESTIMATED INFORMATION IF NEEDED.
            </p>
          </section>

          <section className="analysis-diamond-wrap">
            <div className="analysis-diamond-grid">
              <button
                type="button"
                className="diamond diamond--top diamond--active"
                onClick={() => setShowDemographics(true)}
              >
                <span>DEMOGRAPHICS</span>
              </button>

              <div className="diamond diamond--left">
                <span>COSMETIC CONCERNS</span>
              </div>

              <div className="diamond diamond--right">
                <span>SKIN TYPE DETAILS</span>
              </div>

              <div className="diamond diamond--bottom">
                <span>WEATHER</span>
              </div>
            </div>
          </section>

          <button
            className="analysis-back"
            type="button"
            onClick={() => navigate(-1)}
          >
            <img src={buttonBoxLeft} alt="" aria-hidden="true" />
            <span>BACK</span>
          </button>

          <button
            className="analysis-proceed"
            type="button"
            onClick={() => setShowDemographics(true)}
          >
            <span>GET SUMMARY</span>
            <img src={buttonBoxRight} alt="" aria-hidden="true" />
          </button>
        </>
      ) : (
        <>
          <section className="analysis-title-wrap">
            <p className="analysis-kicker">A.I. ANALYSIS</p>
            <h1>DEMOGRAPHICS</h1>
            <p className="analysis-subtitle">PREDICTED RACE &amp; AGE</p>
          </section>

          <section className="analysis-content-grid">
            <aside className="analysis-left-cards">
              <button
                type="button"
                className={`mini-card ${activeMetric === "race" ? "is-active" : ""}`}
                onClick={() => setActiveMetric("race")}
              >
                <span>{effectiveRace}</span>
                <strong>RACE</strong>
              </button>

              <button
                type="button"
                className={`mini-card ${activeMetric === "age" ? "is-active" : ""}`}
                onClick={() => setActiveMetric("age")}
              >
                <span>{effectiveAge}</span>
                <strong>AGE</strong>
              </button>

              <button
                type="button"
                className={`mini-card ${activeMetric === "sex" ? "is-active" : ""}`}
                onClick={() => setActiveMetric("sex")}
              >
                <span>{effectiveSex.toUpperCase()}</span>
                <strong>SEX</strong>
              </button>
            </aside>

            <div className="analysis-main-card">
              <h2>{current.title}</h2>

              <div className="analysis-circle">
                <div
                  className="analysis-circle-ring"
                  style={{
                    background: `conic-gradient(#17181c 0 ${current.percent}%, #cfcfcf ${current.percent}% 100%)`,
                  }}
                >
                  <div className="analysis-circle-inner">
                    <span>{current.percent}%</span>
                  </div>
                </div>
              </div>
            </div>

            <aside className="analysis-right-panel">
              <div className="analysis-right-header">
                <span>{current.sideTitle}</span>
                <span>A.I. CONFIDENCE</span>
              </div>

              <div className="analysis-right-list">
                {current.data.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    className={`analysis-row ${
                      item.label ===
                      (activeMetric === "race"
                        ? effectiveRace
                        : activeMetric === "age"
                        ? effectiveAge
                        : effectiveSex)
                        ? "is-selected"
                        : ""
                    }`}
                    onClick={() => {
                      if (activeMetric === "race") setSelectedRace(item.label);
                      if (activeMetric === "age") setSelectedAge(item.label);
                      if (activeMetric === "sex") setSelectedSex(item.label);
                    }}
                  >
                    <span>{item.label}</span>
                    <span>{item.value}%</span>
                  </button>
                ))}
              </div>
            </aside>
          </section>

          <button
            className="analysis-back"
            type="button"
            onClick={() => setShowDemographics(false)}
          >
            <img src={buttonBoxLeft} alt="" aria-hidden="true" />
            <span>BACK</span>
          </button>
        </>
      )}
    </div>
  );
}
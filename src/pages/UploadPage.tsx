import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import introBtn from "../assets/icons/intro.svg"
import cameraIcon from "../assets/icons/camera-icon.svg";
import galleryIcon from "../assets/icons/gallery.svg";
import buttonBoxLeft from "../assets/icons/button-box-left.svg";
import lineDotCamera from "../assets/icons/line-dot-camera.svg";
import lineDotGallery from "../assets/icons/line-dot-gallery.svg";
import { FiCamera } from "react-icons/fi";
import "../styles/upload.css";

export default function UploadPage() {
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [isSettingUpCamera, setIsSettingUpCamera] = useState(false);
  const [showCameraView, setShowCameraView] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [, setAnalysisData] = useState<string | null>(null);

  useEffect(() => {
  if (showCameraView && stream && videoRef.current) {
    videoRef.current.srcObject = stream;
  }
}, [showCameraView, stream]);

async function handleFile(file: File) {
  try {
    setError("");
    setLoading(true);

    const base64 = await toBase64(file);
    setPreview(base64);

    const data = await sendToAPI(base64);
    setAnalysisData(data);

    navigate("/analysis", {
      state: {
        image: base64,
        analysis: data,
      },
    });
  } catch (err) {
    console.error(err);
    setError("Something went wrong while uploading the image.");
  } finally {
    setLoading(false);
  }
} 

  const startCamera = async () => {
  try {
    setIsSettingUpCamera(true);
    setShowCameraView(false);

    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });

    setStream(mediaStream);
    setIsSettingUpCamera(false);
    setShowCameraView(true);

  } catch (err) {
    console.error("Camera access denied:", err);
    setIsSettingUpCamera(false);
    setShowCameraView(false);
  }
};

const capturePhoto = () => {
  if (!videoRef.current) return;

  const canvas = document.createElement("canvas");
  canvas.width = videoRef.current.videoWidth;
  canvas.height = videoRef.current.videoHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.drawImage(videoRef.current, 0, 0);

  const image = canvas.toDataURL("image/png");

  setCapturedImage(image);
  setShowCameraView(false);

  stream?.getTracks().forEach(track => track.stop());
};

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file.");
      return;
    }

    handleFile(file);
  }

  return (
    <div className="upload-container">
      <header className="upload-header">
        <div className="upload-brand">
        <span className="upload-logo">SKINSTRIC</span>
         <img className="upload-tag" src={introBtn} alt="Intro" />
        </div>
        
        <button>ENTER CODE</button>
      </header>

      <p className="upload-top-label">TO START ANALYSIS</p>

        <main className="upload-main">
          <div className="upload-option upload-option--camera">
            <div className="upload-rotating-stack">
              <div className="upload-frame upload-frame--1" />
              <div className="upload-frame upload-frame--2" />
              <div className="upload-frame upload-frame--3" />

              <button
                type="button"
                className="upload-circle"
                onClick={() => setShowCameraModal(true)}
              >
                <img
                  src={cameraIcon}
                  alt="Camera"
                  className="upload-icon upload-icon--camera"
                />
              </button>          

              <div className="upload-callout upload-callout--camera">
                <img
                  src={lineDotCamera}
                  alt=""
                  aria-hidden="true"
                  className="upload-callout__svg"
                />
                <p className="upload-callout__text">
                  ALLOW A.I.
                  <br />
                  TO SCAN YOUR FACE
                </p>
              </div>
            </div>
          </div>

          <div className="upload-option upload-option--gallery">
            <div className="upload-rotating-stack">
              <div className="upload-frame upload-frame--1" />
              <div className="upload-frame upload-frame--2" />
              <div className="upload-frame upload-frame--3" />

              <label className="upload-circle">
                <img
                  src={galleryIcon}
                  alt="Gallery"
                  className="upload-icon upload-icon--gallery"
                />
                <input type="file" accept="image/*" onChange={handleInput} hidden />
              </label>

              <div className="upload-callout upload-callout--gallery">
                <img
                  src={lineDotGallery}
                  alt=""
                  aria-hidden="true"
                  className="upload-callout__svg"
                />
                <p className="upload-callout__text">
                  ALLOW A.I.
                  <br />
                  ACCESS GALLERY
                </p>
              </div>
            </div>
          </div>

            {showCameraModal && (
              <div className="camera-modal">
                <div className="camera-modal__box">
                  <p>ALLOW A.I. TO ACCESS YOUR CAMERA</p>

                  <div className="camera-modal__actions">
                    <button onClick={() => setShowCameraModal(false)}>
                      DENY
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowCameraModal(false);
                        startCamera(); 
                      }}
                    >
                      ALLOW
                    </button>
                  </div>
                </div>
              </div>
            )}
              {isSettingUpCamera && (
                <div className="camera-setup-screen">
                  <div className="camera-setup-content">
                    <img
                      src={cameraIcon}
                      alt="Camera setup"
                      className="camera-setup-icon"
                    />
                    <p>SETTING UP CAMERA...</p>
                  </div>
                </div>
              )}

              {showCameraView && (
                <div className="camera-live-screen">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="camera-live-video"
                  />

                  <div className="camera-overlay-top">
                    <div className="upload-brand">
                      <span className="upload-logo">SKINSTRIC</span>
                      <img className="upload-tag" src={introBtn} alt="Intro" />
                    </div>

                    <button type="button" className="upload-header-code">
                      ENTER CODE
                    </button>
                  </div>

                  <div className="camera-overlay-help">
                    <p>TO GET BETTER RESULTS MAKE SURE TO HAVE</p>
                    <div className="camera-overlay-help__tips">
                      <span>◇ NEUTRAL EXPRESSION</span>
                      <span>◇ FRONTAL POSE</span>
                      <span>◇ ADEQUATE LIGHTING</span>
                    </div>
                  </div>

                  <button type="button" className="camera-back-btn" onClick={() => navigate(-1)}>
                    <img src={buttonBoxLeft} alt="" aria-hidden="true" />
                    <span>BACK</span>
                  </button>

                  <button type="button" className="camera-capture-icon" onClick={capturePhoto}>
                    <span className="camera-capture-icon__text">TAKE PICTURE</span>
                    <div className="camera-shutter">
                      <FiCamera />
                    </div>
                  </button>
                </div>
              )}

              {capturedImage && (
                <div className="camera-preview-screen">
                  <img src={capturedImage} alt="Preview" />

                  <div className="camera-preview-overlay">
                    <p>Preview</p>

                    <div className="camera-preview-actions">
                      <button
                        type="button"
                        onClick={() => {
                          setCapturedImage(null);
                          startCamera(); 
                        }}
                      >
                        Retake
                      </button>

                      <button
                        type="button"
                        onClick={async () => {
                          if (!capturedImage) return;

                          try {
                            setLoading(true);
                            setPreview(capturedImage);

                            const data = await sendToAPI(capturedImage);

                            setAnalysisData(data);
                            setCapturedImage(null);

                            navigate("/analysis", {
                              state: {
                                image: capturedImage,
                                analysis: data,
                              },
                            });
                          } catch (err) {
                            console.error(err);
                            setError("Something went wrong while uploading the image.");
                          } finally {
                            setLoading(false);
                          }
                        }}
                      >
                        Use This Photo
                      </button>
                    </div>
                  </div>
                </div>
              )}

          <div className="upload-preview">
            <p>Preview</p>
            <div className="upload-preview-box">
              {preview && <img src={preview} alt="preview" />}
            </div>
          </div>
        </main>

      {loading && <p>Uploading...</p>}
      {error && <p>{error}</p>}

      <button
        className="upload-back"
        type="button"
        onClick={() => navigate(-1)}>
        <img src={buttonBoxLeft} alt="" aria-hidden="true" />
        <span>BACK</span>
      </button>
    </div>
  );
}

function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read file"));
  });
}

async function sendToAPI(base64: string) {
  const res = await fetch(
    "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: base64,
      }),
    }
  );

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  const data = await res.json();
  console.log("API RESPONSE:", data);
  return data;
}
import React, { useState } from "react";
import Navbar from "./Navbar.js";

const ComicPageGenerator = () => {
  const [panelInputs, setPanelInputs] = useState(Array(10).fill(""));
  const [panelDescriptions, setPanelDescriptions] = useState(
    Array(10).fill("")
  );
  const [comicPageVisible, setComicPageVisible] = useState(false);
  const [panelImages, setPanelImages] = useState([]);
  const [warning, setWarning] = useState("");
  const [loading, setLoading] = useState(false);

  const query = async (data) => {
    try {
      const response = await fetch(
        "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
        {
          method: "POST",
          headers: {
            Accept: "image/png",
            Authorization:
              "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.blob();
      return result;
    } catch (error) {
      console.error("Error querying the API:", error);
      throw error;
    }
  };

  const handleInputChange = (index, value) => {
    const newPanelInputs = [...panelInputs];
    newPanelInputs[index] = value;
    setPanelInputs(newPanelInputs);
  };

  const handleDescriptionChange = (index, value) => {
    const newPanelDescriptions = [...panelDescriptions];
    newPanelDescriptions[index] = value;
    setPanelDescriptions(newPanelDescriptions);
  };

  const generateComic = async () => {
    if (panelInputs.some((input) => !input.trim())) {
      // setWarning("Please fill in all the fields.");
      alert("Please fill in the description of all panels!")
      return;
    }

    try {
      setLoading(true);
      const images = await Promise.all(
        panelInputs.map((input) => query({ inputs: input }))
      );

      setPanelImages(images);
      setComicPageVisible(true);
      setWarning("");
    } catch (error) {
      console.error("Error generating comic:", error);
      setWarning("Error generating comic. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="page-title">
        <h2>AI-Powered Comics.</h2>
        <div className="page-description">
          <h4>Now create illustrated content with unprecendented ease and speed with the help of Dashtoon's state-of-the-art generative AI</h4>
        </div>
        {warning && <p className="warning">{warning}</p>}
        <form className="form">
          {[...Array(10).keys()].map((panelNumber) => (
            <div key={panelNumber + 1} className="panel-input">
              <label htmlFor={`panel${panelNumber + 1}`}>
                Panel {panelNumber + 1}:
              </label>
              <input
                type="text"
                id={`panel${panelNumber + 1}`}
                placeholder={`Enter image description for Panel ${panelNumber + 1}`}
                value={panelInputs[panelNumber]}
                onChange={(e) => handleInputChange(panelNumber, e.target.value)}
              />
              <input
                type="text"
                placeholder={`Describe the story or caption for Panel ${panelNumber + 1}`}
                value={panelDescriptions[panelNumber]}
                onChange={(e) =>
                  handleDescriptionChange(panelNumber, e.target.value)
                }
              />
            </div>
          ))}

          <button
            type="button"
            onClick={generateComic}
            className="generate-button"
          >
            {loading ? "Watch as your masterpiece comes to life..." : "Generate a Hilarious Comic!"}
          </button>
        </form>

        <div className="note">
          <h4><i>NOTE: Your initial request is like a VIP entering a bustling party. Hang tight, as it sometimes might take upto 10 minutes
            for the servers to gear up for a stellar performance. Subsequent requests will groove through more swiftly.</i></h4>
        </div>

        {comicPageVisible && (
          <div className="comic-page">
            <h3>Comic Strip</h3>
            <div className="panels-container">
              {panelImages.map((image, index) => (
                <div key={index} className="panel">
                  <p className="panel-description">
                    {panelDescriptions[index]}
                  </p>
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Panel ${index + 1}`}
                    className="panel-image"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ComicPageGenerator;

import React, { useState, useRef, useEffect } from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import "./DynamicForm.css";

const DynamicForm = ({
  formData,
  setFormData,
  fileRefs,
  ad,
  setAd,
  setIsOpen,
}) => {
  const [formCompleted, setFormCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("formdata", formData);
    console.log("ad", ad);

    // Check if all fields are filled
    const allFieldsFilled = formData.every((row) => row.text && row.image);
    setFormCompleted(allFieldsFilled);
  }, [formData, ad]);

  const handleTextChange = (index, value) => {
    const newFormData = [...formData];
    newFormData[index].text = value;
    setFormData(newFormData);
  };

  const handleImageChange = (index, event) => {
    const newFormData = [...formData];
    newFormData[index].blob = event.target.files[0];
    newFormData[index].image = URL.createObjectURL(event.target.files[0]);
    setFormData(newFormData);
  };

  const handleAddRow = () => {
    setFormData((prevFormData) => [...prevFormData, { text: "", image: null }]);
  };

  const handleDelete = async (file) => {
    // setLoading(true);
    // setAd({ ...ad, uploading: true });
    try {
      const { data } = await axios.post("/remove-image", file);
      if (data?.ok) {
        setAd((prev) => ({
          ...prev,
          photos: prev.photos.filter((p) => p.Key !== file.Key),
          uploading: false,
        }));
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setAd({ ...ad, uploading: false });
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (formData.length === 0) {
      setIsOpen(false);
      return;
    }

    try {
      setLoading(true);
      const files = formData;
      console.log("files", files);
      if (files?.length) {
        setAd((prev) => ({ ...prev, uploading: true }));

        // Use Promise.all to wait for all image uploads to complete
        const uploadedPhotos = await Promise.all(
          files.map((file) => {
            if (file.blob === null) {
              return {
                Key: file.text,
                Location: file.image,
              };
            }

            return new Promise(async (resolve) => {
              Resizer.imageFileResizer(
                file.blob,
                1080,
                720,
                "JPEG",
                100,
                0,
                async (uri) => {
                  try {
                    const { data } = await axios.post("/upload-image", {
                      image: uri,
                      label: file.text,
                    });
                    resolve(data);
                  } catch (err) {
                    console.log(err);
                    resolve(null);
                  }
                },
                "base64",
              );
            });
          }),
        );

        // Remove null entries (failed uploads) and filter out duplicates
        const filteredPhotos = uploadedPhotos.filter(Boolean);
        const uniquePhotos = Array.from(
          new Set([
            ...ad.photos.map((photo) => photo.Location),
            ...filteredPhotos.map((photo) => photo.Location),
          ]),
        ).map((location) =>
          filteredPhotos.find((photo) => photo.Location === location),
        );

        setAd((prev) => ({
          ...prev,
          photos: uniquePhotos,
          uploading: false,
        }));

        setLoading(false);
        setIsOpen(false);
      }
    } catch (err) {
      console.log(err);
      setAd((prev) => ({ ...prev, uploading: false }));
      setLoading(false);
    }
  };

  const handleRemoveRow = (index) => {
    if (formData[index].blob) {
      const answer = window.confirm("Delete image?");
      if (!answer) return;
      handleDelete(ad.photos[index]);
    }

    const newFormData = [...formData];
    newFormData.splice(index, 1);

    // Update the ad.photos array by removing the corresponding element
    setAd((prev) => ({
      ...prev,
      photos: [...prev.photos.slice(0, index), ...prev.photos.slice(index + 1)],
    }));

    setFormData(newFormData);
  };

  const handleFileButtonClick = (index) => {
    fileRefs.current[index].click();
  };

  return (
    <div className="dynamic-form">
      <p className="dynamic-form-title">Upload Photos</p>
      {formData.map((row, index) => (
        <div key={index} className="form-row">
          <input
            type="text"
            value={row.text}
            className="form-control"
            placeholder="Enter text"
            onChange={(e) => handleTextChange(index, e.target.value)}
          />
          <div style={{ width: "40px" }} />
          <div className="form-col">
            {row.image && (
              <>
                <img
                  src={row.image}
                  alt={`Image for row ${index}`}
                  className="form-imager"
                  // style={{
                  //   width: "600px",
                  //   height: "400px",
                  //   // width: "100%",
                  // }}
                />
                <div style={{ height: "5px" }} />
              </>
            )}
            <>
              <input
                type="file"
                className="input-style m-2"
                accept="image/*"
                style={{ display: "none" }}
                ref={(ref) => (fileRefs.current[index] = ref)}
                onChange={(e) => handleImageChange(index, e)}
              />
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <button
                  className="btn btn-success"
                  onClick={() => handleFileButtonClick(index)}
                >
                  Upload
                </button>
                <div style={{ width: "5px" }} />
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => handleRemoveRow(index)}
                >
                  X
                </button>
              </div>
            </>
          </div>
        </div>
      ))}
      <div style={{ height: "20px" }} />
      {/* <div */}
      {/*   style={{ position: "relative", width: "100%", backgroundColor: "red" }} */}
      {/* > */}
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          backgroundColor: "white",
          alignItems: "center",
          position: "sticky",
          padding: "15px 10px 15px",
          bottom: "-10px",
          left: 0,
        }}
      >
        <button
          type="button"
          onClick={handleAddRow}
          className="btn btn-secondary"
        >
          Add new row
        </button>
        <div style={{ display: "flex" }}>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="btn btn-danger"
          >
            Cancel
          </button>
          <div style={{ width: "10px" }} />
          <button
            type="button"
            onClick={handleConfirm}
            className={`btn btn-primary ${formCompleted ? "" : "disabled"}`}
            disabled={!formCompleted || loading}
          >
            {loading ? "Uploading Images" : "Confirm images"}
          </button>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default DynamicForm;

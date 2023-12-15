import React, { useState } from "react";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import "./DocumentForm.css";

const DocumentForm = ({
  passportPhoto,
  setPassportPhoto,
  proofOfIdentification,
  setProofOfIdentification,
  proofType,
  setProofType,
  cacCertification,
  setCacCertification,
  error,
  setError,
  proofTypeError,
  setProofTypeError,
  uploadedFiles,
  setUploadedFiles,
  setIsOpen,
}) => {
  const [loading, setLoading] = useState(false);
  const handlePassportPhotoChange = (e) => {
    const file = e.target.files[0];
    setPassportPhoto(file);
  };

  const handleProofOfIdentificationChange = (e) => {
    const file = e.target.files[0];
    setProofOfIdentification(file);
  };

  const handleProofTypeChange = (e) => {
    setError(""); // Clear previous error
    setProofType(e.target.value);
  };

  const handleCacCertificationChange = (e) => {
    const file = e.target.files[0];
    setCacCertification(file);
  };

  const handleViewDocument = (document) => {
    const documentURL = URL.createObjectURL(document);
    window.open(documentURL, "_blank");
  };

  const handleConfirmDocuments = async () => {
    try {
      if (!passportPhoto || !proofOfIdentification || !cacCertification) {
        setError("Please upload all required documents.");
        setProofTypeError(""); // Clear proof type error if other errors are present
        return;
      }

      if (!proofType) {
        setProofTypeError("Please select an identification type.");
        setError(""); // Clear other errors if proof type error is present
        return;
      }

      setLoading(true);

      const uploadImage = async (file, label) => {
        if (!file.type.startsWith("image/")) {
          console.error("File Is NOT Image!");
          console.error("this file", file);
          alert(`${label} is NOT an Image`);
          return null;
        }
        return new Promise(async (resolve) => {
          Resizer.imageFileResizer(
            file,
            1080,
            720,
            "JPEG",
            100,
            0,
            async (uri) => {
              try {
                const { data } = await axios.post("/upload-image", {
                  file: uri,
                  label,
                });
                resolve(data);
              } catch (err) {
                console.error(err);
                resolve(null);
              }
            },
            "base64",
          );
        });
      };

      // const uploadImage = async (file, label) => {
      //   try {
      //     const formData = new FormData();
      //     formData.append("file", file);
      //     formData.append("label", label);
      //
      //     const { data } = await axios.post("/upload-image", formData);
      //     return data;
      //   } catch (err) {
      //     console.error(err);
      //     return null;
      //   }
      // };

      const uploadedPhotos = await Promise.all([
        uploadImage(passportPhoto, "Passport Photo Identification"),
        uploadImage(
          proofOfIdentification,
          `Proof of Identification - ${proofType}`,
        ),
        uploadImage(cacCertification, "CAC Certification"),
      ]);

      // Remove null entries (failed uploads) and filter out duplicates
      const filteredPhotos = uploadedPhotos.filter(Boolean);

      // Extract the labels of successfully uploaded files
      const uploadedFileLabels = filteredPhotos.map((photo) => photo.Key);

      console.log("uploaded", uploadedPhotos);
      console.log("filteredPhotos", filteredPhotos);
      console.log("uploadedFileLabels", uploadedFileLabels);
      setUploadedFiles(uploadedFileLabels);
      setIsOpen(false);
      setLoading(false);
      // Process the filteredPhotos as needed
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="document-form">
      <div className="document-form-title">Document Upload</div>
      <div className="mb-3">
        <label className="form-label">Passport Photo Identification:</label>
        <input
          type="file"
          className="form-control"
          accept="image/*, application/pdf"
          onChange={handlePassportPhotoChange}
        />
        {passportPhoto && (
          <button
            className="btn btn-secondary mt-2"
            onClick={() => handleViewDocument(passportPhoto)}
          >
            View Document: {passportPhoto.name}
          </button>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">Proof of Identification:</label>
        <input
          type="file"
          className="form-control"
          accept="image/*, application/pdf"
          onChange={handleProofOfIdentificationChange}
        />
        <div className="mt-2">
          <label className="form-check-label">
            <input
              type="radio"
              className="form-check-input"
              value="Drivers License"
              checked={proofType === "Drivers License"}
              onChange={handleProofTypeChange}
            />
            Drivers License
          </label>
          <label className="form-check-label">
            <input
              type="radio"
              className="form-check-input"
              value="International Passport"
              checked={proofType === "International Passport"}
              onChange={handleProofTypeChange}
            />
            International Passport
          </label>
          <label className="form-check-label">
            <input
              type="radio"
              className="form-check-input"
              value="National ID Card"
              checked={proofType === "National ID Card"}
              onChange={handleProofTypeChange}
            />
            National ID Card
          </label>
          <label className="form-check-label">
            <input
              type="radio"
              className="form-check-input"
              value="Permanent Voter Card"
              checked={proofType === "Permanent Voter Card"}
              onChange={handleProofTypeChange}
            />
            Permanent Voter Card
          </label>
        </div>
        {proofOfIdentification && (
          <button
            className="btn btn-secondary mt-2"
            onClick={() => handleViewDocument(proofOfIdentification)}
          >
            View Document: {proofOfIdentification.name}
          </button>
        )}
      </div>
      {proofTypeError && <p className="text-danger">{proofTypeError}</p>}
      <div className="mb-3">
        <label className="form-label">CAC Certification:</label>
        <input
          type="file"
          className="form-control"
          accept="image/*, application/pdf"
          onChange={handleCacCertificationChange}
        />
        {cacCertification && (
          <button
            className="btn btn-secondary mt-2"
            onClick={() => handleViewDocument(cacCertification)}
          >
            View Document: {cacCertification.name}
          </button>
        )}
      </div>
      {error && <p className="text-danger">{error}
      </p>}
      {uploadedFiles.length > 0 && (
        <p className="text-success">
          Uploaded Files: {uploadedFiles.join(", ")}
        </p>
      )}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <button className="btn btn-primary" onClick={handleConfirmDocuments}>
          {loading ? "Uploading, please wait..." : "Confirm Documents"}
        </button>
      </div>
    </div>
  );
};

export default DocumentForm;

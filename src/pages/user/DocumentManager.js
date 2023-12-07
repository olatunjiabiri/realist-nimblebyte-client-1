import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import { DataGrid } from "@mui/x-data-grid";
import { FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const DocumentManager = () => {
  const [loading, setLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [error, setError] = useState("");
  const [proofType, setProofType] = useState("");
  const [passportPhoto, setPassportPhoto] = useState(null);
  const [proofOfIdentification, setProofOfIdentification] = useState(null);
  const [cacCertification, setCacCertification] = useState(null);
  const [currentProofType, setCurrentProofType] = useState("Drivers License"); // New state
  const [fileRows, setFileRows] = useState([]);

  const [isProofTypeSelected, setIsProofTypeSelected] = useState(false);
  const [selectedProofType, setSelectedProofType] = useState("");
  const navigate = useNavigate();

  const handleViewDocument = (document) => {
    console.log("document", document);
    const documentURL = document?.Location;
    window.open(documentURL, "_blank");
  };

  const handleConfirmDocuments = async () => {
    try {
      // Your existing logic for confirming documents
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleProofTypeChange = (e) => {
    setError("");
    setProofType(e.target.value);
    setIsProofTypeSelected(!!e.target.value); // Set to true if a proof type is selected
  };

  const uploadImage = async (file, label) => {
    if (!file.type.startsWith("image/")) {
      return new Promise(async (resolve) => {
        const reader = new FileReader();

        reader.onload = async () => {
          try {
            const base64Data = reader.result.split(",")[1]; // Extract base64 data
            const { data } = await axios.post("/upload-image", {
              file: base64Data,
              label,
              fileType: "document",
            });
            resolve(data);
          } catch (err) {
            console.error(err);
            resolve(null);
          }
        };

        reader.readAsDataURL(file); // Read the file as base64
      });
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

  const fileColumns = [
    {
      field: "id",
      // headerClassName: "datatableTitle",
      headerName: "S/N",
      width: 20,
    },
    {
      field: "fileName",
      headerName: "File Name",
      headerClassName: "datatableTitle",
      width: 300,
      renderCell: (params) => (
        <div className="form-control ">{params.row.fileName}</div>
      ),
    },
    {
      field: "upload",
      headerClassName: "datatableTitle",
      headerName: "Upload",
      width: 320,
      renderCell: (params) => (
        <div className="form-control">{params.row.upload}</div>
      ),
    },
    {
      field: "document",
      headerName: "Document",
      headerClassName: "datatableTitle",
      width: 350,
      renderCell: (params) => (
        <div
          onClick={() => handleViewDocument(params.row.document)}
          className="frm-control"
          style={{
            textDecoration: params.row.document.Key && "underline",
            color: params.row.document.Key && "#007BFF",
            cursor: params.row.document.Key && "pointer",
          }}
        >
          {params.row.document.Key || "No uploaded document"}
        </div>
      ),
    },
    {
      field: "status",
      headerClassName: "datatableTitle",
      headerName: "Status",
      width: 150,
    },
  ];

  // useEffect(() => {
  //   // Update the fileRows when proofType changes
  //   setFileRows((prevRows) =>
  //     prevRows.map((row) => {
  //       if (row.id === 2) {
  //         return {
  //           ...row,
  //           upload: (
  //             <input
  //               type="file"
  //               className="form-control"
  //               accept="image/*, application/pdf"
  //               onChange={(e) =>
  //                 handleUpload(
  //                   e.target.files[0],
  //                   `Proof of Identification - ${proofType}`,
  //                   2,
  //                   proofType,
  //                 )
  //               }
  //             />
  //           ),
  //         };
  //       }
  //       return row;
  //     }),
  //   );
  // }, [proofType]);
  //

  useEffect(() => {
    setFileRows((prevRows) =>
      prevRows.map((row) => {
        if (row.id === 2) {
          return {
            ...row,
            upload: (
              <input
                type="file"
                className="form-control"
                accept="image/*, application/pdf"
                onChange={(e) =>
                  isProofTypeSelected &&
                  handleUpload(
                    e.target.files[0],
                    `Proof of Identification - ${proofType}`,
                    2,
                    proofType,
                  )
                }
              />
            ),
          };
        }
        return row;
      }),
    );
  }, [proofType, isProofTypeSelected]);

  useEffect(() => {
    setFileRows([
      {
        id: 1,
        fileName: "Passport photo",
        upload: (
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) =>
              handleUpload(
                e.target.files[0],
                "Passport Photo Identification",
                1,
              )
            }
          />
        ),
        document: "",
        status: "",
      },
      {
        id: 2,
        fileName: (
          <div
            style={{ display: "flex", alignItems: "center" }}
            className="dropdown"
          >
            {/* <p */}
            {/*   style={{ marginBottom: 0, marginRight: 5 }} */}
            {/*   className="frm-label" */}
            {/* > */}
            {/*   Proof of Identification */}
            {/* </p> */}

            <select
              className="btn btn-light"
              onChange={(e) => {
                handleProofTypeChange(e);
                setSelectedProofType(e.target.value);
              }}
              value={selectedProofType}
            >
              <option value="" disabled hidden>
                Select proof of identification
              </option>
              <option value="Drivers Licence">Drivers licence</option>
              <option value="International Passport">
                International Passport
              </option>
              <option value="NIN">NIN</option>
              <option value="Permanent voters card">
                Permanent voters card
              </option>
            </select>
          </div>
        ),
        upload: (
          <input
            type="file"
            className="form-control"
            accept="image/*, application/pdf"
            onChange={(e) =>
              handleUpload(
                e.target.files[0],
                `Proof of Identification - ${proofType}`,
                2,
                proofType,
              )
            }
          />
        ),
        document: "",
        status: "",
      },
      {
        id: 3,
        fileName: "CAC certificate",
        upload: (
          <input
            type="file"
            className="form-control"
            accept="image/*, application/pdf"
            onChange={(e) =>
              handleUpload(e.target.files[0], "CAC Certification", 3)
            }
          />
        ),
        document: "",
        status: "",
      },
    ]);
  }, []);

  useEffect(() => {
    setFileRows((prevRows) =>
      prevRows.map((row) => {
        if (row.id === 2) {
          // Check if the document already exists for the row
          if (row.document.Key) {
            // Re-upload the existing document with the new proof type
            handleUpload(
              row.document, // Pass the existing document
              `Proof of Identification - ${selectedProofType}`,
              2,
              selectedProofType,
            );
          }

          return {
            ...row,
            fileName: (
              <div
                style={{ display: "flex", alignItems: "center" }}
                className="dropdown"
              >
                <select
                  className="btn btn-light"
                  onChange={(e) => {
                    handleProofTypeChange(e);
                    setSelectedProofType(e.target.value);
                  }}
                  value={selectedProofType}
                >
                  <option value="" disabled hidden>
                    Select proof of identification
                  </option>
                  <option value="Drivers Licence">Drivers licence</option>
                  <option value="International Passport">
                    International Passport
                  </option>
                  <option value="NIN">NIN</option>
                  <option value="Permanent voters card">
                    Permanent voters card
                  </option>
                </select>
              </div>
            ),
            upload: isProofTypeSelected ? (
              <input
                type="file"
                className="form-control"
                accept="image/*, application/pdf"
                onChange={(e) =>
                  handleUpload(
                    e.target.files[0],
                    `Proof of Identification - ${selectedProofType}`,
                    2,
                    selectedProofType,
                  )
                }
              />
            ) : (
              <div className="form-control text-danger">
                Please select an identification type
              </div>
            ),
          };
        }
        return row;
      }),
    );
  }, [selectedProofType]);

  const handleUpload = useCallback(
    async (file, label, rowId, selectedProofType) => {
      console.log("proof type0", selectedProofType);
      console.log("main proof type", proofType);
      try {
        if (!file) {
          setError(`Please upload ${label}`);
          return;
        }

        setLoading(true);
        setFileRows((prevRows) =>
          prevRows.map((row) =>
            row.id === rowId ? { ...row, status: "Uploading" } : row,
          ),
        );

        //upload document
        const uploadedPhoto = await uploadImage(
          file,
          rowId === 2
            ? `Proof of Identification - ${selectedProofType}`
            : label,
        );

        setLoading(false);
        console.log("uploadedPhoto", uploadedPhoto);

        if (uploadedPhoto.error) {
          return setFileRows((prevRows) =>
            prevRows.map((row) =>
              row.id === rowId
                ? {
                    ...row,
                    document: uploadedPhoto,
                    status: uploadedPhoto.error,
                  }
                : row,
            ),
          );
        }

        if (uploadedPhoto) {
          setUploadedFiles((prevFiles) => [...prevFiles, uploadedPhoto.Key]);

          // Update the row with the document name and new proof type
          setFileRows((prevRows) =>
            prevRows.map((row) =>
              row.id === rowId
                ? {
                    ...row,
                    document: uploadedPhoto,
                    status: "Not Submitted",
                    // Add the new proof type to the row
                    proofType: selectedProofType,
                  }
                : row,
            ),
          );
        }
      } catch (error) {
        console.error(error);
        setError("An error occurred during upload");
        setLoading(false);
      }
    },
    [
      proofType,
      setFileRows,
      setUploadedFiles,
      setLoading,
      setError,
      uploadImage,
    ],
  );

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "84vh" }}
      className="container"
    >
      <div style={{ marginTop: "100px", padding: "20px 40px" }}>
        <h1 className="label mb-4">Document manager</h1>
        <DataGrid className="mb-4" rows={fileRows} columns={fileColumns} />
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button
            style={{ alignSelf: "flex-end", display: "flex" }}
            className="btn btn-danger"
            onClick={goBack}
          >
            Cancel
          </button>
          <div style={{ width: "10px" }} />
          <button
            style={{ alignSelf: "flex-end", display: "flex" }}
            className="btn btn-primary"
            onClick={handleConfirmDocuments}
          >
            Submit And Update Profile
          </button>
        </div>
      </div>
      <div style={{ flex: 1, height: "100%" }}></div>
    </div>
  );
};

export default DocumentManager;

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import config from "../../NewConfig";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";

const DocumentManager = () => {
  const [loading, setLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [error, setError] = useState("");
  const [proofType, setProofType] = useState("");
  const [fileRows, setFileRows] = useState([]);

  const [isProofTypeSelected, setIsProofTypeSelected] = useState(false);
  const [selectedProofType, setSelectedProofType] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  // console.log("auth ", auth);

  const handleViewDocument = (document) => {
    // console.log("document", document);
    const documentURL = document?.Location || document?.Key;
    window.open(documentURL, "_blank");
  };
  // const handleViewDocument = async (document) => {
  //   try {
  //     const response = await fetch(document?.Location || document?.Key);
  //     const blob = await response.blob();
  //     console.log("response", response);
  //     console.log("blob", blob);
  //     const blobUrl = window.URL.createObjectURL(blob);
  //     window.open(blobUrl, "_blank");
  //   } catch (error) {
  //     console.error("Error opening document:", error);
  //   }
  // };

  function determineStatus(agentDocuments, id) {
    const document = agentDocuments.find((doc) => doc.documentTypeId === id);

    if (!document) {
      return ""; // or some default status if appropriate
    }

    const { approvalStatus, documentUrl, comment } = document;
    // console.log("comment", comment);

    switch (true) {
      case approvalStatus:
        return "Approved";
      case documentUrl && !comment:
        return "Pending";
      case documentUrl && comment && !approvalStatus:
        return "Rejected";
      default:
        return ""; // Default case if none of the above conditions are met
    }
  }

  const handleConfirmDocuments = async () => {
    try {
      // Build the agentDocuments array based on uploaded files
      const agentDocuments = fileRows.map((row) => ({
        documentTypeId: row.documentType, // Set the appropriate documentTypeId
        documentUrl: row.document?.Location || row.document.Key || "", // Use the document URL if available
        documentName: row.id === 1 ? "identification" : row.fileName || "", // Use the fileName as the documentName
      }));
      // Check if all three statuses are "Submitted"
      const allSubmitted = fileRows.some((row) => row.document.Key === "");

      if (allSubmitted) {
        // If any status is not "Submitted", show an error message and return
        toast.warn("Please submit all required documents.");
        return;
      }

      const profile = JSON.parse(localStorage.getItem("profile"));

      setLoading(true);

      // console.log("final result", {
      //   ...profile,
      //   agentDocuments,
      // });

      // console.log("Roles", roles);
      const { data } = await axios.post(
        `${config.AUTH_API}/user/updateProfile`,
        {
          ...profile,
          agentDocuments,
        },
      );

      if (!data.success) {
        toast.error(data.message);
        setLoading(false);
      } else {
        const data1 = {
          ...auth.user,
          userId: auth.user.userId,
          agentDocuments: data.responsePayload.agentDocuments,
        };

        // console.log("data1", data1);
        setAuth({
          ...auth,
          user: data.responsePayload,
          agentDocuments: data.responsePayload.agentDocuments,
        });

        let fromLS = JSON.parse(localStorage.getItem("auth"));
        fromLS.user = data1;
        localStorage.setItem("auth", JSON.stringify(fromLS));
        setLoading(false);

        // console.log("data storage", localStorage.getItem("auth"));

        toast.success("Profile updated");

        // reload page on redirect
        window.location.href = "/";
      }
    } catch (err) {
      toast.error("Something went wrong. Try again.");
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
        <div className="btn p-0">{params.row.fileName}</div>
      ),
    },
    {
      field: "upload",
      headerClassName: "datatableTitle",
      headerName: "Upload",
      width: 320,
      renderCell: (params) => (
        <div className="btn p-0">{params.row.upload}</div>
      ),
    },
    {
      field: "document",
      headerName: "Document",
      headerClassName: "datatableTitle",
      width: 250,
      renderCell: (params) => (
        <div
          onClick={() => handleViewDocument(params.row.document)}
          className="btn p-0"
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
      renderCell: (params) => (
        <div className="btn p-0">{params.row.status}</div>
      ),
    },
    {
      field: "Comment",
      headerClassName: "datatableTitle",
      headerName: "Comment",
      width: 400,
      renderCell: (params) => (
        <div className="btn p-0">{params.row.comment}</div>
      ),
    },
  ];

  useEffect(() => {
    setFileRows((prevRows) =>
      prevRows.map((row) => {
        if (row.id === 1) {
          return {
            ...row,
            upload: (
              <input
                type="file"
                className="form-control"
                disabled={
                  auth.user.agentDocuments.find(
                    (doc) => doc.documentTypeId === 1,
                  )?.approvalStatus
                }
                accept="image/*, application/pdf"
                onChange={(e) =>
                  isProofTypeSelected &&
                  handleUpload(
                    e.target.files[0],
                    `Proof of Identification - ${proofType}`,
                    1,
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
    if (auth.user.agentDocuments) {
      setFileRows([
        {
          id: 1,
          documentType: 1,
          fileName: (
            <div
              style={{ display: "flex", alignItems: "center" }}
              className="dropdown"
            >
              <select
                className="btn btn-light"
                disabled={
                  auth.user.agentDocuments.find(
                    (doc) => doc.documentTypeId === 1,
                  )?.approvalStatus
                }
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
              disabled={
                auth.user.agentDocuments.find((doc) => doc.documentTypeId === 1)
                  ?.approvalStatus
              }
              onChange={(e) =>
                handleUpload(
                  e.target.files[0],
                  `Proof of Identification - ${proofType}`,
                  1,
                  proofType,
                )
              }
            />
          ),
          document: {
            Key:
              auth.user.agentDocuments.find((doc) => doc.documentTypeId === 1)
                ?.documentUrl || "",
          },
          status: determineStatus(auth.user.agentDocuments, 1),
          comment:
            auth.user.agentDocuments.find((doc) => doc.documentTypeId === 1)
              ?.comment || "",
        },
        {
          id: 2,
          fileName: "Passport photo",
          documentType: 3,
          upload: (
            <input
              type="file"
              className="form-control"
              disabled={
                auth.user.agentDocuments.find((doc) => doc.documentTypeId === 3)
                  ?.approvalStatus
              }
              accept="image/*"
              onChange={(e) =>
                handleUpload(
                  e.target.files[0],
                  "Passport Photo Identification",
                  2,
                )
              }
            />
          ),
          document: {
            Key:
              auth.user.agentDocuments.find((doc) => doc.documentTypeId === 3)
                ?.documentUrl || "",
          },
          status: determineStatus(auth.user.agentDocuments, 3),
          comment:
            auth.user.agentDocuments.find((doc) => doc.documentTypeId === 3)
              ?.comment || "",
        },
        {
          id: 3,
          documentType: 2,
          fileName: "CAC certificate",
          upload: (
            <input
              type="file"
              className="form-control"
              disabled={
                auth.user.agentDocuments.find((doc) => doc.documentTypeId === 2)
                  ?.approvalStatus
              }
              accept="image/*, application/pdf"
              onChange={(e) =>
                handleUpload(e.target.files[0], "CAC Certification", 3)
              }
            />
          ),
          document: {
            Key:
              auth.user.agentDocuments.find((doc) => doc.documentTypeId === 2)
                ?.documentUrl || "",
          },
          status: determineStatus(auth.user.agentDocuments, 2),
          comment:
            auth.user.agentDocuments.find((doc) => doc.documentTypeId === 2)
              ?.comment || "",
        },
      ]);
    } else {
      // Default values when auth.user.agentDocuments is null
      setFileRows([
        {
          id: 1,
          documentType: 1,
          fileName: (
            <div
              style={{ display: "flex", alignItems: "center" }}
              className="dropdown"
            >
              <select
                className="btn btn-light"
                disabled={
                  auth.user.agentDocuments.find(
                    (doc) => doc.documentTypeId === 1,
                  )?.approvalStatus
                }
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
                  1,
                  proofType,
                )
              }
            />
          ),
          document: {
            Key: "",
          },
          status: "",
          comment: "",
        },
        {
          id: 2,
          fileName: "Passport photo",
          documentType: 3,
          upload: (
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) =>
                handleUpload(
                  e.target.files[0],
                  "Passport Photo Identification",
                  2,
                )
              }
            />
          ),
          document: {
            Key: "",
          },
          status: "",
          comment: "",
        },
        {
          id: 3,
          documentType: 2,
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
          document: {
            Key: "",
          },
          status: "",
          comment: "",
        },
      ]);
    }
  }, [auth.user.agentDocuments, selectedProofType]);

  useEffect(() => {
    setFileRows((prevRows) =>
      prevRows.map((row) => {
        if (row.id === 1) {
          // Check if the document already exists for the row
          if (row.document.Key) {
            // Re-upload the existing document with the new proof type
            handleUpload(
              row.document, // Pass the existing document
              `Proof of Identification - ${selectedProofType}`,
              1,
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
                  disabled={
                    auth.user.agentDocuments.find(
                      (doc) => doc.documentTypeId === 1,
                    )?.approvalStatus
                  }
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
            documentType: 1,
            upload: isProofTypeSelected ? (
              <input
                type="file"
                className="form-control"
                accept="image/*, application/pdf"
                onChange={(e) =>
                  handleUpload(
                    e.target.files[0],
                    `Proof of Identification - ${selectedProofType}`,
                    1,
                    selectedProofType,
                  )
                }
              />
            ) : (
              <div className="frm-control text-danger">
                {auth.user.agentDocuments.find(
                  (doc) => doc.documentTypeId === 1,
                )?.approvalStatus
                  ? "Document is Approved"
                  : "Please, select an identification type"}
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
      // console.log("proof type0", selectedProofType);
      // console.log("main proof type", proofType);
      try {
        if (!file) {
          setError(`Please upload ${label}`);
          return;
        }

        // console.log("I got called by culprit", file);
        if (!(file instanceof File)) {
          return;
        }

        setLoading(true);
        setFileRows((prevRows) =>
          prevRows.map((row) =>
            row.id === rowId ? { ...row, status: "Uploading" } : row,
          ),
        );
        // console.log("I got called by culprit", rowId);
        //upload document
        const uploadedPhoto = await uploadImage(
          file,
          rowId === 1
            ? `Proof of Identification - ${selectedProofType}`
            : label,
        );

        setLoading(false);
        // console.log("uploadedPhoto", uploadedPhoto);

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
                    comment: "",
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
        <p>{error}</p>
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
            {loading ? "Processing" : "Submit And Update Profile"}
          </button>
        </div>
      </div>
      <div style={{ flex: 1, height: "100%" }}></div>
    </div>
  );
};

export default DocumentManager;

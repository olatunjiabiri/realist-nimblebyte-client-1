import React, { useState, useRef, useEffect } from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import "./DynamicForm.css";
import { toast } from "react-toastify";

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
  const canvasRef = useRef(null);

  useEffect(() => {
    // console.log("formdata", formData);
    // console.log("ad", ad);

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
    // newFormData[index].blob = event.target.files[0];
    // newFormData[index].image = URL.createObjectURL(event.target.files[0]);
    newFormData[index] = {
      ...newFormData[index],
      blob: event.target.files[0],
      image: URL.createObjectURL(file),
      key: newFormData[index].key || uuidv4(), // Assign a new key if it doesn't exist
    };
    setFormData(newFormData);
  };

  const handleAddRow = () => {
    setFormData((prevFormData) => [...prevFormData, { text: "", image: null }]);
  };

  // const handleDelete = async (file) => {
  //   // setLoading(true);
  //   // setAd({ ...ad, uploading: true });
  //   try {
  //     const { data } = await axios.post("/remove-image", file);
  //     if (data?.ok) {
  //       setAd((prev) => ({
  //         ...prev,
  //         photos: prev.photos.filter((p) => p.Key !== file.Key),
  //         uploading: false,
  //       }));
  //       setLoading(false);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     setAd({ ...ad, uploading: false });
  //     setLoading(false);
  //   }
  // };

  const handleDelete = async (index) => {
    return new Promise(async (resolve, reject) => {
      console.log("hello 1", index);
      console.log("hello 111111", formData[index]);
      const imageToDelete = formData[index];
      // if (!imageToDelete || !imageToDelete.key) return;

      console.log("hello", index);
      // Confirm deletion with the user
      if (!window.confirm("Delete image?")) return;

      console.log("hello 222", index);

      setLoading(true);
      try {
        await axios.post("/remove-image", {
          key: imageToDelete.key || imageToDelete.image,
        });
        // Successfully deleted from the backend, now remove from formData
        const newFormData = formData.filter((_, i) => i !== index);
        setFormData(newFormData);
      } catch (err) {
        toast.error("Failed to delete image");
        reject(err);
        console.error("Failed to delete image:", err);
      } finally {
        setLoading(false);
        resolve();
      }
    });
  };

  // const handleConfirm = async () => {
  //   if (formData.length === 0) {
  //     setIsOpen(false);
  //     return;
  //   }
  //
  //   try {
  //     setLoading(true);
  //     const files = formData;
  //     console.log("files", files);
  //     if (files?.length) {
  //       setAd((prev) => ({ ...prev, uploading: true }));
  //
  //       // Use Promise.all to wait for all image uploads to complete
  //       const uploadedPhotos = await Promise.all(
  //         files.map((file) => {
  //           if (file.blob === null) {
  //             return {
  //               Key: file.text,
  //               Location: file.image,
  //             };
  //           }
  //
  //           return new Promise(async (resolve) => {
  //             Resizer.imageFileResizer(
  //               file.blob,
  //               1080,
  //               720,
  //               "JPEG",
  //               100,
  //               0,
  //               async (uri) => {
  //                 try {
  //                   const { data } = await axios.post("/upload-image", {
  //                     image: uri,
  //                     label: file.text,
  //                   });
  //                   resolve(data);
  //                 } catch (err) {
  //                   console.log(err);
  //                   resolve(null);
  //                 }
  //               },
  //               "base64",
  //             );
  //           });
  //         }),
  //       );
  //
  //       // Remove null entries (failed uploads) and filter out duplicates
  //       const filteredPhotos = uploadedPhotos.filter(Boolean);
  //       const uniquePhotos = Array.from(
  //         new Set([
  //           ...ad.photos.map((photo) => photo.Location),
  //           ...filteredPhotos.map((photo) => photo.Location),
  //         ]),
  //       ).map((location) =>
  //         filteredPhotos.find((photo) => photo.Location === location),
  //       );
  //
  //       setAd((prev) => ({
  //         ...prev,
  //         photos: uniquePhotos,
  //         uploading: false,
  //       }));
  //
  //       setLoading(false);
  //       setIsOpen(false);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     setAd((prev) => ({ ...prev, uploading: false }));
  //     setLoading(false);
  //   }
  // };

  const handleConfirm = async () => {
    if (formData.length === 0) {
      setIsOpen(false);
      return;
    }

    try {
      setLoading(true);
      const files = formData;

      if (files?.length) {
        setAd((prev) => ({ ...prev, uploading: true }));

        const uploadedPhotos = await Promise.all(
          files.map(async (file) => {
            if (file.blob === null) {
              return {
                Key: file.text,
                Location: file.image,
              };
            }

            return new Promise(async (resolve) => {
              const image = new Image();
              image.src = URL.createObjectURL(file.blob);

              image.onload = async () => {
                const canvas = canvasRef.current;
                const context = canvas.getContext("2d");
                const newWidth = 1080;
                const newHeight = 720;
                // const newWidth = 600;
                // const newHeight = 300;

                // Resize the image using canvas
                canvas.width = newWidth;
                canvas.height = newHeight;
                context.drawImage(image, 0, 0, newWidth, newHeight);

                // Convert the canvas content back to base64
                const resizedImage = canvas.toDataURL("image/jpeg", 1.0);

                try {
                  const { data } = await axios.post("/upload-image", {
                    file: resizedImage,
                    label: file.text,
                  });
                  resolve(data);
                  // console.log("data>>", data);
                } catch (err) {
                  console.log(err);
                  resolve(null);
                }
              };
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

  const handleRemoveRow = async (index) => {
    // if (formData[index].blob) {
    //   const answer = window.confirm("Delete image?");
    //   if (!answer) return;
    // handleDelete(ad.photos[index].key);
    try {
      await handleDelete(index);
    } catch {
      console.log("error");
      return;
    }
    console.log("index", index);
    console.log(" add index", ad.photos[index]);

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
            placeholder="Enter photo name"
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
                className="input-style input-style1 m-2"
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
                  className="btn btn-success image-upload-modal-buttons "
                  onClick={() => handleFileButtonClick(index)}
                >
                  {row.image ? "Change" : "Upload"}
                </button>
                <div style={{ width: "5px" }} />
                <button
                  className="btn btn-danger image-upload-modal-buttons "
                  type="button"
                  onClick={() => handleRemoveRow(index)}
                >
                  Delete
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
      <div className="image-upload-modal-button">
        <button
          type="button"
          onClick={handleAddRow}
          className="btn btn-secondary image-upload-modal-buttons "
        >
          Add new photo
        </button>
        {/* <div style={{ display: "flex" }}> */}
        {/* <button */}
        {/*   type="button" */}
        {/*   onClick={() => setIsOpen(false)} */}
        {/*   className="btn btn-danger image-upload-modal-buttons cancel-button" */}
        {/* > */}
        {/*   Cancel */}
        {/* </button> */}
        {/* <div style={{ width: "10px" }} /> */}
        <button
          type="button"
          // onClick={handleConfirm}
          onClick={() => {
            if (!formCompleted) {
              alert("You have empty field(s). Please fill in all the fields.");
              return;
            }
            setIsOpen(false);
          }}
          className={`btn btn-primary
          image-upload-modal-buttons`}
          disabled={loading}
        >
          {/* {loading ? "Uploading Images" : "Confirm images"} */}
          Continue
        </button>
        {/* </div> */}
      </div>
      {/* </div> */}
    </div>
  );
};

export default DynamicForm;

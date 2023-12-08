import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Avatar } from "antd";
import { useAuth } from "../../context/auth";

export default function ProfileUpload({
  photo,
  setPhoto,
  uploading,
  setUploading,
  label,
}) {
  // context
  const [auth, setAuth] = useAuth();
  // console.log("photo", photo);

  const handleUpload = async (e) => {
    try {
      let file = e.target.files[0];

      if (file) {
        // console.log(files);
        setUploading(true);

        new Promise(() => {
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
                // console.log("data photo", data.Location);
                setPhoto(data.Location);
                setUploading(false);
              } catch (err) {
                console.log(err);
                setUploading(false);
              }
            },
            "base64",
          );
        });
      }
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  const handleDelete = async (file) => {
    const answer = window.confirm("Delete image?");
    if (!answer) return;
    setUploading(true);
    try {
      const { data } = await axios.post("/remove-image", photo);
      if (data?.ok) {
        setPhoto(null);
        setUploading(false);
      }
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  return (
    <>
      <label className="btn btn-secondary mb-4">
        {uploading ? "Processing..." : "Upload photos"}
        <input
          onChange={handleUpload}
          type="file"
          accecp="image/*"
          // multiple
          hidden
        />
      </label>
      {photo ? (
        <Avatar
          src={photo}
          shape="square"
          size="46"
          className="mx-2 mb-4"
          onClick={() => handleDelete()}
        />
      ) : (
        ""
      )}
    </>
  );
}

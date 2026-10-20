import React, { useState } from "react";
import { banner_upload_axios } from "../axios/product.axios";

function UploadBanner() {

  const [form, setForm] = useState({
    image: null
  });

  const handleImage = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setForm((prev) => ({
      ...prev,
      image: file
    }));
  };


  async function handleSendImage() {

    if (!form.image) {
      console.log("Please select image");
      return;
    }

    const formData = new FormData();

    formData.append("image", form.image);

    try {

      const response = await banner_upload_axios(formData);

      console.log(response.data);

    } catch (error) {

      console.log(error);

    }
  }


  return (
    <div>

      <input
        type="file"
        accept="image/*"
        onChange={handleImage}
      />

      <button onClick={handleSendImage}>
        Upload Image
      </button>

    </div>
  );
}

export default UploadBanner;
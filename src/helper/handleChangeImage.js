export const handleChangeImage = (e, setUploadImage) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setUploadImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

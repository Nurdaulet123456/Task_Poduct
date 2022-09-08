import React from "react";

export const UploadImage = (props) => {
  return (
    <>
      <div className="add__input__product">
        <h4 style={{ marginBottom: "2rem" }}>Медиа</h4>

        <div className="add__file file__upload-image">
          <div className="file__upload">
            <div className="file">
              <input
                type="file"
                name="fileiInput"
                id="file-input"
                class="file-input__input"
                accept="image/*"
                multiple
                onChange={(e) =>
                  props.handleChangeImage(
                    e,
                    props.setUploadImageBig,
                  )
                }
              />
              <label class="file-input__label" for="file-input">
                <span>Upload file</span>
              </label>
            </div>

            <img
              class="file-input__img"
              src={props.uploadImageBig}
              alt=""
              width={"100px"}
              height={"100px"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

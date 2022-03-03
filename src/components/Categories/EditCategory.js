import React, { useState, useEffect } from "react";
import axios from "axios";
import FormData from "form-data";

function EditCategory(id) {
  const [categoryList, setCategoryList] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_CATEGORY_API_URL}/category/getall`)
      .then((response) => {
        setCategoryList(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const editCategory = (e, id) => {
    e.preventDefault();
    this.id = id;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);
    // formData.append("id", id);

    // var name = formData.get("name");
    // var image = formData.get("image");
    axios
      .put(
        `${process.env.REACT_APP_CATEGORY_API_URL}/category/edit/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((response) => {
        // debugger;
        console.dir(response);

        setCategoryList(
          categoryList.map((val) => {
            return val.id === id
              ? {
                  id: val.id,
                  name: name,
                  description: description,
                  image: image,
                }
              : val;
          })
        );
      })
      .catch((err) => {
        debugger;
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={(e) => editCategory(e, id)}>
        <div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Category Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Category 1"
              defaultValue={name}
              placeholder={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Example textarea
            </label>
            <textarea
              className="form-control"
              id="description"
              rows={3}
              defaultValue={description}
              placeholder={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <input
              type="file"
              className="form-control"
              id="name"
              placeholder="Upload Image"
              defaultValue={image}
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
        </div>
        <div className="row">
          <input type="submit" defaultValue="Submit" />
        </div>
      </form>
    </div>
  );
}

export default EditCategory;

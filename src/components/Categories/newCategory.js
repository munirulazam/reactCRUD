import React, { Component } from "react";
import axios from "axios";
import FormData from "form-data";
export default class NewCategory extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      image: null,
    };
  }
  setName(name) {
    this.setState({
      name: name,
    });
  }
  setDescription(description) {
    this.setState({
      description: description,
    });
  }
  setImage(image) {
    this.setState({ image: image });
    console.dir(this.state.image);
  }

  CreateCategory(e) {
    e.preventDefault();
    //

    const formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("description", this.state.description);
    formData.append("image", this.state.image);

    var name = formData.get("name");
    var image = formData.get("image");
    axios
      .post(
        `${process.env.REACT_APP_CATEGORY_API_URL}` + "/category/create",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((response) => {
        debugger;
        console.dir(response);
      })
      .catch((err) => {
        debugger;
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        <form onSubmit={(e) => this.CreateCategory(e)}>
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
                defaultValue={this.state.name}
                onChange={(e) => this.setName(e.target.value)}
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
                defaultValue={this.state.description}
                onChange={(e) => this.setDescription(e.target.value)}
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
                placeholder="Category 1"
                defaultValue={this.state.image}
                onChange={(e) => this.setImage(e.target.files[0])}
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
}

import React, { Component } from "react";
import axios from "axios";
import FormData from "form-data";

export default class NewPost extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      description2: "",
      image: null,
    };
  }
  setTitle(title) {
    this.setState({
      title: title,
    });
  }
  setDescription(description) {
    this.setState({
      description: description,
    });
  }
  setDescription2(description2) {
    this.setState({
      description2: description2,
    });
  }
  setImage(image) {
    this.setState({ image: image });
    console.dir(this.state.image);
  }
  CreatePost(e) {
    e.preventDefault();
    //

    const formData = new FormData();
    formData.append("title", this.state.title);
    formData.append("description", this.state.description);
    formData.append("description2", this.state.description2);
    formData.append("image", this.state.image);

    var title = formData.get("title");
    var image = formData.get("image");

    console.log(formData.get("image"));
    axios
      .post(`http://localhost:5050/post/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
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
        <form onSubmit={(e) => this.CreatePost(e)}>
          <div>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Post Name
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Post 1"
                defaultValue={this.state.title}
                onChange={(e) => this.setTitle(e.target.value)}
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
                placeholder="Post 1"
                defaultValue={this.state.image}
                onChange={(e) => this.setImage(e.target.files[0])}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description2" className="form-label">
                Example textarea 2
              </label>
              <textarea
                className="form-control"
                id="description2"
                rows={3}
                defaultValue={this.state.description2}
                onChange={(e) => this.setDescription2(e.target.value)}
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

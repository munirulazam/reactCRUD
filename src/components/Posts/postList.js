import React, { Component } from "react";
import axios from "axios";
import "./postList.css";
// import FormData from "form-data";
// import EditCategory from "./EditCategory";
// import Edit from "./Edit";
export default class PostList extends Component {
  constructor() {
    super();
    this.state = {
      postList: [],
    };
  }
  componentDidMount() {
    axios
      .get(`http://localhost:5050/post/getall`)
      .then((response) => {
        this.setState({ postList: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { postList } = this.state;
    return (
      <div>
        <table className="table table-bodered">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {postList.map((post) => {
              return (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td>
                    {post.description} {post.description2}
                  </td>
                  <td>
                    <img
                      src={`${process.env.REACT_APP_POST_CONTENT_URL}${post.imageURL}`}
                      className="image-fluid"
                      style={{ maxWidth: "50px", height: "auto" }}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        console.log("clicked!");
                      }}
                      className="btn btn-sm btn-warning"
                    >
                      Edit
                    </button>
                    <button className="btn btn-sm btn-danger">Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import FormData from "form-data";
import EditCategory from "./EditCategory";
// import Edit from "./Edit";
export default class CategoryList extends Component {
  constructor() {
    super();
    this.state = {
      categoryList: [],
    };
  }
  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_CATEGORY_API_URL}/category/getall`)
      .then((response) => {
        this.setState({ categoryList: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { categoryList } = this.state;
    return (
      <div>
        <table className="table table-bodered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categoryList.map((category) => {
              return (
                <tr key={category.id}>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>
                    <img
                      src={`${process.env.REACT_APP_CATEGORY_CONTENT_URL}${category.imageUrl}`}
                      className="image-fluid"
                      style={{ maxWidth: "50px", height: "auto" }}
                    />
                  </td>
                  <td>
                    <Link to="/edit/:id" className="btn btn-sm btn-warning">
                      Edit
                    </Link>
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

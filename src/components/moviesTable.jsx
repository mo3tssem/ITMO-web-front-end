import React, { Component } from "react";
import Like from "./common/like";
import Tabel from "./common/table";
import { Link } from "react-router-dom";
import auth from "./../services/authService";

class MoviesTable extends Component {
  deleteColomn = {
    key: "delete",
    content: m => (
      <button
        onClick={() => this.props.onDelete(m)}
        className="btn btn-danger btn-sm"
      >
        delete
      </button>
    )
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) {
      this.columns.push(this.deleteColomn);
    }
  }
  columns = [
    {
      path: "title",
      label: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "Like",
      content: m => (
        <Like liked={m.liked} onClick={() => this.props.onLike(m)} />
      )
    }
  ];
  render() {
    const { moviesPaginated, onSort, sortColumn } = this.props;

    return (
      <Tabel
        columns={this.columns}
        data={moviesPaginated}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;

import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import MoviesTable from "./moviesTable";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";
import _ from "lodash";

import auth from "../services/authService";

class Movies extends Component {
  state = {
    pageSize: 4,
    currntPage: 1,
    genres: [],
    movies: [],
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" }
  };

  async componentDidMount() {
    // when an instance of this compment is renderd in the dom

    const { data: genre } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...genre];

    const { data: movies } = await getMovies();

    this.setState({ movies, genres });
  }

  handelLike = movie => {
    //dont chage state dirictly

    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies: movies });
    console.log(movie);
  };
  handelDelete = async movie => {
    const orginalMovies = this.state.movies;

    const movies1 = orginalMovies.filter(m => m._id !== movie._id);
    console.log(movie._id);
    await deleteMovie(movie._id);
    this.setState({ movies: movies1 });
  };

  handelPageChange = page => {
    this.setState({ currntPage: page });
    console.log(page);
  };

  handelSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handelSearch = q => {
    this.setState({ searchQuery: q, selectedGenre: null, currntPage: 1 });
  };
  handelGnredSelect = genre => {
    this.setState({ selectedGenre: genre, currntPage: 1 });
  };

  getPagedData = () => {
    const {
      pageSize,
      sortColumn,
      currntPage,
      selectedGenre,
      searchQuery,
      movies: allMovies
    } = this.state;

    let filterd = allMovies;
    if (searchQuery)
      filterd = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id) {
      filterd = allMovies.filter(m => m.genre._id === selectedGenre._id);
    }

    const sorted = _.orderBy(filterd, [sortColumn.path], [sortColumn.order]);
    const moviesPaginated = paginate(sorted, currntPage, pageSize);

    return { totalCount: filterd.length, data: moviesPaginated };
  };
  render() {
    const { user } = this.props;

    const { pageSize, sortColumn, searchQuery, currntPage } = this.state;

    const count = this.state.movies.length;

    if (count === 0) return <p>No movies in the database</p>;

    const { totalCount, data } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handelGnredSelect}
          />
        </div>
        <div className="col">
          {user && (
            <Link
              to="/movies/new"
              className="btn btn-primary"
              style={{ marginBottom: 20, marginTop: 20 }}
            >
              New
            </Link>
          )}

          <p>Showing {totalCount} Movies</p>

          <SearchBox value={searchQuery} onChange={this.handelSearch} />
          <MoviesTable
            sortColumn={sortColumn}
            moviesPaginated={data}
            onLike={this.handelLike}
            onDelete={this.handelDelete}
            onSort={this.handelSort}
          />
          <Pagination
            currntPage={currntPage}
            onPageChange={this.handelPageChange}
            itemsCount={totalCount}
            pageSize={pageSize}
          />
        </div>
      </div>
    );
  }
}

export default Movies;

import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  // slice the array starting form the indext
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value(); // return the losage method
}


export const sortProducts = (products, sortBy) => {
  let sortedProducts;
  if (sortBy === "nameAsc") {
    sortedProducts = products.sort((a, b) =>
      a.name.toLowerCase() > b.name.toLowerCase() ? 1 : b.name.toLowerCase() > a.name.toLowerCase() ? -1 : 0
    );
  } else if (sortBy === "nameDesc") {
    sortedProducts = products.sort((a, b) =>
      a.name.toLowerCase() > b.name.toLowerCase() ? -1 : b.name.toLowerCase() > a.name.toLowerCase() ? 1 : 0
    );
  } else if (sortBy === "priceAsc") {
    sortedProducts = products.sort((a, b) =>
      a.price > b.price ? 1 : b.price > a.price ? -1 : 0
    );
  } else if (sortBy === "priceDesc") {
    sortedProducts = products.sort((a, b) =>
      a.price > b.price ? -1 : b.price > a.price ? 1 : 0
    );
  }
  return sortedProducts;
};

export const base64String = (bufferValue) => btoa(new Uint8Array(bufferValue).reduce(function (data, byte) {
  return data + String.fromCharCode(byte);
}, ''))
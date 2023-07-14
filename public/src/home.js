function getTotalBooksCount(books) {
  let bookCount = books.map((book) => book.id)
  return bookCount.length
}

function getTotalAccountsCount(accounts) {
 let accCount = accounts.length > 0 ? accounts.map((account) => account.id) : [];
  return accCount.length
}

function getBooksBorrowedCount(books) {
  let borrowedstat = books.filter((book) => book.borrows[0].returned === false)
  return borrowedstat.length
}

function getMostCommonGenres(books) {
  let genreCount = {};
  //empty list to write ur tally counter

  for (let i = 0; i < books.length; i++) {
  //iterates through the books
    const genre = books[i].genre;
    //sets genre variable to the iterated book genre
    if (genre in genreCount) {
    //creates a condition for the genreCount that looks at the genre (books[i].genre)
      genreCount[genre]++;
      //if true, the genre exists, the genre tallies up by 1
    } else {
      genreCount[genre] = 1;
      //if false the genre object value gets added to the list and sets the tally to 1
    }
  }
 //console.log(genreCount)
  const sortedGenres = Object.keys(genreCount).sort((a, b) => {
    return genreCount[b] - genreCount[a];
  });
  //sorts through the genreCount KEY by genreCount VALUE
  const topGenres = sortedGenres.slice(0, 5).map((genre) => {
    return { name: genre, count: genreCount[genre] };
  });
  //limits result to 5 with .slice method and returning new formatted object

  return topGenres;
}


function getMostPopularBooks(books) {
  let borrowCount = [];
  for (let i = 0; i < books.length; i++) {
    const borrowed = books[i].borrows.length;
    const name = books[i].title; // Change "title" to "name"
    borrowCount.push({ name, count: borrowed });
  }
  let sortedBooks = borrowCount.sort((bookA, bookB) =>
    bookA.count < bookB.count ? 1 : -1
  );
  let topFiveBooks = sortedBooks.slice(0, 5)
  return topFiveBooks
}

function getMostPopularAuthors(books, authors) {
  let authorCount = {};

  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    const author = authors.find((author) => author.id === book.authorId);
    if (author) {
      if (authorCount[author.name.first + ' ' + author.name.last]) {
        authorCount[author.name.first + ' ' + author.name.last] += book.borrows.length;
      } else {
        authorCount[author.name.first + ' ' + author.name.last] = book.borrows.length;
      }
    }
  }

  let sortedAuthors = [];

  for (let author in authorCount) {
    sortedAuthors.push({ name: author, count: authorCount[author] });
  }

  sortedAuthors.sort((a, b) => b.count - a.count);

  return sortedAuthors.slice(0, 5);
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};

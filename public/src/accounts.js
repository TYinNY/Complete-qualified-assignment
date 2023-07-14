function findAccountById(accounts, id) {
  let foundAcc = accounts.find((acc) => acc.id === id)
  return foundAcc
}

function sortAccountsByLastName(accounts) {
  let sortedAcc = accounts.sort((accountA, accountB) => (accountA.name.last > accountB.name.last ? 1 : -1));
  return sortedAcc;
}


function getTotalNumberOfBorrows(account, books) {
  let booksBorrowedArray = books.map((book) => book.borrows);
  let flattenedArray = booksBorrowedArray.reduce((acc, curr) => acc.concat(curr), []);
  let totalBorrows = flattenedArray.filter((borrow) => borrow.id === account.id).length;
  return totalBorrows;
}

function getBooksPossessedByAccount(account, books, authors) {
  const borrowedBooks = books.filter((book) => {
    const recentBorrow = book.borrows[0];
    return recentBorrow.id === account.id && !recentBorrow.returned;
  });

  const booksWithAuthors = borrowedBooks.map((book) => {
    const author = authors.find((author) => author.id === book.authorId);
    return { ...book, author };
  });

  return booksWithAuthors;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};

function findAuthorById(authors, id) {
  //should return author obj when given a specific ID
  let result = authors.find((author) => author.id === id)
  return result
}

function findBookById(books, id) {
  //should return the book object when given a particular ID
  let result = books.find((book) => book.id === id)
  return result
}

function partitionBooksByBorrowedStatus(books) {
  //should return an array with two arrays: borrowed books and returned books
  let borrowedstat = books.filter((book) => book.borrows[0].returned === false)
  let returnedstat = books.filter((book) => book.borrows[0].returned === true)
  return [borrowedstat, returnedstat]
}

function getBorrowersForBook(book, accounts) {
  const borrowers = book.borrows.reduce((result, borrow) => {
    //created an accumulator that adds up the borrows key into one object
    if (result.length >= 10) return result; 
    console.log(result)
    //^^stops the iteration once it reaches 10
    const account = accounts.find((acc) => acc.id === borrow.id);
    //finds the account id that matches the borrow.id
    result.push({ ...account, returned: borrow.returned });
    //if statement above was true it pushes the object i created in to the result (from the .reduce accumulation method)
    return result;
  }, []);

  return borrowers;
  //returns the result from the borrowers variable
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};

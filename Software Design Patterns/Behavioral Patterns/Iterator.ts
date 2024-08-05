// Iterator interface
interface Iterator<T> {
  next(): T | null;
  hasNext(): boolean;
}

// Aggregate interface
interface Aggregate<T> {
  createIterator(): Iterator<T>;
}

// Concrete Collection: BookCollection
class BookCollection implements Aggregate<Book> {
  private books: Book[] = [];

  public addBook(book: Book): void {
    this.books.push(book);
  }

  public createIterator(): Iterator<Book> {
    return new BookIterator(this);
  }

  public getBooks(): Book[] {
    return this.books;
  }
}

// Concrete Iterator: BookIterator
class BookIterator implements Iterator<Book> {
  private collection: BookCollection;
  private currentIndex: number = 0;

  constructor(collection: BookCollection) {
    this.collection = collection;
  }

  public next(): Book | null {
    if (this.hasNext()) {
      return this.collection.getBooks()[this.currentIndex++];
    }
    return null;
  }

  public hasNext(): boolean {
    return this.currentIndex < this.collection.getBooks().length;
  }
}

// Book class
class Book {
  constructor(public title: string, public author: string) {}
}


// Usage
const library = new BookCollection();
library.addBook(new Book("1984", "George Orwell"));
library.addBook(new Book("To Kill a Mockingbird", "Harper Lee"));
library.addBook(new Book("The Great Gatsby", "F. Scott Fitzgerald"));

const iterator = library.createIterator();

console.log("Books in the library:");
while (iterator.hasNext()) {
  const book = iterator.next();
  if (book) {
    console.log(`${book.title} by ${book.author}`);
  }
}

// Output:
// Books in the library:
// 1984 by George Orwell
// To Kill a Mockingbird by Harper Lee
// The Great Gatsby by F. Scott Fitzgerald

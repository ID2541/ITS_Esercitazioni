class Author {
    constructor(fullname, yearOfBirth) {
        this.fullname = fullname;
        this.yearOfBirth = yearOfBirth;
    }

    isAlive() {
        if(this.yearOfBirth === undefined) {
            console.log("Year of birth is not defined");
            return false;
        }
        if (this.yearOfBirth === null) {
            console.log("Year of birth is null");
            return false;
        }
        if (this.yearOfBirth < 0) {
            console.log("Year of birth is negative");
            return false;
        }
        const currentYear = new Date().getFullYear();
        return currentYear - this.yearOfBirth < 100;
    }

    
}

class Book {
    constructor(title, author, yearOfPublication, pages) {
        this.title = title;
        this.author = author;
        this.yearOfPublication = yearOfPublication;
        this.pages = pages;
        this.read = false;

    }

    setAsRead() {
        if (this.read) {
            console.log("The book is already read");
            return;
        }
        this.read = true;
        console.log("The book is set as read");
    }

    setAsNotRead() {
        if (!this.read) {
            console.log("The book is already not read");
            return;
        }
        this.read = false;
        console.log("The book is set as not read");
    }    
}

const author1 = new Author("Mario Rossi", 1980);
const author2 = new Author("Giovanni Verga", 1840);

const book1 = new Book("Il Gattopardo", author2, 1958, 500);
const book2 = new Book("Il nome della rosa", author1, 1980, 300);


console.log(book1);
console.log(book2);
console.log(author1.isAlive());
console.log(author2.isAlive());
book1.setAsRead();
book2.setAsNotRead();
console.log(author1);
console.log(author2);
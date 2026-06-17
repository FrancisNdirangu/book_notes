--Create a users table for the book notes
CREATE TABLE book_notes (
    id SERIAL PRIMARY KEY,
    title:CHAR(100),
    notes:CHAR(2000),
    date_read:DATE,
    olid:CHAR(100),
    book_cover_link:CHAR(1000)
);

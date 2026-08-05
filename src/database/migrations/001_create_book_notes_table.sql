CREATE TABLE book_notes (
    id serial not null primary key,
    title VARCHAR(100) UNIQUE,
    notes VARCHAR(2000),
    date_read date,
    olid VARCHAR(100),
    book_cover_link VARCHAR(1000),
    rating INTEGER,
    original_title VARCHAR(150),
    publication_year VARCHAR(100),
    AUTHOR VARCHAR(100),
    series_name VARCHAR(200),
    series_position VARCHAR(100)
    );

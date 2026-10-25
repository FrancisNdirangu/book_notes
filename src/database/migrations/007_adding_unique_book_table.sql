CREATE TABLE unique_books (
  book_id SERIAL PRIMARY KEY,
  book_name VARCHAR(500) UNIQUE REFERENCES book_notes(title)
  );

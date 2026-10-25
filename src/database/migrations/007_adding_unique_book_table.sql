CREATE TABLE unique_books (
  book_id INT SERIAL PRIMARY KEY,
  book_name VARCHAR(500) UNIQUE  REFERENCES book_notes(original_title),
  );

CREATE TABLE book_progress (
  id SERIAL PRIMARY KEY,
  book_id INT references book_notes(id),
  book_name TEXT references book_notes(title),
  progress TEXT CHECK (progress IN ('not_started','in_progress','dropped','completed')),
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

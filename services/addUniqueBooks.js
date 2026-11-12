import { transactionHelper } from "../infrastructure/transactions.js";
import { unique_books } from "../models/unique_books_table_models.js";

export async function addUniqueBook(title) {
  return transactionHelper(async (client) => {

    const user = await unique_books.addBook(title,client);

  })
}

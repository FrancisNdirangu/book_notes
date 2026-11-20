import { booksJsonResponse } from "../apihelpers/bookApi.js";
import { bookModel } from "../models/bookModel.js";
import {currentOriginalTitle, currentTitle, updateBookCover} from "../models/helperModel.js";
import { bookSearchResults } from "../apihelpers/bookApi.js";
import { searchBookWithCover } from "../apihelpers/openLibraryClient.js";
import {apiModel} from "../models/apiDataModel.js";
import { OpenLibraryError } from "../errors/OpenLibraryError.js";

export async function checkOLID(id,updatedTitle) {

  try{

    const title = updatedTitle;
    console.log(title);
    const editedTitle = await currentTitle(id);

    if (title.toLowerCase().trim() !== editedTitle.toLowerCase().trim()) {
      // call the helper api to get the new olid and update the db with the new olid
      // const bookJSON = await booksJsonResponse(updatedTitle);
      // const newOLID = await bookJSON['cover_edition_key'];
      // const link_base = "https://covers.openlibrary.org/b/olid/"
      // const endOfLink = "-M.jpg"
      const bookJSON = await searchBookWithCover(updatedTitle) ;
      const newOLID = bookJSON['olid'];
      console.log(newOLID);


      // const new_cover_link = link_base+newOLID+endOfLink;
      const new_cover_link = bookJSON['book_cover_url'];
      console.log(new_cover_link);

      const update = await updateBookCover(id,newOLID,new_cover_link);


    }

  } catch(error) {
    console.error("Error in checkOLID function in bookService.js: ",error);
    //next(error);
  }
};

export async function checkBookResults(title) {

  const numResults = await bookSearchResults(title);

  console.log("your book results are:",numResults);
  if (numResults == 0) {
    console.log('there are no results for that book');
  }

}


export async function refreshMetadata(id) {
    const postId = id;

    //retrieves the title from the db
    const title = await currentTitle(postId);  
    const oldOriginalTitle = await currentOriginalTitle(postId);



  try {    

    if (title == null) {
      return null;
    }
    //console.log(title);

    //uses the title on the search api
    const newMetadata = await searchBookWithCover(title);

    if (newMetadata == null) {
      //throw new Error('The metadata expected was not returned, new title may not exist in the api.');
      // const removingOldMetadata = await apiModel.removeOutdatedMetadata(id);
      return null;
    }

    // if ((newMetadata.title != oldOriginalTitle)) {
    //   // const removingOldMetadata = await apiModel.removeOutdatedMetadata(id);
    //   //if the titles arent equal we should immediately update the metadata
    //   const updateDB = await apiModel.addApiDataFinal(newMetadata,postId);
    // }


      const updateDB = await apiModel.addApiDataFinal(newMetadata,postId);

  } catch(error) {
    //i want to remove the old metadata in the case of a failed connection
    // if(error instanceof OpenLibraryError) {
    //    const removingOldMetadata = await apiModel.removeOutdatedMetadata(id);
    console.error('refreshMetadata service function failed:',error);
    throw error;
  }
}

export async function removeMetadata(id) {
    const postId = id;


    const removingOldMetadata = await apiModel.removeOutdatedMetadata(id);
}


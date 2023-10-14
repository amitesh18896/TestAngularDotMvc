using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using WebApp.Models;

namespace WebApp.Controllers
{
    [RoutePrefix("api/books")] // Attribute routing prefix
    public class BooksController : ApiController
    {
        
         private WebAppContext db = new WebAppContext();

        // GET: api/books
        [HttpGet]
        [Route("")]
        [ResponseType(typeof(IEnumerable<Book>))]
        public async Task<IHttpActionResult> GetBooks()
        {
            try
            {
                // Retrieve all books using Entity Framework asynchronously
                List<Book> books = await db.Books.ToListAsync();

                return Ok(books);
            }
            catch (Exception ex)
            {
                // Handle any unexpected errors and return a 500 Internal Server Error response
                return InternalServerError(ex);
            }
        }

        // GET: api/books/5 
        [HttpGet]
        [Route("{id:int}")]
        [ResponseType(typeof(Book))]
        public async Task<IHttpActionResult> GetBook(int id)
        {
            try
            {
                // Find the book with the given ID using Entity Framework asynchronously
                Book book = await db.Books.FirstOrDefaultAsync(b => b.Id == id);

                if (book == null)
                {
                    return NotFound(); // Return a 404 Not Found response if the book is not found
                }

                return Ok(book); // Return a 200 OK response with the retrieved book
            }
            catch (Exception ex)
            {
                // Handle any unexpected errors and return a 500 Internal Server Error response
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [Route("")]
        [ResponseType(typeof(Book))]
        public async Task<IHttpActionResult> PostBook(Book book)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                // Add the book to the database
                db.Books.Add(book);
                await db.SaveChangesAsync();

                // Create a location URI for the newly created resource
                var locationUri = Url.Link("DefaultApi", new { id = book.Id });

                return Created(locationUri, book);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }


        // PUT: api/books/5
        [HttpPut]
        [Route("{id:int}")]
        [ResponseType(typeof(Book))]
        public async Task<IHttpActionResult> PutBook(int id, Book book)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (id != book.Id)
                {
                    return BadRequest("The ID in the URL does not match the ID in the book data.");
                }

                // Find the book with the given ID using Entity Framework
                Book existingBook = await db.Books.FirstOrDefaultAsync(b => b.Id == id);

                if (existingBook == null)
                {
                    return NotFound();
                }

                // Update the book properties
                existingBook.Title = book.Title;
                existingBook.Description = book.Description;
                existingBook.PublishedOn = book.PublishedOn;
                existingBook.Author = book.Author;

                // Mark the entity as modified
                db.Entry(existingBook).State = EntityState.Modified;

                // Save the changes asynchronously
                await db.SaveChangesAsync();

                return Ok(existingBook);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
      
        //  DELETE: api/books/5
        [HttpDelete]
        [Route("{id:int}")]
        [ResponseType(typeof(Book))]
        public async Task<IHttpActionResult> DeleteBook(int id)
        {
            try
            {
                // Find the book with the given ID using Entity Framework
                Book book = await db.Books.FirstOrDefaultAsync(b => b.Id == id);

                if (book == null)
                {
                    return NotFound(); // Return a 404 Not Found response if the book is not found
                }

                // Remove the book from the database
                db.Books.Remove(book);
                await db.SaveChangesAsync();

                return Ok(book); // Return a 200 OK response with the deleted book
            }
            catch (Exception ex)
            {
                // Handle any unexpected errors and return a 500 Internal Server Error response
                return InternalServerError();
            }
        }


        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
        //private bool bookExists(int id) => db.Books.Count(e => e.Id == id) > 0;
    }
}
   

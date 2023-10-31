using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using BlogWebApp.Data;
using BlogWebApp.Models;
using Microsoft.AspNetCore.Authorization;

namespace BlogWebApp.Controllers
{
    public class BlogController : Controller
    {
        private readonly ApplicationDbContext _context;

        public BlogController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Blog
        public async Task<IActionResult> Index()
        {
              return _context.Blog != null ? 
                          View(await _context.Blog.ToListAsync()) :
                          Problem("Entity set 'ApplicationDbContext.Blog'  is null.");
        }

        // GET: Blog/Search
        public async Task<IActionResult> Search()
        {
            return _context.Blog != null ?
                        View(await _context.Blog.ToListAsync()) :
                        Problem("Entity set 'ApplicationDbContext.Blog'  is null.");
        }

        // POST: Blog/SearchResults
        public async Task<IActionResult> SearchResults(string SearchPhrase)
        {
            return _context.Blog != null ?
                        View("Index", await _context.Blog.Where(b => b.Content.Contains(SearchPhrase)).ToListAsync()) :
                        Problem("Entity set 'ApplicationDbContext.Blog'  is null.");
        }

        // GET: Blog/Details/5
        public async Task<IActionResult> Details(int? id)
        {
           
            if (id == null || _context.Blog == null)
            {
                return NotFound();
            }
            //I don't understand what these two lines do
            Console.WriteLine(id + " is what id is");
            var blog = await _context.Blog
                .FirstOrDefaultAsync(m => m.Id == id);

            Console.WriteLine(id + " is what id is 2");
            if (blog == null)
            {
                Console.WriteLine("Its null again ");
                return NotFound();
            }

            return View(blog);
        }

        // GET: Blog/Create
        [Authorize]
        public IActionResult Create()
        {
            return View();
        }

        // POST: Blog/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize]
        public async Task<IActionResult> Create([Bind("Id,Author,Title,Content,CreatedDate,LastUpdated")] Blog blog)
        {

            blog.Author = User.Identity?.Name;
            DateTime today = DateTime.Today;
            blog.CreatedDate = today.ToShortDateString();
            blog.LastUpdated = today.ToShortDateString();
            if (ModelState.IsValid)
            {
                _context.Add(blog);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(blog);
        }

        // GET: Blog/Edit/5
        [Authorize]
        public async Task<IActionResult> Edit(int? id, string author)
        {
            if (id == null || _context.Blog == null || author != User.Identity?.Name)
            {
                return NotFound();
            }

            var blog = await _context.Blog.FindAsync(id);
            if (blog == null)
            {
                return NotFound();
            }
            return View(blog);
        }

        // POST: Blog/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Author,Title,Content,CreatedDate,LastUpdated")] Blog blog)
        {
            if(User.Identity?.Name != blog.Author)
            {
                return NotFound();
            }
            DateTime today = DateTime.Today;
            blog.LastUpdated = today.ToShortDateString();
            if (id != blog.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(blog);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!BlogExists(blog.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(blog);
        }

        // GET: Blog/Delete/5
        [Authorize]
        public async Task<IActionResult> Delete(int? id, string author)
        {

            if (id == null || _context.Blog == null || author != User.Identity?.Name)
            {
                return NotFound();
            }

            var blog = await _context.Blog
                .FirstOrDefaultAsync(m => m.Id == id);
            if (blog == null)
            {
                return NotFound();
            }

            return View(blog);
        }

        // POST: Blog/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        [Authorize]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Blog == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Blog'  is null.");
            }
            var blog = await _context.Blog.FindAsync(id);
            if (blog != null)
            {
                _context.Blog.Remove(blog);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool BlogExists(int id)
        {
          return (_context.Blog?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

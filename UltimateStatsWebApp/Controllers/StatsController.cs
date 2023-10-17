using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using UltimateStatsWebApp.Data;
using UltimateStatsWebApp.Models;
using Microsoft.AspNetCore.Identity;

namespace UltimateStatsWebApp.Controllers
{
    public class StatsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public StatsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Stats
        public async Task<IActionResult> Index()
        {
            return _context.Stats != null ?
                        View(await _context.Stats.ToListAsync()) :
                        Problem("Entity set 'ApplicationDbContext.Stats'  is null.");
        }

        // GET: Stats/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Stats == null)
            {
                return NotFound();
            }

            var stats = await _context.Stats
                .FirstOrDefaultAsync(m => m.Id == id);
            if (stats == null)
            {
                return NotFound();
            }

            return View(stats);
        }

        // GET: Stats/Create
        [Authorize]
        public IActionResult Create()
        {
            return View();
        }

        // POST: Stats/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [Authorize]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Catches,Throws, GameNumber, Category, TeamScore, OpponentScore, userName\t")] Stats stats)
        {
            if (ModelState.IsValid)
            {
                _context.Add(stats);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(stats);
        }

        // GET: Stats/Edit/5
        [Authorize]
        public async Task<IActionResult> Edit(int? id, string userName)
        {
            if (id == null || _context.Stats == null || userName != User.Identity?.Name)
            {
                return NotFound();
            }

            var stats = await _context.Stats.FindAsync(id);
            if (stats == null)
            {
                return NotFound();
            }
            return View(stats);
        }

        // POST: Stats/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [Authorize]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Catches,Throws, GameNumber, Category, TeamScore, OpponentScore, userName")] Stats stats)
        {
            if (id != stats.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(stats);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!StatsExists(stats.Id))
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
            return View(stats);
        }

        // GET: Stats/Delete/5
        [Authorize]
        public async Task<IActionResult> Delete(int? id, string userName)
        {
            
            if (id == null || _context.Stats == null || userName != User.Identity?.Name)
            {
                return NotFound();
            }

            var stats = await _context.Stats
                .FirstOrDefaultAsync(m => m.Id == id);
            if (stats == null)
            {
                return NotFound();
            }

            return View(stats);
        }

        // POST: Stats/Delete/5
        [Authorize]
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Stats == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Stats'  is null.");
            }
            var stats = await _context.Stats.FindAsync(id);
            if (stats != null)
            {
                _context.Stats.Remove(stats);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool StatsExists(int id)
        {
          return (_context.Stats?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

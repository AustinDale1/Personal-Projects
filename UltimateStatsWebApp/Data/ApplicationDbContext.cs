using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using UltimateStatsWebApp.Models;

namespace UltimateStatsWebApp.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        public DbSet<UltimateStatsWebApp.Models.Stats> Stats { get; set; } = default!;
    }
}
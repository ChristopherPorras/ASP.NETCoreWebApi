using ASP.NETCoreWebApi.Models;
using Microsoft.EntityFrameworkCore;
using ASP.NETCoreWebApi.Models;

namespace ASP.NETCoreWebApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; } // Agrega DbSet para la entidad User

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Configura el modelo si es necesario
        }
    }
}

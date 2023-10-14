using System;
using System.Data.Entity;

namespace WebApp.Models
{
    public class WebAppContext : DbContext
    {
        public WebAppContext() : base("name=WebAppContext") =>
            // Set the database initializer. This uses Migrations for better control.
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<WebAppContext, WebAppMigrationsConfiguration>());

        public DbSet<Book> Books { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            // Configure your database model here if needed.
            base.OnModelCreating(modelBuilder);
        }
    }
}

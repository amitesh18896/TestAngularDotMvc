using System.Data.Entity.Migrations;

namespace WebApp.Models
{

    internal sealed class WebAppMigrationsConfiguration : DbMigrationsConfiguration<WebAppContext>
    {
        public WebAppMigrationsConfiguration()
        {
            AutomaticMigrationsEnabled = true; // You can adjust migration settings as needed.
        }

        protected override void Seed(WebAppContext context)
        {
            // Seed your database with initial data here if needed.
        }
    }
}
namespace BlogWebApp.Models
{
    public class Blog
    {
        public int Id { get; set; }
        public string Author { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public string CreatedDate { get; set; }

        public string LastUpdated { get; set; }

        public Blog()
        {
            
        }
    }
}

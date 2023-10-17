using System.Dynamic;

namespace UltimateStatsWebApp.Models
{
    public class Stats
    {

        public int Id { get; set; }
        public string Catches {  get; set; }
        public string Throws { get; set;}
        public string GameNumber { get; set; }

        public string Category { get; set; }

        public string TeamScore { get; set; }

        public string OpponentScore { get; set; }

        public string userName { get; set; }


        public Stats()
        {
            
        }
    }
}

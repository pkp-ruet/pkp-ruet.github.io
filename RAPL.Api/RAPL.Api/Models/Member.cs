using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RAPL.Api.Models
{
    public class Member
    {
        public string Id { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }

        public string Dept { get; set; }
        public string Roll { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RAPL.Api.Models
{
    public class Repository: IRepository
    {
        public string ConnectionString { get; set; }
        public string RepositoryName { get; set; }
        public string MemberRepo { get; set; }
    }
    public interface IRepository
    {
        public string ConnectionString { get; set; }
        public string RepositoryName { get; set; }
        public string MemberRepo { get; set; }

    }
}

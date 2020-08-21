using MongoDB.Driver;
using RAPL.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RAPL.Api.Services
{
    public class RepositoryContext
    {
        private readonly IMongoCollection<Member> memberRepo;
        public RepositoryContext(IRepository repository)
        {
            var client = new MongoClient(repository.ConnectionString);
            var database = client.GetDatabase(repository.RepositoryName);
            memberRepo = database.GetCollection<Member>(repository.MemberRepo);
        }

        public Member Register(Member member)
        {
            memberRepo.InsertOne(member);
            return member;
        }

        public List<Member> GetMembers()
        {
            return memberRepo.Find(member => true).ToList();
        }

        public Member GetMemberByUserName(string userName)
        {
            var members = memberRepo.Find(member => true).ToList();
            var member = members.FirstOrDefault(m => m.UserName == userName);
            return member;
        }

    }
}

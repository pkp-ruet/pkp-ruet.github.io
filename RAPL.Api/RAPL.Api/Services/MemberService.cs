using RAPL.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RAPL.Api.Services
{
    public class MemberService
    {
        private readonly RepositoryContext Context;
        public MemberService(RepositoryContext context)
        {
            Context = context;
        }

        public Member RegisterMember(Member member)
        {
            member.Id = Guid.NewGuid().ToString();
            var totalMember = GetMembers().Count();
            member.UserId = totalMember + 1;
            Context.Register(member);
            return member;
        }

        public List<Member> GetMembers()
        {
            return Context.GetMembers();
        }

        public Member GetMemberByUserName(string userName)
        {
            return Context.GetMemberByUserName(userName);
        }

    }
}

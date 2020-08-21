using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using RAPL.Api.Models;
using RAPL.Api.Services;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace RAPL.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MemberController : ControllerBase
    {
        private readonly MemberService _memberService;
        private readonly IConfiguration _config;

        public MemberController(MemberService memberService, IConfiguration config)
        {
            _memberService = memberService;
            _config = config;
        }

        [HttpPost("Test")]
        public ActionResult<string> Test()
        {
            return "pkp";
        }

        [HttpGet("Get")]

        public ActionResult<List<Member>> GetMembers()
        {
            return _memberService.GetMembers();
        }

        [HttpGet("GetMember/{userName}")]

        public ActionResult<Member> GetMemberByUserName(string userName)
        {
            return _memberService.GetMemberByUserName(userName);
        }

       
    }
}

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
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController: ControllerBase
    {
        private readonly MemberService _memberService;
        private readonly IConfiguration _config;

        public AuthController(MemberService memberService, IConfiguration config)
        {
            _memberService = memberService;
            _config = config;
        }

        [HttpPost("Register")]
        public ActionResult<Member> RegisterMember(Member member)
        {
            _memberService.RegisterMember(member);
            return member;
        }
        [HttpPost("Login")]

        public ActionResult<Member> LogIn([FromBody] Login login)
        {
            var member = _memberService.GetMemberByUserName(login.UserName);
            if (member == null)
                return BadRequest("Username Doesn't Exist!");
            if (member.Password != login.Password)
                return BadRequest("Incorrect Username/Password!");
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, member.Id),
                new Claim(ClaimTypes.Name, member.UserName)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);
            member.Password = null;
            return Ok(new
            {
                token = tokenHandler.WriteToken(token),
                member
            });
        }
    }
}

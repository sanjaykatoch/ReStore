using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace API.Services
{
    public class TokenService
    {
        private readonly IConfiguration _config;
        private readonly UserManager<User> _userManager;
        public TokenService(UserManager<User> objUserManager,IConfiguration objIConfiguration)
        {
            _config = objIConfiguration;
            _userManager = objUserManager;
        } 
        public async Task<string> GenerateToken(User objUser)
        {
            var objClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Email,objUser.Email),
                new Claim(ClaimTypes.Name,objUser.UserName),

            };
            var objRoles = await _userManager.GetRolesAsync(objUser);
            foreach (var objRole in objRoles )
            {
                objClaims.Add(new (ClaimTypes.Role, objRole ));
            }
            var objKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_config["JWTSettings:TokenKey"]));

            var objCreds = new SigningCredentials(objKey, SecurityAlgorithms.HmacSha512);

            var objTokenOptions = new JwtSecurityToken(
                issuer: null,
                audience: null,
                claims: objClaims,
                expires: DateTime.Now.AddMinutes(10),
                signingCredentials:objCreds
                );
            return new JwtSecurityTokenHandler().WriteToken(objTokenOptions);
        }
    }
}

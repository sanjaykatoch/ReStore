using API.DTO;
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;

        public AccountController(UserManager<User> objUserManager,TokenService objTokenService)
        {
            _userManager = objUserManager;
            _tokenService = objTokenService;
        }
        [HttpPost("login")]
        //public async Task<ActionResult<User>> Login([FromBody]JObject jObject)
        public async Task<ActionResult<UserDto>> Login(LoginDto objLoginDto)
        {
            var objUser=await _userManager.FindByNameAsync(objLoginDto.UserName);
            if (objUser==null || !await _userManager.CheckPasswordAsync(objUser,objLoginDto.Password))
            {
                return Unauthorized();
            }
            return new UserDto
            {
                Email = objUser.Email,
                Token = await _tokenService.GenerateToken(objUser)

            };
            //return objUser;    
        }
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(RegisterDto objRegisterDto)
        {
            var objNewUser = new User
            {
                Email = objRegisterDto.Email,
                UserName = objRegisterDto.UserName,

            };

            var objResult = await _userManager.CreateAsync(objNewUser, objRegisterDto.Password);
            if (!objResult.Succeeded)
            {
                foreach (var obj in objResult.Errors)
                {
                    ModelState.AddModelError(obj.Code, obj.Description);
                }
                return ValidationProblem();
            }
            await _userManager.AddToRoleAsync(objNewUser, "Member");

            return StatusCode(201);


        }
        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var objUser = await _userManager.FindByNameAsync(User.Identity.Name);
            return new UserDto
            {
                Email = objUser.Email,
                Token = await _tokenService.GenerateToken(objUser)
            };
            
        }

    }
}

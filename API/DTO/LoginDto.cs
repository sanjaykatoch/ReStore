﻿using Microsoft.AspNetCore.Mvc;

namespace API.DTO
{
    public class LoginDto 
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
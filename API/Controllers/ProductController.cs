using API.Data;
using API.Enitites;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly StoreContext _StoreContext;
        public ProductController(StoreContext context)
        {
            this._StoreContext = context;
        }
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var lsProduct = await _StoreContext.Products.ToListAsync();

            return Ok(lsProduct);
        }
        [HttpGet("{id}")]

        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            return await _StoreContext.Products.FindAsync(id);
        }

    }
}

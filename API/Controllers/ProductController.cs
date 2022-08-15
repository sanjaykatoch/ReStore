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
    public class ProductController : BaseApiController
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
            var product = await _StoreContext.Products.FindAsync(id);
            if (product == null) return NotFound();
            return product;
        }

    }
}

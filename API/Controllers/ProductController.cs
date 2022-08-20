using API.Data;
using API.Enitites;
using API.Extensions;
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
        public async Task<ActionResult<List<Product>>> GetProducts(string orderBy,string searchTerm, string brands, string type)
        {

            var arrProduct = _StoreContext.Products.
                Sort(orderBy)
                .Search(searchTerm)
                .Filter(brands, type)
                .AsQueryable();

            return await arrProduct.ToListAsync();

            //var arrProduct = _StoreContext.Products.AsQueryable();


            //return await ProductExtensions.Sort(arrProduct, orderBy).
            //    Search(arrProduct,searchTerm).ToListAsync();

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

using API.Data;
using API.Enitites;
using API.Extensions;
using API.RequestHelper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
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
        public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery] ProductParams productParams)
        {

            var arrProduct = _StoreContext.Products.
                Sort(productParams.OrderBy)
                .Search(productParams.SearchTerm)
                .Filter(productParams.Brands, productParams.Types)
                .AsQueryable();

            //var   
            //return await arrProduct.ToListAsync();
            var arrProducts = await PagedList<Product>.ToPaggedList(arrProduct, productParams.PageNumber, productParams.PageSize);

            HttpExtensions.AddPaginationHeader(Response, arrProducts.MetaData);
            //Response.Headers.Add("Pagination", JsonSerializer.Serialize(arrProducts.MetaData));
            return arrProducts;
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

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var Brands = await _StoreContext.Products.Select(x => x.Brand).Distinct().ToListAsync();
            var Type = await _StoreContext.Products.Select(x => x.Type).Distinct().ToListAsync();
            return Ok(new { Brands, Type });
        }

    }
}

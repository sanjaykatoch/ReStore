using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Enitites;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BasketController : BaseApiController
    {
        public StoreContext _conext { get; }
        public BasketController(StoreContext conext)
        {
            _conext = conext;
        }

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            Basket objBasket = await RetrieveBAsket();
            if (objBasket == null) return NotFound();
            BasketDto objBasketDto = GetMapBasket(objBasket);
            return objBasketDto;

        }



        [HttpPost]
        public async Task<ActionResult> AddItemToBasket(int productId, int quantity)
        {
            //get BAsket
            //create basket
            //get product
            //add item
            //Save changes
            Basket objBasket = await RetrieveBAsket();

            if (objBasket == null) objBasket = CreateBasket();

            var product = await _conext.Products.FindAsync(productId);

            if (product == null) return NotFound();

            objBasket.AddItem(product, quantity);

            var result = await _conext.SaveChangesAsync() > 0;
            if (result) return CreatedAtRoute("GetBAsket", GetMapBasket(objBasket));

            return BadRequest(new ProblemDetails { Title = "Problem saving Items to baskets" });
        }



        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            Basket objBasket = await RetrieveBAsket();
            if (objBasket == null) return NotFound("Basket is Empty");

            objBasket.RemoveItem(productId, quantity);
            var result = await _conext.SaveChangesAsync() > 0;
            if (result) return StatusCode(201);

            return BadRequest(new ProblemDetails { Title = "Problem while removing Item" });
            //remove Item
            //save changs

        }
        private async Task<Basket> RetrieveBAsket()
        {
            return await _conext.Baskets
                        .Include(i => i.Items)
                        .ThenInclude(p => p.Product)
                        .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }
        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cockieOptions = new CookieOptions
            {
                IsEssential = true,
                Expires = DateTime.Now.AddDays(30),
                SameSite = SameSiteMode.None,
                Secure = true
            };
            Response.Cookies.Append("buyerId", buyerId, cockieOptions);
            var objBasket = new Basket { BuyerId = buyerId };
            _conext.Baskets.Add(objBasket);
            return objBasket;

        }
        private BasketDto GetMapBasket(Basket objBasket)
        {
            return new BasketDto
            {
                Id = objBasket.Id,
                BuyerId = objBasket.BuyerId,
                Items = objBasket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity
                }).ToList()
            };
        }
    }
}
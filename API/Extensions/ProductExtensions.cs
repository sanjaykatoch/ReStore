using API.Enitites;
using System.Collections.Generic;
using System.Linq;

namespace API.Extensions
{
    public static class ProductExtensions
    {
        public static IQueryable<Product> Sort(this IQueryable<Product> arrProduct, string orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy)) return arrProduct.OrderBy(x => x.Name);

            arrProduct = orderBy switch
            {
                "price" => arrProduct.OrderBy(x => x.Price),
                "priceDesc" => arrProduct.OrderByDescending(x => x.Price),
                _ => arrProduct.OrderBy(x => x.Name)
            };
            return arrProduct;
        }
        public static IQueryable<Product> Search(this IQueryable<Product> arrProduct, string searchTerm)
        {
            if (string.IsNullOrWhiteSpace(searchTerm)) return arrProduct;

            string strLowerSearchTerm = searchTerm.Trim().ToLower();
            return arrProduct.Where(x => x.Name.Contains(searchTerm));

        }

        public static IQueryable<Product> Filter(this IQueryable<Product> arrProduct, string brands,string type)
        {
            var brandList = new List<string>();
            var typeList = new List<string>();

            if (!string.IsNullOrWhiteSpace(brands))
            {
                brandList.AddRange(brands.ToLower().Split(',').ToList());
            }
            if (!string.IsNullOrWhiteSpace(type))
            {
                typeList.AddRange(type.ToLower().Split(',').ToList());
            }

            arrProduct = arrProduct.Where(x => brandList.Count == 0 || brandList.Contains(x.Brand.ToLower()));
            arrProduct = arrProduct.Where(x => typeList.Count == 0 || typeList.Contains(x.Type.ToLower()));

            return arrProduct;
        }
    }
}

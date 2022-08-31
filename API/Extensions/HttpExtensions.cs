using API.RequestHelper;
using Microsoft.AspNetCore.Http;
using System.Text.Json;

namespace API.Extensions
{
    public  static class HttpExtensions
    {
        public static void AddPaginationHeader(this HttpResponse objResponse,MetaData objMetaData)
        {
            var objOptions = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

            objResponse.Headers.Add("Pagination", JsonSerializer.Serialize(objMetaData,objOptions));
            objResponse.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }
    }
}

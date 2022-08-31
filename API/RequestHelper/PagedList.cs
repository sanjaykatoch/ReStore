using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.RequestHelper
{
    public class PagedList<T> : List<T>
    {
        public PagedList(List<T> items,int count,int pageNumber,int pageSize)
        {
            MetaData = new MetaData
            {
                PageSize = pageSize,
                TotalCount = count,
                CurrentPage = pageNumber,
                TotalPage = (int)Math.Ceiling(count / (double)pageSize)


            };
            AddRange(items);

        }
        public MetaData MetaData { get; set; }

        public static  async Task<PagedList<T>> ToPaggedList(IQueryable<T> query
            ,int pageNumber,int pageSize)
        {
            var count= await query.CountAsync();
            var items = await query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
            return new PagedList<T>(items, count, pageNumber, pageSize);
        }
    }
}

using System;
using Microsoft.Azure;
using Microsoft.Azure.Storage;
using Microsoft.Extensions.Configuration;

namespace Azure.Storage
{
    class Program
    {

        static string ConnectionString;

        static void Main(string[] args)
        {

            var configuration = new ConfigurationBuilder()
                .AddJsonFile($"appsettings.json", true)
                  .Build();

            ConnectionString = configuration["Storage:ConnectionString"];

            Console.WriteLine("ConnectionString: " + ConnectionString);
        }
    }
}

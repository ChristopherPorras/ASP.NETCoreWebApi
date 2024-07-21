using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;
using MVC.Models;
using System.Text.Json;
using System.Collections.Generic;

namespace MVC.Controllers
{
    public class HomeController : Controller
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<HomeController> _logger;

        public HomeController(HttpClient httpClient, ILogger<HomeController> logger)
        {
            _httpClient = httpClient;
            _logger = logger;
        }

        public async Task<IActionResult> Index()
        {
            try
            {
                var response = await _httpClient.GetStringAsync("https://localhost:7242/api/users");

                // Deserializar la respuesta JSON
                var users = JsonSerializer.Deserialize<List<User>>(response, new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                });

                // Pasar los usuarios a la vista
                ViewBag.Users = users ?? new List<User>();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching users");
                ViewBag.Users = new List<User>();
            }

            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = HttpContext.TraceIdentifier });
        }
    }
}

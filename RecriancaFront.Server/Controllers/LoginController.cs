using Recrianca.Models;
using Recrianca.Services;
using Microsoft.AspNetCore.Mvc;



namespace ClickHouse.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly UsuarioService _usuarioService;

        public LoginController(UsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate(LoginDto loginDto)
        {
            
            var token = await _usuarioService.LoginAsync(loginDto);

            
            if (string.IsNullOrEmpty(token))
                return Unauthorized("Credenciais inválidas.");

            return Ok(new { jwtToken = token });
        }
    }
}

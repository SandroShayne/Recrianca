using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Recrianca.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Recrianca.Services
{
    public class LoginService
    {
        private readonly RecriancaDbContext _context;
        private readonly IConfiguration _configuration;

        public LoginService(RecriancaDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<string> LoginAsync(LoginDto loginDto)
        {
            // Buscar o usuário pelo email no banco de dados SQL Server
            var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == loginDto.Email);

            // Se o usuário não for encontrado ou senha estiver errada, retorna null
            if (usuario == null || !BCrypt.Net.BCrypt.Verify(loginDto.Senha, usuario.Senha))
                return null;

            // Gerar o token JWT
            return GenerateJwtToken(usuario);
        }

        private string GenerateJwtToken(Usuario model)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["JwtSettings:Secret"]);
            var claims = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.NameIdentifier, model.usuario_Id.ToString()),
                new Claim(ClaimTypes.Name, model.Nome ?? ""),
                new Claim(ClaimTypes.Email, model.Email ?? ""),
                new Claim("TelContato", model.TelContato ?? ""),
                new Claim(ClaimTypes.Role, model.Tipo.ToString()) // Para "Tipo de Usuário"
            });

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = claims,
                Expires = DateTime.UtcNow.AddHours(8),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature
                )
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}

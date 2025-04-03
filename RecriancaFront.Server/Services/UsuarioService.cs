using Recrianca.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Recrianca.Services
{
    public class UsuarioService : IUsuarioService
    {
        private readonly RecriancaDbContext _context;
        private readonly IConfiguration _configuration;

        public UsuarioService(RecriancaDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<List<Usuario>> GetAsync()
        {
            return await _context.Usuarios.ToListAsync();
        }

        public async Task<Usuario> GetByIdAsync(int id)
        {
            return await _context.Usuarios.FindAsync(id);
        }

        public async Task<Usuario> GetByEmailAsync(string email)
        {
            return await _context.Usuarios.FirstOrDefaultAsync(x => x.Email == email);
        }

        public async Task Cadastro(Usuario newUsuario)
        {
            newUsuario.Senha = BCrypt.Net.BCrypt.HashPassword(newUsuario.Senha);  // Criptografando a senha
            _context.Usuarios.Add(newUsuario);
            await _context.SaveChangesAsync();
        }

        public async Task Update(int id, Usuario update)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario != null)
            {
                _context.Entry(usuario).CurrentValues.SetValues(update);
                await _context.SaveChangesAsync();
            }
        }

        public async Task Delete(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario != null)
            {
                _context.Usuarios.Remove(usuario);
                await _context.SaveChangesAsync();
            }
        }

        [HttpPost("authenticate")]
        public async Task<string> LoginAsync(LoginDto loginDto)
        {
            var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == loginDto.Email);

            if (usuario == null || !BCrypt.Net.BCrypt.Verify(loginDto.Senha, usuario.Senha))
                return null;

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
                new Claim(ClaimTypes.Role, model.Tipo.ToString())
            });

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = claims,
                Expires = DateTime.UtcNow.AddHours(8),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}

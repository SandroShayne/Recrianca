using Recrianca.Models;

namespace Recrianca.Services
{
    public interface IUsuarioService
    {
        Task<string> LoginAsync(LoginDto loginDto);
    }

}
using System.ComponentModel.DataAnnotations;
namespace Recrianca.Models
{
    public class LoginDto
    {
        public string Email { get; set; }
        public string Senha { get; set; }
    }
}
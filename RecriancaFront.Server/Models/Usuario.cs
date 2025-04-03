using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BCrypt.Net;

namespace Recrianca.Models
{
    public enum TipoUsuario
    {
        Funcionario,
        Responsavel
    }

    public class Usuario
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int usuario_Id { get; set; } // Agora é int e auto incremento

        [Required(ErrorMessage = "Tipo de usuário é obrigatório.")]
        public TipoUsuario Tipo { get; set; }

        [Required(ErrorMessage = "Nome do usuário é obrigatório.")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "Email é obrigatório.")]
        [EmailAddress(ErrorMessage = "Formato de email inválido.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Senha é obrigatória.")]
        [StringLength(100, ErrorMessage = "A senha deve ter entre 6 e 100 caracteres.", MinimumLength = 6)]
        public string Senha { get; set; }

        [NotMapped] // Não será armazenado no banco
        public string ConfirmarSenha { get; set; }

        [Phone(ErrorMessage = "Número de telefone inválido.")]
        public string TelContato { get; set; }

        public void CriptografarSenha()
        {
            this.Senha = BCrypt.Net.BCrypt.HashPassword(this.Senha);
        }

        public bool VerificarSenha(string senha)
        {
            return BCrypt.Net.BCrypt.Verify(senha, this.Senha);
        }
    }
}

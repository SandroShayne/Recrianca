using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Recrianca.Models
{
    public class Evento
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdEvento { get; set; }

        [Required]
        public int IdFuncionario { get; set; } // Chave estrangeira para Funcionario

        [Required]
        [StringLength(255)]
        public string Titulo { get; set; }

        [Required]
        public string Descricao { get; set; }

        public DateTime DataEnvio { get; set; } = DateTime.UtcNow;
    }
}
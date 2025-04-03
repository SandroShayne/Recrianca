using System;
using System.ComponentModel.DataAnnotations;

namespace Recrianca.Models
{
    public class AlunoDto
    {
        public int AlunoId { get; set; }

        [Required(ErrorMessage = "Nome completo é obrigatório.")]
        [StringLength(100, ErrorMessage = "O nome completo não pode exceder 100 caracteres.")]
        public string NomeCompleto { get; set; }

        [Required(ErrorMessage = "Data de nascimento é obrigatória.")]
        public DateTime DataNascimento { get; set; }

        [Required(ErrorMessage = "Turma é obrigatória.")]
        [StringLength(50, ErrorMessage = "A turma não pode exceder 50 caracteres.")]
        public string Turma { get; set; }

        [Required(ErrorMessage = "ID do responsável é obrigatório.")]
        public int ResponsavelId { get; set; }

        [StringLength(500, ErrorMessage = "As observações não podem exceder 500 caracteres.")]
        public string? Observacoes { get; set; }

        [Required(ErrorMessage = "Logradouro é obrigatório.")]
        [StringLength(100, ErrorMessage = "O logradouro não pode exceder 100 caracteres.")]
        public string Logradouro { get; set; }

        [Required(ErrorMessage = "Bairro é obrigatório.")]
        [StringLength(50, ErrorMessage = "O bairro não pode exceder 50 caracteres.")]
        public string Bairro { get; set; }

        [Required(ErrorMessage = "Cidade é obrigatória.")]
        [StringLength(50, ErrorMessage = "A cidade não pode exceder 50 caracteres.")]
        public string Cidade { get; set; }

        [Required(ErrorMessage = "Estado é obrigatório.")]
        [StringLength(2, MinimumLength = 2, ErrorMessage = "O estado deve ter exatamente 2 caracteres.")]
        public string Estado { get; set; }
    }
}
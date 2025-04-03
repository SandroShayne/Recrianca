using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Recrianca.Models
{
    public class Aluno
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AlunoId { get; set; }

        [Required(ErrorMessage = "Nome completo é obrigatório.")]
        [StringLength(100)]
        public string NomeCompleto { get; set; }

        [Required(ErrorMessage = "Data de nascimento é obrigatória.")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime DataNascimento { get; set; }

        [Required(ErrorMessage = "Turma é obrigatória.")]
        [StringLength(50)]
        public string Turma { get; set; }

        // Relacionamento com Responsável 
        [ForeignKey("ResponsavelId")]
        [JsonIgnore] // Impede a serialização do objeto completo
        public Usuario Responsavel { get; set; }

        public int ResponsavelId { get; set; }

        [StringLength(500, ErrorMessage = "O campo Observações pode ter no máximo 500 caracteres.")]
        public string? Observacoes { get; set; }

        // Endereço
        [Required(ErrorMessage = "Logradouro é obrigatório.")]
        [StringLength(100)]
        public string Logradouro { get; set; }

        [Required(ErrorMessage = "Bairro é obrigatório.")]
        [StringLength(50)]
        public string Bairro { get; set; }

        [Required(ErrorMessage = "Cidade é obrigatória.")]
        [StringLength(50)]
        public string Cidade { get; set; }

        [Required(ErrorMessage = "Estado é obrigatório.")]
        [StringLength(2, MinimumLength = 2)]
        public string Estado { get; set; }

        public DateTime DataCadastro { get; set; } = DateTime.Now;
    }
}

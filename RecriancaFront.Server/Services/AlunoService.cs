using Microsoft.EntityFrameworkCore;
using Recrianca.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Recrianca.Services
{
    public class AlunoService
    {
        private readonly RecriancaDbContext _context;

        public AlunoService(RecriancaDbContext context)
        {
            _context = context;
        }

        private async Task ValidarResponsavel(int responsavelId)
        {
            var responsavel = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.usuario_Id == responsavelId);

            if (responsavel == null)
                throw new KeyNotFoundException("Responsável não encontrado");

            if (responsavel.Tipo != TipoUsuario.Responsavel)
                throw new InvalidOperationException("Apenas usuários do tipo Responsavel podem ser vinculados a alunos");
        }

        public async Task<IEnumerable<Aluno>> ObterTodosAsync()
        {
            return await _context.Alunos.AsNoTracking().ToListAsync();
        }

        public async Task<Aluno> ObterPorIdAsync(int id)
        {
            return await _context.Alunos
                .AsNoTracking()
                .FirstOrDefaultAsync(a => a.AlunoId == id);
        }

        public async Task<Aluno> CriarAsync(AlunoDto alunoDto)
        {
            if (alunoDto == null)
                throw new ArgumentNullException(nameof(alunoDto));

            await ValidarResponsavel(alunoDto.ResponsavelId);

            var aluno = new Aluno
            {
                NomeCompleto = alunoDto.NomeCompleto,
                DataNascimento = alunoDto.DataNascimento,
                Turma = alunoDto.Turma,
                ResponsavelId = alunoDto.ResponsavelId,
                Observacoes = alunoDto.Observacoes,
                Logradouro = alunoDto.Logradouro,
                Bairro = alunoDto.Bairro,
                Cidade = alunoDto.Cidade,
                Estado = alunoDto.Estado,
                DataCadastro = DateTime.Now
            };

            _context.Alunos.Add(aluno);
            await _context.SaveChangesAsync();
            return aluno;
        }

        public async Task AtualizarAsync(int id, AlunoDto alunoDto)
        {
            if (alunoDto == null)
                throw new ArgumentNullException(nameof(alunoDto));

            await ValidarResponsavel(alunoDto.ResponsavelId);

            var alunoExistente = await _context.Alunos.FindAsync(id);
            if (alunoExistente == null)
                throw new KeyNotFoundException("Aluno não encontrado");

            alunoExistente.NomeCompleto = alunoDto.NomeCompleto;
            alunoExistente.DataNascimento = alunoDto.DataNascimento;
            alunoExistente.Turma = alunoDto.Turma;
            alunoExistente.ResponsavelId = alunoDto.ResponsavelId;
            alunoExistente.Observacoes = alunoDto.Observacoes;
            alunoExistente.Logradouro = alunoDto.Logradouro;
            alunoExistente.Bairro = alunoDto.Bairro;
            alunoExistente.Cidade = alunoDto.Cidade;
            alunoExistente.Estado = alunoDto.Estado;

            await _context.SaveChangesAsync();
        }

        public async Task RemoverAsync(int id)
        {
            var aluno = await _context.Alunos.FindAsync(id);
            if (aluno == null)
                throw new KeyNotFoundException("Aluno não encontrado");

            _context.Alunos.Remove(aluno);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Aluno>> ObterPorResponsavelIdAsync(int responsavelId)
        {
            await ValidarResponsavel(responsavelId);
            return await _context.Alunos
                .Where(a => a.ResponsavelId == responsavelId)
                .AsNoTracking()
                .ToListAsync();
        }
    }
}
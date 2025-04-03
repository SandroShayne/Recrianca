using Microsoft.AspNetCore.Mvc;
using Recrianca.Models;
using Recrianca.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Recrianca.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlunosController : ControllerBase
    {
        private readonly AlunoService _alunoService;

        public AlunosController(AlunoService alunoService)
        {
            _alunoService = alunoService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Aluno>>> ObterTodos()
        {
            try
            {
                var alunos = await _alunoService.ObterTodosAsync();
                return Ok(alunos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { mensagem = "Ocorreu um erro ao buscar os alunos", detalhes = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Aluno>> ObterPorId(int id)
        {
            try
            {
                var aluno = await _alunoService.ObterPorIdAsync(id);
                return aluno == null ? NotFound(new { mensagem = "Aluno não encontrado" }) : Ok(aluno);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { mensagem = "Ocorreu um erro ao buscar o aluno", detalhes = ex.Message });
            }
        }

        [HttpPost]
        public async Task<ActionResult<Aluno>> Criar([FromBody] AlunoDto alunoDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var alunoCriado = await _alunoService.CriarAsync(alunoDto);
                return CreatedAtAction(nameof(ObterPorId), new { id = alunoCriado.AlunoId }, alunoCriado);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { mensagem = ex.Message }); // Mensagem para responsável não encontrado
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { mensagem = ex.Message }); // Mensagem para  tipo de usuário inválido
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { mensagem = "Ocorreu um erro ao criar o aluno", detalhes = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Atualizar(int id, [FromBody] AlunoDto alunoDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (id != alunoDto.AlunoId)
                {
                    return BadRequest(new { mensagem = "ID informado não corresponde ao aluno" });
                }

                await _alunoService.AtualizarAsync(id, alunoDto);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { mensagem = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { mensagem = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { mensagem = "Ocorreu um erro ao atualizar o aluno", detalhes = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Remover(int id)
        {
            try
            {
                await _alunoService.RemoverAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { mensagem = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { mensagem = "Ocorreu um erro ao remover o aluno", detalhes = ex.Message });
            }
        }

        [HttpGet("por-responsavel/{responsavelId}")]
        public async Task<ActionResult<IEnumerable<Aluno>>> ObterPorResponsavel(int responsavelId)
        {
            try
            {
                var alunos = await _alunoService.ObterPorResponsavelIdAsync(responsavelId);
                return Ok(alunos);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { mensagem = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { mensagem = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { mensagem = "Ocorreu um erro ao buscar os alunos", detalhes = ex.Message });
            }
        }
    }
}
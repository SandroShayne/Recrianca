using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Recrianca.Models;
using Recrianca.Services;
using System.Security.Claims;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Recrianca.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly UsuarioService _usuarioService;

        public UsuariosController(UsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Usuario>>> Get()
        {
            var usuarios = await _usuarioService.GetAsync();
            return Ok(usuarios);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> Get(int id)
        {
            var usuario = await _usuarioService.GetByIdAsync(id);

            if (usuario == null)
            {
                return NotFound(new { mensagem = "Usuário não encontrado." });
            }

            return Ok(usuario);
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Dictionary<string, object> updates)
        {
            try
            {
                var existingUsuario = await _usuarioService.GetByIdAsync(id);
                if (existingUsuario == null)
                {
                    return NotFound(new { mensagem = "Usuário não encontrado." });
                }

                if (updates == null || !updates.Any())
                {
                    return BadRequest(new { mensagem = "Nenhuma alteração fornecida." });
                }

                // Atualiza apenas os campos informados
                foreach (var update in updates)
                {
                    var propertyInfo = typeof(Usuario).GetProperty(update.Key);
                    if (propertyInfo != null && update.Value != null)
                    {
                        propertyInfo.SetValue(existingUsuario, update.Value);
                    }
                }

                await _usuarioService.Update(id, existingUsuario);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { mensagem = $"Erro ao atualizar usuário: {ex.Message}" });
            }
        }

        [HttpPost]
        public async Task<ActionResult<Usuario>> Cadastro(Usuario usuario)
        {
            await _usuarioService.Cadastro(usuario);
            return CreatedAtAction(nameof(Get), new { id = usuario.usuario_Id }, usuario);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Usuario usuario)
        {
            if (id != usuario.usuario_Id)
            {
                return BadRequest(new { mensagem = "ID informado não corresponde ao usuário." });
            }

            var existingUsuario = await _usuarioService.GetByIdAsync(id);
            if (existingUsuario == null)
            {
                return NotFound(new { mensagem = "Usuário não encontrado." });
            }

            await _usuarioService.Update(id, usuario);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var usuario = await _usuarioService.GetByIdAsync(id);

            if (usuario == null)
            {
                return NotFound(new { mensagem = "Usuário não encontrado." });
            }

            await _usuarioService.Delete(id);
            return NoContent();
        }

        [HttpGet("autenticado")]
        [Authorize]
        public async Task<IActionResult> Autenticado()
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out int userId))
            {
                return Unauthorized(new { mensagem = "Usuário não autenticado ou token inválido." });
            }

            var usuario = await _usuarioService.GetByIdAsync(userId);
            if (usuario == null)
                return NotFound(new { mensagem = "Usuário não encontrado." });

            return Ok(usuario);
        }

    }
}



using Microsoft.AspNetCore.Mvc;
using Recrianca.Models;
using Recrianca.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Recrianca.Controllers
{
    [ApiController]
    [Route("api/eventos")]
    public class EventoController : ControllerBase
    {
        private readonly EventoService _eventoService;

        public EventoController(EventoService eventoService)
        {
            _eventoService = eventoService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Evento>>> GetAll()
        {
            return Ok(await _eventoService.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Evento>> GetById(int id)
        {
            var evento = await _eventoService.GetById(id);
            if (evento == null) return NotFound();
            return Ok(evento);
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody] Evento evento)
        {
            await _eventoService.Add(evento);
            return CreatedAtAction(nameof(GetById), new { id = evento.IdEvento }, evento);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, [FromBody] Evento evento)
        {
            await _eventoService.Update(id, evento);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _eventoService.Delete(id);
            return NoContent();
        }
    }
}
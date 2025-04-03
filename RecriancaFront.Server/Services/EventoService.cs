using Recrianca.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Recrianca.Services
{
    public class EventoService 
    {
        private readonly RecriancaDbContext _context;

        public EventoService(RecriancaDbContext context)
        {
            _context = context;
        }

        public async Task<List<Evento>> GetAll()
        {
            return await _context.Eventos.ToListAsync();
        }

        public async Task<Evento> GetById(int id)
        {
            return await _context.Eventos.FindAsync(id);
        }

        public async Task Add(Evento evento)
        {
            _context.Eventos.Add(evento);
            await _context.SaveChangesAsync();
        }

        public async Task Update(int id, Evento evento)
        {
            var existingEvento = await _context.Eventos.FindAsync(id);
            if (existingEvento != null)
            {
                _context.Entry(existingEvento).CurrentValues.SetValues(evento);
                await _context.SaveChangesAsync();
            }
        }

        public async Task Delete(int id)
        {
            var evento = await _context.Eventos.FindAsync(id);
            if (evento != null)
            {
                _context.Eventos.Remove(evento);
                await _context.SaveChangesAsync();
            }
        }
    }
}

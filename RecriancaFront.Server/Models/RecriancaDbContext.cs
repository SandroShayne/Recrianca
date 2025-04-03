using Microsoft.EntityFrameworkCore;
using Recrianca.Models;

public class RecriancaDbContext : DbContext
{
    public RecriancaDbContext(DbContextOptions<RecriancaDbContext> options)
        : base(options) { }

   public DbSet<Usuario> Usuarios { get; set; }

    public DbSet<Aluno> Alunos { get; set; }

    public DbSet<Evento> Eventos { get; set; }


    

   
}


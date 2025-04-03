using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

namespace Recrianca.Services
{
    public static class InfraSwagger
    {
        public static IServiceCollection AddInfra(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Api Recrianca", Version = "v1" });

                c.AddSecurityDefinition("bearer", new OpenApiSecurityScheme()
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey,
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "JWT"
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement()
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "bearer"
                            }
                        },
                        new string[] {}
                    }
                });
            });

            return services;
        }
    }
}



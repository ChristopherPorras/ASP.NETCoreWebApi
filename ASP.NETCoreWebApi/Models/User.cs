using System.ComponentModel.DataAnnotations;

namespace ASP.NETCoreWebApi.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; } // Asumiendo que 'Id' es la clave primaria. Si no, deberías agregar una clave primaria en la tabla.

        public string Nombre { get; set; }

        public string CorreoElectronico { get; set; }

        public string Contrasena { get; set; }

        public string Telefono { get; set; }

        [Required]
        public string TipoUsuario { get; set; }

        public bool CorreoVerificado { get; set; }

        public bool TelefonoVerificado { get; set; }

        public int RolID { get; set; }
    }
}

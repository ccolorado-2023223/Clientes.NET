using System.ComponentModel.DataAnnotations;

namespace ClientesAPI.Models
{
    public class Client
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Los nombres son obligatorios")]
        [StringLength(100, ErrorMessage = "Los nombres no deben exceder 100 caracteres")]
        public string Nombres { get; set; } = string.Empty;

        [Required(ErrorMessage = "Los apellidos son obligatorios")]
        [StringLength(100, ErrorMessage = "Los apellidos no deben exceder 100 caracteres")]
        public string Apellidos { get; set; } = string.Empty;

        [Required(ErrorMessage = "El celular es obligatorio")]
        [RegularExpression(@"^\d{8,12}$", ErrorMessage = "El celular debe tener entre 8 y 12 dígitos")]
        public string Celular { get; set; } = string.Empty;

        [Required(ErrorMessage = "La dirección es obligatoria")]
        [StringLength(150, ErrorMessage = "La dirección no debe exceder 150 caracteres")]
        public string Direccion { get; set; } = string.Empty;

        [Required(ErrorMessage = "El correo es obligatorio")]
        [EmailAddress(ErrorMessage = "Formato de correo inválido")]
        [StringLength(100, ErrorMessage = "El correo no debe exceder 100 caracteres")]
        public string Correo { get; set; } = string.Empty;

        [StringLength(25, ErrorMessage = "La descripción no debe exceder 25 caracteres")]
        public string Descripcion { get; set; } = string.Empty;
    }
}
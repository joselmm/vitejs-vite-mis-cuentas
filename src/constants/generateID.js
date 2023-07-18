export default function generarId(longitud) {
  var caracteres =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var idAleatorio = 'I'; // Agregar un carácter literal al inicio
  var caracteresRestantes = longitud - 1; // Restar 1 para dejar espacio para el carácter literal

  for (var i = 0; i < caracteresRestantes; i++) {
    idAleatorio += caracteres.charAt(
      Math.floor(Math.random() * caracteres.length)
    );
  }

  return idAleatorio;
}

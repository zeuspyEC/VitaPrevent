export function validateContactForm({ nombre, email, asunto, mensaje }) {
  const errors = {}

  if (!nombre?.trim()) errors.nombre = 'El nombre es obligatorio.'
  else if (nombre.trim().length < 2) errors.nombre = 'El nombre debe tener al menos 2 caracteres.'

  if (!email?.trim()) errors.email = 'El correo electrónico es obligatorio.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Ingresa un correo electrónico válido.'

  if (!asunto?.trim()) errors.asunto = 'El asunto es obligatorio.'

  if (!mensaje?.trim()) errors.mensaje = 'El mensaje es obligatorio.'
  else if (mensaje.trim().length < 10) errors.mensaje = 'El mensaje debe tener al menos 10 caracteres.'

  return errors
}

export function validateIMC({ peso, talla }) {
  const errors = {}
  const p = parseFloat(peso)
  const t = parseFloat(talla)

  if (!peso) errors.peso = 'El peso es obligatorio.'
  else if (isNaN(p) || p < 10 || p > 500) errors.peso = 'Ingresa un peso válido (10–500 kg).'

  if (!talla) errors.talla = 'La talla es obligatoria.'
  else if (isNaN(t) || t < 50 || t > 250) errors.talla = 'Ingresa una talla válida (50–250 cm).'

  return errors
}

export function calcularIMC(pesoKg, tallaCm) {
  const tallaM = tallaCm / 100
  return pesoKg / (tallaM * tallaM)
}

export function interpretarIMC(imc) {
  if (imc < 18.5) return { categoria: 'Bajo peso', color: 'warning', descripcion: 'Por debajo del rango saludable.' }
  if (imc < 25)   return { categoria: 'Peso normal', color: 'success', descripcion: 'En el rango de peso saludable.' }
  if (imc < 30)   return { categoria: 'Sobrepeso', color: 'warning', descripcion: 'Ligeramente por encima del rango saludable.' }
  return { categoria: 'Obesidad', color: 'danger', descripcion: 'Consulta a un profesional de la salud.' }
}

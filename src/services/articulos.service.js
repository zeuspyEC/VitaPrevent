import {
  collection, query, where, orderBy, limit,
  getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, serverTimestamp,
} from 'firebase/firestore'
import { db } from '@config/firebase'
import { PAGINATION_LIMIT } from '@config/constants'

// Normaliza campos planos imagenUrl/imagenAlt a la forma {imagen:{url,alt}} que espera ArticleCard
function mapArticulo(d) {
  const data = d.data()
  return {
    id: d.id,
    ...data,
    imagen: data.imagen?.url
      ? data.imagen
      : data.imagenUrl
        ? { url: data.imagenUrl, alt: data.imagenAlt || data.titulo || '' }
        : null,
  }
}

export async function getArticulosByModulo(modulo, categoria = null) {
  const constraints = [
    where('modulo', '==', modulo),
    where('publicado', '==', true),
    orderBy('creadoEn', 'desc'),
    limit(PAGINATION_LIMIT),
  ]
  if (categoria) constraints.splice(2, 0, where('categoria', '==', categoria))
  const snap = await getDocs(query(collection(db, 'articulos'), ...constraints))
  const seen = new Set()
  return snap.docs
    .filter((d) => { if (seen.has(d.id)) return false; seen.add(d.id); return true })
    .map(mapArticulo)
}

export async function getArticuloBySlug(slug) {
  const snap = await getDocs(
    query(collection(db, 'articulos'), where('slug', '==', slug), where('publicado', '==', true), limit(1))
  )
  if (snap.empty) return null
  return mapArticulo(snap.docs[0])
}

export async function crearArticulo(data) {
  return addDoc(collection(db, 'articulos'), {
    ...data,
    publicado: data.publicado ?? false,
    creadoEn: serverTimestamp(),
    actualizadoEn: serverTimestamp(),
  })
}

export async function actualizarArticulo(id, data) {
  return updateDoc(doc(db, 'articulos', id), {
    ...data,
    actualizadoEn: serverTimestamp(),
  })
}

export async function eliminarArticulo(id) {
  return deleteDoc(doc(db, 'articulos', id))
}

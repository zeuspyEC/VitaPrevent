import {
  collection, query, where, orderBy, limit,
  getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, serverTimestamp,
} from 'firebase/firestore'
import { db } from '@config/firebase'
import { PAGINATION_LIMIT } from '@config/constants'

export async function getArticulosByModulo(modulo, categoria = null) {
  const constraints = [
    where('modulo', '==', modulo),
    where('publicado', '==', true),
    orderBy('creadoEn', 'desc'),
    limit(PAGINATION_LIMIT),
  ]
  if (categoria) constraints.splice(2, 0, where('categoria', '==', categoria))
  const snap = await getDocs(query(collection(db, 'articulos'), ...constraints))
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function getArticuloBySlug(slug) {
  const snap = await getDocs(
    query(collection(db, 'articulos'), where('slug', '==', slug), where('publicado', '==', true), limit(1))
  )
  if (snap.empty) return null
  return { id: snap.docs[0].id, ...snap.docs[0].data() }
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

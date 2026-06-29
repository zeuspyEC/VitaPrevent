import {
  collection, query, where, orderBy, limit, startAfter,
  getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, serverTimestamp,
} from 'firebase/firestore'
import { db } from '@config/firebase'
import { PAGINATION_LIMIT } from '@config/constants'

export async function getNoticias(cursor = null, pageSize = PAGINATION_LIMIT) {
  const constraints = [
    where('publicado', '==', true),
    orderBy('creadoEn', 'desc'),
    limit(pageSize),
  ]
  if (cursor) constraints.push(startAfter(cursor))
  const snap = await getDocs(query(collection(db, 'noticias'), ...constraints))
  return {
    docs: snap.docs.map((d) => ({ id: d.id, ...d.data() })),
    lastDoc: snap.docs[snap.docs.length - 1] ?? null,
    hasMore: snap.docs.length === pageSize,
  }
}

export async function getNoticiaById(id) {
  const snap = await getDoc(doc(db, 'noticias', id))
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() }
}

export async function crearNoticia(data) {
  return addDoc(collection(db, 'noticias'), {
    ...data,
    publicado: data.publicado ?? false,
    creadoEn: serverTimestamp(),
    actualizadoEn: serverTimestamp(),
  })
}

export async function actualizarNoticia(id, data) {
  return updateDoc(doc(db, 'noticias', id), {
    ...data,
    actualizadoEn: serverTimestamp(),
  })
}

export async function eliminarNoticia(id) {
  return deleteDoc(doc(db, 'noticias', id))
}

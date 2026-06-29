import {
  collection, query, where, orderBy, limit, getDocs,
  addDoc, updateDoc, deleteDoc, doc, serverTimestamp,
} from 'firebase/firestore'
import { db } from '@config/firebase'
import { ESTADO, PAGINATION_LIMIT } from '@config/constants'

export async function getRecursos(tipo = null, modulo = null) {
  const ref = collection(db, 'recursos')
  const constraints = [
    where('estado', '==', ESTADO.PUBLICADO),
    orderBy('titulo', 'asc'),
    limit(PAGINATION_LIMIT),
  ]
  if (tipo) constraints.splice(1, 0, where('tipo', '==', tipo))
  if (modulo) constraints.splice(1, 0, where('modulos', 'array-contains', modulo))
  const snap = await getDocs(query(ref, ...constraints))
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function crearRecurso(data) {
  return addDoc(collection(db, 'recursos'), {
    ...data,
    fechaCreacion: serverTimestamp(),
    estado: ESTADO.BORRADOR,
  })
}

export async function eliminarRecurso(id) {
  return deleteDoc(doc(db, 'recursos', id))
}

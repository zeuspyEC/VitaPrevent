import {
  collection, query, where, orderBy, getDocs,
  addDoc, updateDoc, deleteDoc, doc,
} from 'firebase/firestore'
import { db } from '@config/firebase'

export async function getFaqs(categoria = null) {
  const ref = collection(db, 'faqs')
  const constraints = [where('estado', '==', 'activo'), orderBy('orden', 'asc')]
  if (categoria) constraints.splice(1, 0, where('categoria', '==', categoria))
  const snap = await getDocs(query(ref, ...constraints))
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function crearFaq(data) {
  return addDoc(collection(db, 'faqs'), { ...data, estado: 'activo' })
}

export async function actualizarFaq(id, data) {
  return updateDoc(doc(db, 'faqs', id), data)
}

export async function eliminarFaq(id) {
  return deleteDoc(doc(db, 'faqs', id))
}

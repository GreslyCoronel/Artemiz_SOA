import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, collection, addDoc, serverTimestamp } from '@angular/fire/firestore';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosAuthService {
  private firestore = inject(Firestore);

  async guardarUsuarioEnFirestore(usuario: any): Promise<void> {
    try {
      // ✅ Documento principal en la colección 'UsuariosAuth'
      const ref = doc(this.firestore, `UsuariosAuth/${usuario.firebaseUID}`);
      await setDoc(ref, {
        uid: usuario.firebaseUID,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.email,
        proveedor: usuario.proveedor || 'custom',
        imgPerf: usuario.imgPerf || ''
        // ❌ Aquí NO va la fecha, porque ahora la guardaremos en registros
      }, { merge: true });

      // ✅ Subcolección 'registros' con fecha exacta del servidor
      const registrosRef = collection(this.firestore, `UsuariosAuth/${usuario.firebaseUID}/registros`);
      await addDoc(registrosRef, {
        fechaIngreso: serverTimestamp(),
        metodoIngreso: usuario.proveedor || 'custom',
        correo: usuario.email
      });

      console.log('✅ Usuario y registro guardado correctamente en Firestore');
    } catch (error) {
      console.error('❌ Error guardando en Firestore:', error);
    }
  }
}

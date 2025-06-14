import { Injectable } from '@angular/core';
import { Firestore, doc,getDocs,getDoc, setDoc, collection,collectionData, Query,query,orderBy,where, DocumentData, addDoc, serverTimestamp } from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';


export interface Usuario {
  uid: string;
  nombre: string;
  apellido: string;
  correo: string;
  proveedor: string;
  imgPerf: string;
}

@Injectable({
  providedIn: 'root'
})

export class UsuariosAuthService {
  private firestore = inject(Firestore);
  private auth = inject(Auth);

  async guardarUsuarioEnFirestore(usuario: any): Promise<void> {
    try {
      const ref = doc(this.firestore, `UsuariosAuth/${usuario.firebaseUID}`);
      const docSnap = await getDoc(ref);

      let dataToSave: any = {
      uid: usuario.firebaseUID,
      proveedor: usuario.proveedor || 'custom',
      correo: usuario.email
    };

    if (!docSnap.exists()) {
      // Es nuevo, guarda todo
      dataToSave.nombre = usuario.nombre || '';
      dataToSave.apellido = usuario.apellido || '';
      dataToSave.imgPerf = usuario.imgPerf || '';
    } else {
      // Ya existe, no sobrescribas nombre y apellido si ya están
      const existingData = docSnap.data();
      dataToSave.nombre = existingData['nombre'] || usuario.nombre || '';
      dataToSave.apellido = existingData['apellido'] || usuario.apellido || '';
      dataToSave.imgPerf = usuario.imgPerf || existingData['imgPerf'] || '';
    }

    // Guardar o actualizar
    await setDoc(ref, dataToSave, { merge: true });

      // Esto crea una subcolección 'registros' con fecha exacta del servidor
      const registrosRef = collection(this.firestore, `UsuariosAuth/${usuario.firebaseUID}/registros`);
      await addDoc(registrosRef, {
        fechaIngreso: serverTimestamp(),
        metodoIngreso: usuario.proveedor || 'custom',
        correo: usuario.email
      });

      console.log('Usuario y registro guardado correctamente en Firestore');
    } catch (error) {
      console.error('Error guardando en Firestore:', error);
    }
  }

  // Obtener usuarios, con opción de ordenar y filtrar
  getUsuarios(orderField: string = 'nombre', orderDirection: 'asc' | 'desc' = 'asc', 
              filterField?: string, filterValue?: string): Observable<Usuario[]> {

    let q: Query<DocumentData>;

    const usuariosCollection = collection(this.firestore, 'UsuariosAuth');

    if (filterField && filterValue) {
      q = query(usuariosCollection, where(filterField, '==', filterValue), orderBy(orderField, orderDirection));
    } else {
      q = query(usuariosCollection, orderBy(orderField, orderDirection));
    }

    return collectionData(q, { idField: 'uid' }) as Observable<Usuario[]>;
  }

  getTodosLosUsuariosConHistorial(): Observable<any[]> {
    const usuariosRef = collection(this.firestore, 'UsuariosAuth');
    return collectionData(usuariosRef, { idField: 'uid' }).pipe(
      switchMap(async (usuarios: any[]) => {
        const usuariosConHistorial = await Promise.all(usuarios.map(async usuario => {
          const registrosRef = collection(this.firestore, `UsuariosAuth/${usuario.uid}/registros`);
          const registrosSnapshot = await getDocs(registrosRef);
          const registros = registrosSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          return {
            ...usuario,
            registros
          };
        }));
        return usuariosConHistorial;
      }),
      switchMap(data => of(data))
    );
  }

  async registrarUsuarioManual(nombre: string, apellido: string, correo: string, contrasena: string) {
    const credenciales = await createUserWithEmailAndPassword(this.auth, correo, contrasena);
    const usuario = credenciales.user;

    await setDoc(doc(this.firestore, 'usuarios', usuario.uid), {
      uid: usuario.uid,
      nombre: nombre,
      apellido: apellido,
      correo: correo,
      imgPerf: '',
      proveedor: 'password',
    });

    console.log('Usuario registrado y guardado en Firestore:', usuario.uid);
  }
}






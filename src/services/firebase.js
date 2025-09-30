import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuração do Firebase - substitua pelos seus dados do projeto
const firebaseConfig = {
	//insira aqui os dados do seu projeto
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
export const db = getFirestore(app);

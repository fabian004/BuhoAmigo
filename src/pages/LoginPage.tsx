import { useEffect } from 'react';
import React, { useState } from 'react';
import { IonContent, IonInput, IonButton, IonLabel, IonPage, IonText  } from '@ionic/react';
import { useHistory } from 'react-router-dom';


const LoginPage = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const history = useHistory();


  useEffect(() => {
    const checkUser = async () => {
      try {
        let user = null;
        if (user) {
          history.push('/Principal');
        }else{
          console.log('no existe user')
        }
      } catch (error) {
        console.log('Error al buscar usuario')
      }
    }
    checkUser();
  },[]);

  const handleCreateAccount = async () => {
    try {
        console.log(email)
        console.log(password)
        
      console.log('Account created!');
      //history.push('/home');
    } catch (error:any) {
      console.log(error);
      window.alert(error.message);
    }
  }
  const handleSignIn = async () => {
    
    document.getElementById('logeateYa')?.blur();
    
    try {
  
      console.log(email);
      console.log(password);
      console.log(name);
  
      history.push('/Principal');
  
      console.log('Signed in!');
    } catch (error:any) {
      console.log(error);
      window.alert(error.message);
      console.log(password)
    }
  }

  return (
    <IonPage>
      <IonContent>
        <div className="container">
          <h1>Hello</h1>
          <h2>Sign in to your account</h2>
          
          <IonButton expand="block" routerLink="/Principal">Go Principal</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
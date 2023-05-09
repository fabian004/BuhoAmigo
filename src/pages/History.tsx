import React, { useState, useEffect } from 'react';
import PrincipalMenu from '../components/PrincipalMenu';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonRow,
  IonCol,
  IonGrid,
  IonLabel,
  IonButton,
  IonList,
  IonItem,
} from '@ionic/react';

function History() {
  const [histories, setHistories] = useState([]);

  useEffect(() => {
    fetch('https://backtitulation.fly.dev/getHistory')
      .then((response) => response.json())
      .then((data) => setHistories(data.result));
  }, []);

  return (
    <>
      <PrincipalMenu />
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>History</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent scrollX={true}>

          <IonList>
            {histories.map((history:any) => (
              <IonItem key={history._id}>
                <IonLabel>
                  <h2>User ID: {history.userId}</h2>
                  <p>Emotion: {history.emotion}</p>
                  <p>Date: {new Date(history.created_at).toLocaleString()}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
          
        </IonContent>
      </IonPage>
    </>
  );
}

export default History;
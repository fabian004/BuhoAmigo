import { useEffect, useState } from 'react';
import { IonButton, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar,IonAccordionGroup, IonAccordion, IonButtons } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';

import { useHistory } from 'react-router';

import PrincipalMenu from '../components/PrincipalMenu';

import './Principal.css';

import { 
  
} from '@ionic/react';

const Principal: React.FC = () => {

  const history = useHistory();

  function handleLogoutClick() {
    console.log('click')
    history.push('/LoginPage');
  }

  return (
    <>
      <PrincipalMenu/>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Principal</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Principal</IonTitle>
            </IonToolbar>
          </IonHeader>
          <ExploreContainer name="Principal page" />
          <IonButton expand="block"  onClick={handleLogoutClick}>Log out</IonButton>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Principal;

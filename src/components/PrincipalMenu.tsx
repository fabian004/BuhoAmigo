import React, { useState,useEffect } from 'react';
import { IonButton, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar,IonAccordionGroup, IonAccordion, IonButtons } from '@ionic/react';
import { CalendarLinks } from './Links';
import { IonAvatar, IonText, IonImg, IonRouterLink } from '@ionic/react';
const PrincipalMenu: React.FC = () => {
  const [User, setUser]:any = useState(null);
  const [OldEmail, setOldEmail]:any = useState(null);
  const [Name, setName]:any = useState(null);

    return(
        <IonMenu contentId="main-content">
          <IonHeader>
            <IonToolbar color="tertiary">
              <IonTitle>Menu Content</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
          
          <IonRouterLink href={'/profile/EditProfile'}>
            <div style={{ display: 'flex', alignItems: 'center', }}>
              <div style={{ flexGrow: 1, marginRight: '1rem', marginLeft: '1rem' }}>
                <IonTitle size="small">{Name}</IonTitle>
                <IonText color="medium">{OldEmail}</IonText>
              </div>
              <IonAvatar slot="end" style={{ width: '3rem', height: '3rem', marginRight: '1rem' }}>
                <IonImg src="https://www.w3schools.com/howto/img_avatar.png" />
              </IonAvatar>
            </div>
          </IonRouterLink>

          <IonAccordionGroup>
                <IonAccordion value="first">
                  <IonItem slot="header" color="light">
                    <IonLabel>Recursos</IonLabel>
                  </IonItem>
                  <CalendarLinks/>
                </IonAccordion>
          </IonAccordionGroup>
          
        </IonContent>
        </IonMenu>
    )

}

export default PrincipalMenu
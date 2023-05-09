import React, { useRef, useState, useEffect } from 'react';
import PrincipalMenu from '../components/PrincipalMenu';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonList, IonItem, IonButton, IonLabel } from '@ionic/react';
import { calendarOutline } from 'ionicons/icons';

function AudioRecord() {
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const audioElement = useRef<HTMLAudioElement | null>(null);
  const [audios, setAudios] = useState([]);

  useEffect(() => {
    fetch('https://backtitulation.fly.dev/getAudios')
      .then((response) => response.json())
      .then((data) => setAudios(data.result));
  }, []);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);
    setRecording(true);

    mediaRecorder.current.ondataavailable = (event) => {
      audioChunks.current.push(event.data);
    };

    mediaRecorder.current.start();
};

const stopRecording = () => {
  if (mediaRecorder.current) {
    mediaRecorder.current.addEventListener('stop', () => {
      console.log(audioChunks.current)
      const audioBlob = new Blob(audioChunks.current);
      setAudioUrl(URL.createObjectURL(audioBlob));
      //audioChunks.current = [];
      setRecording(false);
    });

    mediaRecorder.current.stop();
  }
};

  const saveRecording = async () => {
    console.log(audioChunks.current)
    const audioBlob = new Blob(audioChunks.current);
    const formData = new FormData();
    formData.append('audio', audioBlob);

    const response = await fetch('https://backtitulation.fly.dev/uploadAudio', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload audio');
    }
    console.log(response)

    setAudioUrl(URL.createObjectURL(audioBlob));
    audioChunks.current = [];
  };

  return (
    <>
      <PrincipalMenu />
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Audio Record</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {recording ? <div>Recording...</div> : null}
          <IonButton onClick={startRecording}>Start Recording</IonButton>
          <IonButton onClick={stopRecording}>Stop Recording</IonButton>
          <IonButton onClick={saveRecording}>Save Recording</IonButton>
          <br/><br/>
          {audioUrl ? <audio ref={audioElement} src={audioUrl} controls /> : null}

          <br/><br/>
          <IonList>
            {audios.map((history:any) => (
              <IonItem key={history._id}>
                <IonLabel>
                  <h2>Filename: {history.filename}</h2>
                  <p>Date: {new Date(history.created_at).toLocaleString()}</p>
                  <audio controls src={"https://backtitulation.fly.dev/uploads/"+history.filename} />
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        </IonContent>
      </IonPage>
    </>
  );
}

export default AudioRecord;
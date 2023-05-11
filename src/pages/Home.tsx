import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonButton, IonInput, IonItem, IonItemSliding, IonItemOption, IonItemOptions,IonIcon, IonLabel } from '@ionic/react';
import { useRef, useState } from 'react';
import { createBrotliDecompress } from 'zlib';
import ExploreContainer from '../components/ExploreContainer';
import { useStorage } from '../components/hooks/useStorage';
import './Home.css';
import {checkmarkDoneOutline, arrowUndoOutline, todayOutline} from 'ionicons/icons'

const Home: React.FC = () => {
  const {toshop, CreateShopList, updatedToshopStatus, removeToshop } = useStorage();
  const [item, setItem] = useState('')
  const ionList = useRef(null as any);
  const createShopList = async () => {
    await  CreateShopList(item);
    setItem('');
  }

  const updateShopList = async (item: string,status: string ) =>{
    await updatedToshopStatus(item,status);
    ionList.current.closeSlidingItems()
  }
  const deleteShoping = async (item:string) => {
    removeToshop(item)
    ionList.current.closeSlidingItems()
  }
  
  return (
    <IonPage>
      <IonHeader>

        <IonToolbar color='dark' >
          <IonTitle className= 'Title'>Shopily...</IonTitle>
          <IonTitle className='h2'>inspired by my rice cooker</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem>
          <IonInput value = {item}
          onIonChange={(e) => setItem(e.detail.value!)} 
          placeholder = 'Place an item to remember' ></IonInput>
          <IonButton slot='end' onClick={() => createShopList() } fill="clear">
            Add
          </IonButton>
        </IonItem>
        <IonList ref={ionList}>
          {toshop.map((toshop,key)=> (
            <IonItemSliding key={key}>
              <IonItem className ={toshop.quantity === 'Shopped' ? 'done':''}>
                <IonLabel>
                {toshop.item}
                <p>{toshop.quantity}</p>
                </IonLabel>
              </IonItem>
              <IonItemOptions side='start'>
                <IonItemOption color='danger' onClick={() => deleteShoping(toshop.item)}>
                Delete
                </IonItemOption>

              </IonItemOptions>
              <IonItemOptions side='end'>
                <IonItemOption color='medium' onClick={() => updateShopList(toshop.item, 'To Be Shopped')}>
                <IonIcon icon={arrowUndoOutline}></IonIcon>
                </IonItemOption>
                <IonItemOption color='medium' onClick={() => updateShopList(toshop.item, 'Shopped')}>
                <IonIcon icon={checkmarkDoneOutline}></IonIcon>
                </IonItemOption>

              </IonItemOptions>
            </IonItemSliding>
            
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;

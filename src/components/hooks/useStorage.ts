import { useEffect,useState } from "react";
import {Storage} from '@ionic/storage';

const SHOPLIST_KEY = 'to-shop'

export interface ToShopItem{
    item:string;
    quantity:string;
    created: number;

    
}

export function useStorage() {
    const [shop, setShop] = useState<Storage>();
    const [toshop, setToshop] = useState<ToShopItem[]>([]);

    useEffect(()=>{
        const initStorage = async() =>{
            const newShop = new Storage({
                name: 'NewShopDB'
            });
            const shop = await newShop.create();
            setShop(shop);

            const StoredShop = await shop.get(SHOPLIST_KEY) || [];
            setToshop(StoredShop);

        }
        initStorage();
    }, []);

    const CreateShopList = async (item: string) => {
        const newShopList ={ 
            item,
            quantity:'',
            created:new Date().getTime()
        }
        const updatedToshop = ([...toshop,newShopList])
        setToshop(updatedToshop)
        console.log(updatedToshop);
        shop?.set(SHOPLIST_KEY,updatedToshop);
    }


    const updatedToshopStatus = async(item: string,status: string) => {
        const toUpdate = [...toshop];
       let shops = toshop.filter(shop => shop.item ===item)[0];
       shops.quantity=status;
       setToshop(toUpdate);
       return shop?.set(SHOPLIST_KEY,toUpdate);

    }
    const removeToshop = async(item: string) => {
       let toUpdate =toshop.filter(shop => shop.item !==item);
       setToshop(toUpdate);
       return shop?.set(SHOPLIST_KEY,toUpdate);

    }


    return {
        toshop,CreateShopList, updatedToshopStatus, removeToshop
    }
}
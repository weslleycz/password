import AsyncStorage from "@react-native-async-storage/async-storage";
import { Credential } from "../model/credential.model";
import uuid from "react-native-uuid";

export class CredentialService {
  async getAll(): Promise<Credential[]> {
    try {
      const keys = await AsyncStorage.getAllKeys();
  
      const items = await Promise.all(
        keys.map(async (key) => {
          const item = await AsyncStorage.getItem(key);
          if (item) {
            try {
              return JSON.parse(item);
            } catch (parseError) {
              console.error(`Error parsing item with key ${key}:`, parseError);
              return null;  // Retorna null caso ocorra erro no parsing
            }
          }
          return null;  // Retorna null caso o item não exista
        })
      );
  
      return items.filter((item): item is Credential => item !== null);  // Filtra valores nulos
    } catch (error) {
      console.error('Error fetching items from AsyncStorage:', error);
      return [];
    }
  }

  async setItem(value: Credential) {
    try {
      const id = uuid.v4();
      const jsonValue = JSON.stringify({ ...value, id, isFavorite: false });
      await AsyncStorage.setItem(id, jsonValue);
    } catch (error) {
      console.log(error);
    }
  }

  async clear() {
    await AsyncStorage.clear();
    return [];
  }

  async deleteItem(key: string) {
    try {
      await AsyncStorage.removeItem(key);
      const items = await this.getAll();
      return items;
    } catch (error) {
      console.log(error);
    }
  }

  async getItem(key: string): Promise<Credential | null> {
    try {
      const item = await AsyncStorage.getItem(key);
      return JSON.parse(item as string);
    } catch (error) {
      return null;
    }
  }
}

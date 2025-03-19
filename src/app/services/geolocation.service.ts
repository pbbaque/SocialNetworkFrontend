import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Platform } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor(private platform: Platform) { }

  async requestLocationPermission(): Promise<boolean> {
    const permission = await Geolocation.checkPermissions();

    if (permission.location !== 'granted') {
      const requestStatus = await Geolocation.requestPermissions();
      return requestStatus.location === 'granted';
    }

    return true;
  }

  async getCurrentLocation(): Promise<{ coords: { latitude: number; longitude: number } } | null> {
    if (this.platform.is('capacitor')) {
      return await this.getCurrentLocationCap();
    } else if ('geolocation' in navigator) {
      return await this.getCurrentLocationNav();
    } else {
      console.log('Geolocalización no soportada en este navegador.');
      return null;
    }
  }

  private async getCurrentLocationCap(): Promise<{ coords: { latitude: number; longitude: number } } | null> {
    const hasPermission = await this.requestLocationPermission();
    if (!hasPermission) {
      console.log('No se otorgaron permisos de ubicación');
      return null;
    }

    try {
      const position = await Geolocation.getCurrentPosition();
      return {
        coords: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      };
    } catch (error) {
      console.log('Error obteniendo la ubicación en móvil:', error);
      return null;
    }
  }

  private async getCurrentLocationNav(): Promise<{ coords: { latitude: number; longitude: number } } | null> {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            coords: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          });
        },
        (error) => {
          console.log('Error obteniendo la ubicación en navegador:', error);
          resolve(null);
        }
      );
    });
  }
}

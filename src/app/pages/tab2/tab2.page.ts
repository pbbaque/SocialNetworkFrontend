import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/interfaces/post.interface';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { PostsService } from 'src/app/services/posts.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  loading: boolean = false;
  tempImages: string[] = [];  // Almacenamos las imágenes temporales que el usuario captura
  post: Post | any = {};  // El objeto post que se creará

  constructor(private postsService: PostsService, private route: Router, private geolocationService: GeolocationService) {}

  async create() {

    await this.postsService.create(this.post);
    this.post = {};  
    this.tempImages = [];

    this.route.navigateByUrl('/main/tabs/tab1');
  }


  getGeo() {
    if (!this.post.position) {
      this.post.coords = null;
      return;
    }
  
    this.loading = true;
  
    this.geolocationService.getCurrentLocation().then((resp) => {
      this.loading = false;
  
      if (resp && resp.coords) {
        const coords = `${resp.coords.latitude},${resp.coords.longitude}`;
        this.post.coords = coords;
        console.log(coords);
      } else {
        console.log('No se pudo obtener la ubicación.');
      }
    }).catch((err) => {
      console.log('Error getting location', err);
      this.loading = false;
    });
  }

  // Tomar foto usando Capacitor (móvil)
  async takePhoto() {
    console.log(this.isWeb());
    if (this.isWeb()) {
      this.takePhotoWeb();
    } else {
      this.takePhotoCapacitor();
    }
  }

  // Tomar foto con la cámara en dispositivos móviles
  async takePhotoCapacitor() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
      });
      if (image.webPath) {
        this.tempImages.push(image.webPath);  // Guardar la imagen temporalmente
        if (this.tempImages.length > 0) {
          await this.uploadImages();
        }    

      }
    } catch (error) {
      console.error('Error al tomar la foto con Capacitor:', error);
    }
  }

  // Tomar foto con la cámara en la web (navegador)
  async takePhotoWeb() {
    try {
      // Acceder a la cámara del navegador
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const videoElement = document.createElement('video');
      videoElement.srcObject = stream;
      videoElement.play();
  
      // Asegurarse de que el video se haya cargado
      videoElement.onloadedmetadata = () => {
        // Crear un contenedor para mostrar el video
        document.body.appendChild(videoElement);
  
        // Establecer el tamaño del video
        videoElement.style.width = '100%'; // Ajusta al tamaño de la pantalla
  
        // Agregar un evento de clic para capturar la imagen
        videoElement.addEventListener('click', async () => {
          // Crear un canvas para capturar la imagen
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
  
          // Establecer el tamaño del canvas igual al del video
          canvas.width = videoElement.videoWidth;
          canvas.height = videoElement.videoHeight;
  
          // Capturar la imagen del video
          ctx?.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
  
          // Convertir la imagen a Base64 y guardarla
          this.tempImages.push(canvas.toDataURL('image/png'));
          if (this.tempImages.length > 0) {
            await this.uploadImages();
          }      
  
          // Detener la cámara
          stream.getTracks().forEach(track => track.stop());
          
          // Eliminar el video de la pantalla
          videoElement.remove();
        });
      };
    } catch (error) {
      console.error('Error al acceder a la cámara en navegador:', error);
    }
  }

  // Verificar si estamos en la web o no
  isWeb() {
    return 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices;
  }

  // Seleccionar una imagen desde la galería
  async selectFromGallery() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos
      });

      if (image.webPath)
        this.tempImages.push(image.webPath); // Guardar la imagen temporalmente
      if (this.tempImages.length > 0) {
        await this.uploadImages();
      }
  
    } catch (error) {
      console.error('Error al seleccionar la foto', error);
    }
  }

  // Subir las imágenes al backend
async uploadImages() {
  if (this.tempImages.length > 0) {
    for (const imageUrl of this.tempImages) {
      const file = await this.convertToFile(imageUrl);  // Convertir la imagen URL en un archivo
      await this.postsService.upload(file);  // Subir la imagen usando el servicio
    }
  }
}

// Convertir la URL de la imagen en un archivo
async convertToFile(imageUrl: string): Promise<File> {
  return new Promise<File>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', imageUrl, true);
    xhr.responseType = 'blob';  // Establecer la respuesta como un Blob (archivo)
    
    xhr.onload = () => {
      const blob = xhr.response;
      const file = new File([blob], 'image.png', { type: blob.type });  // Crear el archivo a partir del Blob
      resolve(file);
    };
    
    xhr.onerror = () => {
      reject('Error al convertir la imagen.');
    };

    xhr.send();
  });
}

}

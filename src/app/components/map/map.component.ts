import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
});

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: false
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() coords: string | any = '';
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  private map: any;

  constructor() { }

  ngOnInit() {}

  ngAfterViewInit() {
    if (!this.coords || !this.mapContainer) {
      console.error('No se pasaron coordenadas válidas al componente de mapa.');
      return;
    }

    const latLng = this.coords.split(',');
    const lat = Number(latLng[0]);
    const lng = Number(latLng[1]);

    // Inicializar mapa en el contenedor del ViewChild
    this.map = L.map(this.mapContainer.nativeElement).setView([lat, lng], 15);

    // Añadir capa base
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // Añadir marcador
    L.marker([lat, lng]).addTo(this.map)
      .bindPopup('Ubicación')
      .openPopup();

    // 🔥 FORZAR EL REDIBUJADO DEL MAPA PARA QUE OCUPE TODO EL CONTENEDOR
    setTimeout(() => {
      this.map.invalidateSize();
    }, 100);
  }

  ngOnDestroy() {
    // Limpiar el mapa cuando el componente sea destruido
    if (this.map) {
      this.map.remove();
    }
  }
}

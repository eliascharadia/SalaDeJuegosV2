import { Component, inject, ViewChild, ElementRef, effect } from '@angular/core';
import { ChatService } from '../../services/chat-service';
import { Auth } from '../../services/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  imports: [FormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat {
  chatService = inject(ChatService);
  private auth = inject(Auth);

  nuevoMensaje = '';
  miNombreUsuario = this.auth.user()?.nombre; // Se vincula al nuevo input
  usuarioId = this.auth.user()?.id;

  usuarioEstaAbajo = true;


  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  scrollEffect = effect((): void => {

    this.chatService.mensajes();

    setTimeout(() => {
      if (this.usuarioEstaAbajo) {

        this.scrollearHastaAbajo();

      }
    });

  });

  async enviar() {
    const nombre = this.miNombreUsuario?.trim();
    const texto = this.nuevoMensaje.trim();
    const usuarioId = this.usuarioId?.trim();

    if (nombre && texto) {
      // 1. Obtenemos o creamos el usuario y mandamos el mensaje
      await this.chatService.enviarMensajeConUsuario(texto, nombre, usuarioId);
      this.nuevoMensaje = '';
    }
  }

  formatearHora(fecha: string) {
    return new Date(fecha).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  }


  scrollearHastaAbajo(): void {
    if (!this.scrollContainer?.nativeElement) return;
    console.log('entre');

    const el = this.scrollContainer.nativeElement;

    el.scrollTop = el.scrollHeight;
  }

  detectarScroll(): void {

    const el = this.scrollContainer.nativeElement;

    const threshold = 100;

    this.usuarioEstaAbajo = el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
  }
}

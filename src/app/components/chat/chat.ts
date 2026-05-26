import { Component, inject } from '@angular/core';
import { ChatService} from '../../services/chat-service';
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
}

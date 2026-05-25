import { Component, signal, inject } from '@angular/core';
import { Carta } from '../../models/carta';
import { Auth } from '../../services/auth';
import { Mayormenorservice } from '../../services/mayormenorservice';

@Component({
  selector: 'app-mayormenor',
  imports: [],
  templateUrl: './mayormenor.html',
  styleUrl: './mayormenor.css',
})
export class Mayormenor {

  private auth = inject(Auth);
  private mayorMenorService = inject(Mayormenorservice);

  cards: Carta[] = [
    { valor: 1, palo: 'A', simbolo: '♠' },
    { valor: 2, palo: '2', simbolo: '♠' },
    { valor: 3, palo: '3', simbolo: '♠' },
    { valor: 4, palo: '4', simbolo: '♠' },
    { valor: 5, palo: '5', simbolo: '♠' },
    { valor: 6, palo: '6', simbolo: '♠' },
    { valor: 7, palo: '7', simbolo: '♠' },
    { valor: 8, palo: '8', simbolo: '♠' },
    { valor: 9, palo: '9', simbolo: '♠' },
    { valor: 10, palo: '10', simbolo: '♠' },
    { valor: 11, palo: 'J', simbolo: '♠' },
    { valor: 12, palo: 'Q', simbolo: '♠' },
    { valor: 13, palo: 'K', simbolo: '♠' }
  ];

  cartaActual = signal<Carta | null>(null);

  siguienteCarta = signal<Carta | null>(null);

  puntaje = signal(0);

  juegoFinalizado = signal(false);


  ngOnInit() {
    this.iniciarPartida();
  }

  iniciarPartida() {

    this.puntaje.set(0);

    this.juegoFinalizado.set(false);

    this.cartaActual.set(
      this.generarCartaRandom()
    );
  }

  generarCartaRandom(): Carta {

    return this.cards[
      Math.floor(Math.random() * this.cards.length)
    ];
  }

  adivinarLaMayor() {

    this.validarAdivinanza('esMasAlta');
  }

  adivinarLaMenor() {

    this.validarAdivinanza('esMasBaja');
  }

  validarAdivinanza(tipo: 'esMasAlta' | 'esMasBaja') {

    const cartaNueva = this.generarCartaRandom();

    this.siguienteCarta.set(cartaNueva);

    const cartaActual = this.cartaActual();

    if (!cartaActual) return;

    const atino = tipo === 'esMasAlta' ? cartaNueva.valor > cartaActual.valor : cartaNueva.valor < cartaActual.valor;
    // dependiendo de la adivinanza evalua una o la otra

    if (atino) {

      this.puntaje.update(p => p + 1);

      this.cartaActual.set(cartaNueva);

    } else {

      this.juegoFinalizado.set(true);

      this.guardarPartida();
    }
  }

  async guardarPartida() {

    const user = this.auth.user();

    if (!user) return;

    await this.mayorMenorService.guardarPartida({
      usuario_id: user.id,
      puntaje: this.puntaje()
    });

  }

}

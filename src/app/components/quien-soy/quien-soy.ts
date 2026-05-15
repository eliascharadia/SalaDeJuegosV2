import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuienSoyService } from '../../services/quien-soy';

@Component({
  selector: 'app-quien-soy',
  imports: [RouterModule],
  templateUrl: './quien-soy.html',
  styleUrl: './quien-soy.css',
})
export class QuienSoy implements OnInit{

  private quienSoyService = inject(QuienSoyService);

  user = this.quienSoyService.userA;

  ngOnInit(): void {
    this.quienSoyService.loadUser();
  }
}

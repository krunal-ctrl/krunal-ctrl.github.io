import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { SpaceBackdrop } from '../../shared/components/space-backdrop/space-backdrop';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, Header, Footer, SpaceBackdrop],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {}

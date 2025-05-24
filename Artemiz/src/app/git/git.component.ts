import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-git',
  imports: [],
  standalone: true,
  templateUrl: './git.component.html',
  styleUrl: './git.component.css'
})

export class GitComponent {
  @Output() githubLogin = new EventEmitter<void>();

  emitirLogin() {
    this.githubLogin.emit();
  }
}

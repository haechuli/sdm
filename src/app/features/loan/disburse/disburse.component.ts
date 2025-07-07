import { Component,inject,Injectable,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisburseService, User } from './disburse.service';

@Component({
  selector: 'app-disburse',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './disburse.component.html',
  styleUrl: './disburse.component.scss'
})
export class DisburseComponent implements OnInit {

  private disburseService = inject(DisburseService);
  users: User[] = [];

  ngOnInit(): void {
    this.disburseService.getUsers().subscribe(data => this.users = data);
  }

}

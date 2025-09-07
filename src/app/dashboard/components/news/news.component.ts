import { Component } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {
  noticia: string = '';
  cambiarNoticiaModal: boolean = false;
  textNoticia: string = '';
  role: number = this.authService.getRole();

  constructor(private news: NewsService, private messageService: MessageService, private authService: AuthService) { 
    this.obtenerNoticia();
  }

  obtenerNoticia() {
      this.news.getNoticia().subscribe((resp: any) => {
        this.noticia = resp.news[0].new;
      })
  }

  enableButton() {
    if (this.textNoticia !== '') {
      return false;
    }
    return true;
  }

  openModal() {
    this.cambiarNoticiaModal = true;
  }

  cambiarNoticia() {
    this.news.updateStatus(this.textNoticia).subscribe((res: any) => {
      this.messageService.clear();
      this.messageService.add({ severity: 'success', summary: 'Ok', detail: 'Estado actualizado' });
      this.obtenerNoticia();
      this.cambiarNoticiaModal = false;
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/services/dialog.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-connection-error',
  templateUrl: './connection-error.component.html',
  styleUrls: ['./connection-error.component.scss']
})
export class ConnectionErrorComponent implements OnInit {

  faTimes = faTimes;

  constructor(private dialogService: DialogService) { }

  ngOnInit() {
  }

  onClose() {
    this.dialogService.stopConnectionError();
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {f;

  message: string;
  title: string;

  constructor(private _dialogService: DialogService) { }

  ngOnInit() {
  }

}

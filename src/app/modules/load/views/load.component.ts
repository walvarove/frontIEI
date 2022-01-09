import { LoadService } from './../services/load.service';
import { Component, OnChanges, OnInit } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { concat, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.scss']
})
export class LoadComponent implements OnInit {

  private params: string = "";

  todasCheck = false;

  catalunyaCheck = false;
  isCatalunyaDisable = false;

  valenciaCheck = false;
  isValenciaDisable = false;

  euskadiCheck = false;
  isEuskadiDisable = false;

  cargando = false;

  libs: Observable<any>;

  get isAnySelected() {
    return (this.valenciaCheck && !this.isValenciaDisable) || (this.catalunyaCheck && !this.isCatalunyaDisable) || (this.euskadiCheck && !this.isEuskadiDisable)
  }
  constructor(private loadService: LoadService) { }

  ngOnInit(): void {
    this.loadService.delete().subscribe();
    this.loadService.loadedStates$.subscribe(({valencia, catalunya, euskadi}) => {
      this.euskadiCheck = euskadi;
      this.valenciaCheck = valencia;
      this.catalunyaCheck = catalunya;
      this.isEuskadiDisable = euskadi;
      this.isValenciaDisable = valencia;
      this.isCatalunyaDisable = catalunya;
      this.todasCheck = this.loadService.allSelected;
    })
  }

  cancelar() {
    this.todasCheck = false;
    if(!this.isEuskadiDisable){
      this.euskadiCheck = false;
    }
    if(!this.isValenciaDisable){
      this.valenciaCheck = false;
    }
    if(!this.isCatalunyaDisable){  
      this.catalunyaCheck = false;
    }
  }

  cargar() {
    this.cargando = true

    if(this.catalunyaCheck) {
      this.catalunyaCheck = false;
      this.isCatalunyaDisable = true;
    }
    if(this.valenciaCheck) {
      this.valenciaCheck = false;
      this.isValenciaDisable = true;
    }
    if(this.euskadiCheck) {
      this.euskadiCheck = false;
      this.isEuskadiDisable = true;
    }

    this.loadService.setFullLoaded({
      catalunya: this.isCatalunyaDisable,
      valencia: this.isValenciaDisable,
      euskadi: this.isEuskadiDisable
    })

    this.libs = this.loadService.cargar(this.params).pipe(
      finalize(() => {
        this.params = "";
        this.cargando = false
      })
    );
  }

  todas(event: boolean) {
    this.todasCheck = event;
    if(this.todasCheck) {
      this.catalunyaCheck = true;
      this.valenciaCheck = true;
      this.euskadiCheck = true;
      this.params = "";
      this.params = "state=cat&state=val&state=eus"
    } else {
      this.catalunyaCheck = false;
      this.valenciaCheck = false;
      this.euskadiCheck = false;
      this.params = "";
    }
  }

  catalunya(event: boolean) {
    this.catalunyaCheck = event;
    if(event && this.params.length == 0) this.params = "state=cat"
    else if(event && this.params.length != 0) this.params += "&state=cat"
    else {
      this.todasCheck = false;
      this.params = this.params.replace("&state=cat", "")
      this.params = this.params.replace("state=cat", "")
      if(this.params.length == 7 || this.params.length == 14) this.params = this.params.replace("&", "")
    }
  }

  valencia(event: boolean) {
    this.valenciaCheck = event;
    if(event && this.params.length == 0) this.params = "state=val"
    else if(event && this.params.length != 0) this.params += "&state=val"
    else {
      this.todasCheck = false;
      this.params = this.params.replace("&state=val", "")
      this.params = this.params.replace("state=val", "")
      if(this.params.length == 7 || this.params.length == 14) this.params = this.params.replace("&", "")
    }
  }

  euskadi(event: boolean) {
    this.euskadiCheck = event;
    if(event && this.params.length == 0) this.params = "state=eus"
    else if(event && this.params.length != 0) this.params += "&state=eus"
    else {
      this.todasCheck = false;
      this.params = this.params.replace("&state=eus", "")
      this.params = this.params.replace("state=eus", "")
      if(this.params.length == 7 || this.params.length == 14) this.params = this.params.replace("&", "")
    }
  }

}

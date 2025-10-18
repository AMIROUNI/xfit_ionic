import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonLabel, IonItem, IonIcon, IonButton, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { ProgramDetailService } from '../services/program-detail';
import { ActivatedRoute } from '@angular/router';
import { ProgramDetail } from '../models/ProgramDetail.model';

@Component({
  selector: 'app-program-detail',
  templateUrl: './program-detail.page.html',
  styleUrls: ['./program-detail.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon, IonItem, IonLabel, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ProgramDetailPage implements OnInit {

  programId: string='';
  programDetails: ProgramDetail[] = [];

  constructor(private programDetailService: ProgramDetailService,private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.programId = params.get('id') || '';
      this.loadProgramDetails();
    });
  }

  loadProgramDetails() {
    this.programDetailService.getDetailsByProgramId(this.programId).subscribe(program => {
      this.programDetails = program;
      console.log('Program Details:', this.programDetails);
    }, error => {
      console.error('Error fetching program details:', error);
    });
  }

}

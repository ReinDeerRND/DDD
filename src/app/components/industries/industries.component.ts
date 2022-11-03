import { Component, OnInit } from '@angular/core';
import { TitlePosition } from 'src/app/models/graph.model';
import { ApiService } from 'src/app/services/api.service';
import { GraphService } from 'src/app/services/graph.service';


@Component({
  selector: 'app-industries',
  templateUrl: './industries.component.html',
  styleUrls: ['./industries.component.css']
})
export class IndustriesComponent implements OnInit {
  loading = false;
  titlePosition: TitlePosition = TitlePosition.Inside;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.createGraph();
  }

  createGraph() {
    this.loading = true;
    this.api.getIndustries().subscribe((data) => {
      this.loading = false;
      GraphService.createBarDiagramm(data, this.titlePosition, 800, 400);
    })
  }

}

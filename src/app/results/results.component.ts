import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Property } from '../shared/property';
import { PropertiesService } from '../shared/properties.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  private properties: Property[] = [];
  // @Output() downloadProperties: EventEmitter<any> = new EventEmitter();

  constructor(private PropertiesService: PropertiesService, private route: ActivatedRoute) { }

  ngOnInit() {
    // Método que pega os parâmetros da URL
    this.route.queryParams.subscribe(params => {
        // Método que chama nosso Service
        this.PropertiesService.searchProperties(params).subscribe(data => this.properties = data);
      });
  }
}
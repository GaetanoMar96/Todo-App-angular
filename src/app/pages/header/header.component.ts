import { Component, OnInit, OnChanges } from "@angular/core";
import { Router } from '@angular/router';
import { Subscription } from'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor() {}
    
    ngOnInit(): void {
      
    }
}
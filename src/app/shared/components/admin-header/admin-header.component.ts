import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { faArrowAltCircleLeft,faArrowAltCircleRight  } from '@fortawesome/free-solid-svg-icons';
import {Input} from "@angular/core";
import {GlobalTranslateService} from "../../services/common/global-translate.service";
import {
  Collapse,
  Dropdown,
  initTE,
  Ripple,
} from "tw-elements";
@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  @Output() toggleNav = new EventEmitter<string>();
  @Input() sidebarState:boolean = false;
  faArrowAltCircleLeft = faArrowAltCircleLeft;
  faArrowAltCircleRight = faArrowAltCircleRight;

  constructor(public translateService: GlobalTranslateService) { }

  ngOnInit(): void {
    initTE({ Collapse, Dropdown,Ripple });
  }

  toggleSidebar(){
    this.toggleNav.emit();
  }


}

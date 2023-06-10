import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { MenuItem } from '../../models/menu-item.model';
import { RouterLink } from '@angular/router';

/**
 * Main Layout Component class.
 */
@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, NzLayoutModule, NzMenuModule, RouterLink],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.less'],
})
export class MainLayoutComponent {
  @Input({ required: true }) logo?: string;

  @Input() menuItems?: MenuItem[];
}

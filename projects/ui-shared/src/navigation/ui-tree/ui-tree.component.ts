import { Component, Input, Output, EventEmitter } from '@angular/core'; // Decoradores y Eventos

import { CommonModule } from '@angular/common'; // Módulos de directivas
import { LucideAngularModule, ChevronDown, ChevronRight, Building2 } from 'lucide-angular';
import { Folder, FileText  } from 'lucide-angular';


interface TreeNode {
  label: string;
  id: string;
  children?: TreeNode[];
  isOpen?: boolean;
}

@Component({
  selector: 'lib-ui-tree',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './ui-tree.component.html',
  styleUrls: ['./ui-tree.component.scss']
})
export class UiTreeComponent {
  @Input() nodes: TreeNode[] = [];
  @Input() activeId: string = '';
  @Output() nodeClick = new EventEmitter<string>();

  readonly IconDown = ChevronDown;
  readonly IconRight = ChevronRight;
  readonly IconCompany = Building2;
  readonly Folder = Folder;
  readonly FileText = FileText;



  toggleNode(node: TreeNode) {
    if (node.children) {
      node.isOpen = !node.isOpen;
    } else {
      this.activeId = node.id;
      this.nodeClick.emit(node.id);
    }
  }
}
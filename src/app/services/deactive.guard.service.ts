import { Injectable, Component } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../modal/confirm-modal/confirm-modal.component';

@Injectable()
export class DeactivateGuard implements CanDeactivate<Component> {

    constructor(private modalService: NgbModal) {}

    canDeactivate(
        component: any
    ): boolean {
        return window.confirm(
            'Wollen Sie die Seite wirklich verlassen? Die Änderungen werden nicht gespeichert.'
        );
    }
}

/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ProsopografiaTestModule } from '../../../test.module';
import { PersonajePrDialogComponent } from '../../../../../../main/webapp/app/entities/personaje-pr/personaje-pr-dialog.component';
import { PersonajePrService } from '../../../../../../main/webapp/app/entities/personaje-pr/personaje-pr.service';
import { PersonajePr } from '../../../../../../main/webapp/app/entities/personaje-pr/personaje-pr.model';
import { PersonaPrService } from '../../../../../../main/webapp/app/entities/persona-pr';
import { LugarPrService } from '../../../../../../main/webapp/app/entities/lugar-pr';
import { ProfesionPrService } from '../../../../../../main/webapp/app/entities/profesion-pr';

describe('Component Tests', () => {

    describe('PersonajePr Management Dialog Component', () => {
        let comp: PersonajePrDialogComponent;
        let fixture: ComponentFixture<PersonajePrDialogComponent>;
        let service: PersonajePrService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ProsopografiaTestModule],
                declarations: [PersonajePrDialogComponent],
                providers: [
                    PersonaPrService,
                    LugarPrService,
                    ProfesionPrService,
                    PersonajePrService
                ]
            })
            .overrideTemplate(PersonajePrDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PersonajePrDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PersonajePrService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PersonajePr(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.personaje = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'personajeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PersonajePr();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.personaje = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'personajeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});

import { Subject } from 'rxjs';
import { Item, Section } from './ngx-time-scheduler.model';
export declare class NgxTimeSchedulerService {
    item: Subject<Item>;
    itemAdd: Subject<Item>;
    itemId: Subject<number>;
    sectionAdd: Subject<Section>;
    section: Subject<Section>;
    sectionId: Subject<number>;
    refreshView: Subject<unknown>;
    constructor();
    itemPush(item: Item): void;
    itemPop(): void;
    itemRemove(id: number): void;
    sectionPush(section: Section): void;
    sectionPop(): void;
    sectionRemove(id: number): void;
    refresh(): void;
}

import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
let NgxTimeSchedulerService = class NgxTimeSchedulerService {
    constructor() {
        this.item = new Subject();
        this.itemAdd = new Subject();
        this.itemId = new Subject();
        this.sectionAdd = new Subject();
        this.section = new Subject();
        this.sectionId = new Subject();
        this.refreshView = new Subject();
    }
    itemPush(item) {
        this.itemAdd.next(item);
    }
    itemPop() {
        this.item.next();
    }
    itemRemove(id) {
        this.itemId.next(id);
    }
    sectionPush(section) {
        this.sectionAdd.next(section);
    }
    sectionPop() {
        this.section.next();
    }
    sectionRemove(id) {
        this.sectionId.next(id);
    }
    refresh() {
        this.refreshView.next();
    }
};
NgxTimeSchedulerService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgxTimeSchedulerService_Factory() { return new NgxTimeSchedulerService(); }, token: NgxTimeSchedulerService, providedIn: "root" });
NgxTimeSchedulerService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [])
], NgxTimeSchedulerService);
export { NgxTimeSchedulerService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRpbWUtc2NoZWR1bGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtdGltZS1zY2hlZHVsZXIvIiwic291cmNlcyI6WyJsaWIvbmd4LXRpbWUtc2NoZWR1bGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQzs7QUFNN0IsSUFBYSx1QkFBdUIsR0FBcEMsTUFBYSx1QkFBdUI7SUFVbEM7UUFSTyxTQUFJLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUMzQixZQUFPLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQUM5QixXQUFNLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQztRQUMvQixlQUFVLEdBQUcsSUFBSSxPQUFPLEVBQVcsQ0FBQztRQUNwQyxZQUFPLEdBQUcsSUFBSSxPQUFPLEVBQVcsQ0FBQztRQUNqQyxjQUFTLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQztRQUNsQyxnQkFBVyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFbkIsQ0FBQztJQUVWLFFBQVEsQ0FBQyxJQUFVO1FBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFTSxPQUFPO1FBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRU0sVUFBVSxDQUFDLEVBQVU7UUFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVNLFdBQVcsQ0FBQyxPQUFnQjtRQUNqQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRU0sVUFBVTtRQUNmLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVNLGFBQWEsQ0FBQyxFQUFVO1FBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFTSxPQUFPO1FBQ1osSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMxQixDQUFDO0NBRUYsQ0FBQTs7QUF4Q1ksdUJBQXVCO0lBSG5DLFVBQVUsQ0FBQztRQUNWLFVBQVUsRUFBRSxNQUFNO0tBQ25CLENBQUM7O0dBQ1csdUJBQXVCLENBd0NuQztTQXhDWSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtJdGVtLCBTZWN0aW9ufSBmcm9tICcuL25neC10aW1lLXNjaGVkdWxlci5tb2RlbCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5neFRpbWVTY2hlZHVsZXJTZXJ2aWNlIHtcblxuICBwdWJsaWMgaXRlbSA9IG5ldyBTdWJqZWN0PEl0ZW0+KCk7XG4gIHB1YmxpYyBpdGVtQWRkID0gbmV3IFN1YmplY3Q8SXRlbT4oKTtcbiAgcHVibGljIGl0ZW1JZCA9IG5ldyBTdWJqZWN0PG51bWJlcj4oKTtcbiAgcHVibGljIHNlY3Rpb25BZGQgPSBuZXcgU3ViamVjdDxTZWN0aW9uPigpO1xuICBwdWJsaWMgc2VjdGlvbiA9IG5ldyBTdWJqZWN0PFNlY3Rpb24+KCk7XG4gIHB1YmxpYyBzZWN0aW9uSWQgPSBuZXcgU3ViamVjdDxudW1iZXI+KCk7XG4gIHB1YmxpYyByZWZyZXNoVmlldyA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBwdWJsaWMgaXRlbVB1c2goaXRlbTogSXRlbSk6IHZvaWQge1xuICAgIHRoaXMuaXRlbUFkZC5uZXh0KGl0ZW0pO1xuICB9XG5cbiAgcHVibGljIGl0ZW1Qb3AoKTogdm9pZCB7XG4gICAgdGhpcy5pdGVtLm5leHQoKTtcbiAgfVxuXG4gIHB1YmxpYyBpdGVtUmVtb3ZlKGlkOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLml0ZW1JZC5uZXh0KGlkKTtcbiAgfVxuXG4gIHB1YmxpYyBzZWN0aW9uUHVzaChzZWN0aW9uOiBTZWN0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5zZWN0aW9uQWRkLm5leHQoc2VjdGlvbik7XG4gIH1cblxuICBwdWJsaWMgc2VjdGlvblBvcCgpOiB2b2lkIHtcbiAgICB0aGlzLnNlY3Rpb24ubmV4dCgpO1xuICB9XG5cbiAgcHVibGljIHNlY3Rpb25SZW1vdmUoaWQ6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuc2VjdGlvbklkLm5leHQoaWQpO1xuICB9XG5cbiAgcHVibGljIHJlZnJlc2goKTogdm9pZCB7XG4gICAgdGhpcy5yZWZyZXNoVmlldy5uZXh0KCk7XG4gIH1cblxufVxuIl19
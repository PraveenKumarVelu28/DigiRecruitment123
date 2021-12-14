import { __decorate, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
var NgxTimeSchedulerService = /** @class */ (function () {
    function NgxTimeSchedulerService() {
        this.item = new Subject();
        this.itemAdd = new Subject();
        this.itemId = new Subject();
        this.sectionAdd = new Subject();
        this.section = new Subject();
        this.sectionId = new Subject();
        this.refreshView = new Subject();
    }
    NgxTimeSchedulerService.prototype.itemPush = function (item) {
        this.itemAdd.next(item);
    };
    NgxTimeSchedulerService.prototype.itemPop = function () {
        this.item.next();
    };
    NgxTimeSchedulerService.prototype.itemRemove = function (id) {
        this.itemId.next(id);
    };
    NgxTimeSchedulerService.prototype.sectionPush = function (section) {
        this.sectionAdd.next(section);
    };
    NgxTimeSchedulerService.prototype.sectionPop = function () {
        this.section.next();
    };
    NgxTimeSchedulerService.prototype.sectionRemove = function (id) {
        this.sectionId.next(id);
    };
    NgxTimeSchedulerService.prototype.refresh = function () {
        this.refreshView.next();
    };
    NgxTimeSchedulerService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgxTimeSchedulerService_Factory() { return new NgxTimeSchedulerService(); }, token: NgxTimeSchedulerService, providedIn: "root" });
    NgxTimeSchedulerService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], NgxTimeSchedulerService);
    return NgxTimeSchedulerService;
}());
export { NgxTimeSchedulerService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRpbWUtc2NoZWR1bGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtdGltZS1zY2hlZHVsZXIvIiwic291cmNlcyI6WyJsaWIvbmd4LXRpbWUtc2NoZWR1bGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLE1BQU0sQ0FBQzs7QUFNN0I7SUFVRTtRQVJPLFNBQUksR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBQzNCLFlBQU8sR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBQzlCLFdBQU0sR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO1FBQy9CLGVBQVUsR0FBRyxJQUFJLE9BQU8sRUFBVyxDQUFDO1FBQ3BDLFlBQU8sR0FBRyxJQUFJLE9BQU8sRUFBVyxDQUFDO1FBQ2pDLGNBQVMsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO1FBQ2xDLGdCQUFXLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUVuQixDQUFDO0lBRVYsMENBQVEsR0FBZixVQUFnQixJQUFVO1FBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFTSx5Q0FBTyxHQUFkO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRU0sNENBQVUsR0FBakIsVUFBa0IsRUFBVTtRQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRU0sNkNBQVcsR0FBbEIsVUFBbUIsT0FBZ0I7UUFDakMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVNLDRDQUFVLEdBQWpCO1FBQ0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRU0sK0NBQWEsR0FBcEIsVUFBcUIsRUFBVTtRQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRU0seUNBQU8sR0FBZDtRQUNFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQzs7SUF0Q1UsdUJBQXVCO1FBSG5DLFVBQVUsQ0FBQztZQUNWLFVBQVUsRUFBRSxNQUFNO1NBQ25CLENBQUM7O09BQ1csdUJBQXVCLENBd0NuQztrQ0EvQ0Q7Q0ErQ0MsQUF4Q0QsSUF3Q0M7U0F4Q1ksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtTdWJqZWN0fSBmcm9tICdyeGpzJztcbmltcG9ydCB7SXRlbSwgU2VjdGlvbn0gZnJvbSAnLi9uZ3gtdGltZS1zY2hlZHVsZXIubW9kZWwnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBOZ3hUaW1lU2NoZWR1bGVyU2VydmljZSB7XG5cbiAgcHVibGljIGl0ZW0gPSBuZXcgU3ViamVjdDxJdGVtPigpO1xuICBwdWJsaWMgaXRlbUFkZCA9IG5ldyBTdWJqZWN0PEl0ZW0+KCk7XG4gIHB1YmxpYyBpdGVtSWQgPSBuZXcgU3ViamVjdDxudW1iZXI+KCk7XG4gIHB1YmxpYyBzZWN0aW9uQWRkID0gbmV3IFN1YmplY3Q8U2VjdGlvbj4oKTtcbiAgcHVibGljIHNlY3Rpb24gPSBuZXcgU3ViamVjdDxTZWN0aW9uPigpO1xuICBwdWJsaWMgc2VjdGlvbklkID0gbmV3IFN1YmplY3Q8bnVtYmVyPigpO1xuICBwdWJsaWMgcmVmcmVzaFZpZXcgPSBuZXcgU3ViamVjdCgpO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgcHVibGljIGl0ZW1QdXNoKGl0ZW06IEl0ZW0pOiB2b2lkIHtcbiAgICB0aGlzLml0ZW1BZGQubmV4dChpdGVtKTtcbiAgfVxuXG4gIHB1YmxpYyBpdGVtUG9wKCk6IHZvaWQge1xuICAgIHRoaXMuaXRlbS5uZXh0KCk7XG4gIH1cblxuICBwdWJsaWMgaXRlbVJlbW92ZShpZDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5pdGVtSWQubmV4dChpZCk7XG4gIH1cblxuICBwdWJsaWMgc2VjdGlvblB1c2goc2VjdGlvbjogU2VjdGlvbik6IHZvaWQge1xuICAgIHRoaXMuc2VjdGlvbkFkZC5uZXh0KHNlY3Rpb24pO1xuICB9XG5cbiAgcHVibGljIHNlY3Rpb25Qb3AoKTogdm9pZCB7XG4gICAgdGhpcy5zZWN0aW9uLm5leHQoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZWN0aW9uUmVtb3ZlKGlkOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnNlY3Rpb25JZC5uZXh0KGlkKTtcbiAgfVxuXG4gIHB1YmxpYyByZWZyZXNoKCk6IHZvaWQge1xuICAgIHRoaXMucmVmcmVzaFZpZXcubmV4dCgpO1xuICB9XG5cbn1cbiJdfQ==
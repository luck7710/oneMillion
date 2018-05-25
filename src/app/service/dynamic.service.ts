import {
  ComponentFactoryResolver,
  Injectable,
  Inject,
  ReflectiveInjector
} from '@angular/core';
import { DynamicComponent } from '../dynamic/dynamic.component';
@Injectable()
export class DynamicService {
  private factoryResolver: any;
  private rootViewContainer: any;
  constructor(@Inject(ComponentFactoryResolver) factoryResolver) {
    this.factoryResolver = factoryResolver;
  }
  setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }
  addDynamicComponent() {
    const factory = this.factoryResolver.resolveComponentFactory(DynamicComponent);
    const component = factory.create(this.rootViewContainer.parentInjector);
    this.rootViewContainer.insert(component.hostView);
  }
  clearDynamicComponent() {
    this.rootViewContainer.clear();
  }
  removeDynamicComponent() {
    this.rootViewContainer.remove();
  }
}

import {State} from './data-layer/service.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {distinctUntilChanged, pluck} from 'rxjs/operators';


const state: State = {playlist: undefined};
export class Store {

  private subject = new BehaviorSubject<State>(state);//create new observabale based on  state
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }
  set(name: string, sta: any) {
    this.subject.next({...this.value, [name]: sta});
  }

  select<T>(name: string): Observable<T> {
    return this.store.pipe(pluck(name));
  }

}
